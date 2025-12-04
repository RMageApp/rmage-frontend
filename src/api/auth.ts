import axios from 'axios';
import { authorize, revoke, AuthConfiguration } from 'react-native-app-auth';
import { storage } from '../storage/mmkv';

// --- CONFIGURATION ---
// ✅ UPDATED: Pointing to port 9090 for Keycloak
// 'adb reverse tcp:9090 tcp:9090' makes this work on the device.
const KEYCLOAK_URL = 'http://localhost:9090'; 
const REALM = 'rmage-realm';
const CLIENT_ID = 'rmage-mobile';
const REDIRECT_URL = 'com.rmage.auth://oauth/redirect'; // Must match build.gradle

// 1. Social Login Config (Browser Flow)
const socialConfig: AuthConfiguration = {
  issuer: `${KEYCLOAK_URL}/realms/${REALM}`,
  clientId: CLIENT_ID,
  redirectUrl: REDIRECT_URL,
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  additionalParameters: { prompt: 'login' }, // Forces login screen to ensure user can switch accounts
};

// --- ACTION 1: Native Username/Password Login (No Browser) ---
export const loginWithCredentials = async (username:string, password:string) => {
  try {
    const params = new URLSearchParams();
    params.append('client_id', CLIENT_ID);
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password'); // <--- Direct Access Grant
    params.append('scope', 'openid');

    const response = await axios.post(
      `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`,
      params.toString(), // Axios sometimes needs .toString() for URLSearchParams
      { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' } 
      }
    );

    saveTokens(response.data);
    return { success: true };
  } catch (error: any) {
    const errorMsg = error.response?.data?.error_description || error.message;
    console.error("Creds Login Failed:", errorMsg);
    return { success: false, error: "Invalid email or password" };
  }
};

// --- ACTION 2: Native Social Button Login (Browser Flow) ---
// Usage: loginWithSocial('google') or loginWithSocial('facebook')
export const loginWithSocial = async (providerAlias: 'google' | 'facebook') => {
  try {
    // We clone the config and add the "Magic Hint"
    const specificConfig = {
      ...socialConfig,
      additionalParameters: {
        ...socialConfig.additionalParameters,
        kc_idp_hint: providerAlias // <--- This forces Keycloak to skip its menu and go to Google/FB
      }
    };

    const result = await authorize(specificConfig);
    
    // Normalize the result to match standard format
    saveTokens({
        access_token: result.accessToken,
        refresh_token: result.refreshToken,
        id_token: result.idToken,
        expires_in: result.accessTokenExpirationDate ? 
                    (new Date(result.accessTokenExpirationDate).getTime() - Date.now()) / 1000 
                    : 300
    });

    return { success: true };
  } catch (error) {
    console.error("Social Login Failed:", error);
    return { success: false, error: "Login cancelled" };
  }
};

// --- ACTION 3: Logout ---
export const logout = async () => {
  try {
    const token = storage.getString('user.token');
    
    // 1. Clear Local Storage first (UI feels faster)
    storage.clearAll();

    // 2. Tell Keycloak to kill the session (optional but good practice)
    if (token) {
      await revoke(socialConfig, { tokenToRevoke: token, sendClientId: true });
    }
  } catch (error) {
    console.error("Logout failed", error);
    // We ignore errors here because we already cleared local storage
  }
};

// --- HELPER: Save to MMKV ---
const saveTokens = (data: any) => {
    if(data.access_token) storage.set('user.token', data.access_token);
    if(data.refresh_token) storage.set('user.refresh_token', data.refresh_token);
    if(data.id_token) storage.set('user.id_token', data.id_token);
};
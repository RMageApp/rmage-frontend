import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { Button } from '../components/Button';

const WelcomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Placeholder for Logo - we can add the real image later */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode='contain'/>
        </View>
        
        <Image source={require('../assets/rmage_text.png')} style={styles.textLogo} resizeMode='contain'/>
        
        <Text style={styles.subtitle}>Hello !</Text>
        <Text style={styles.description}>
          Your key to effortless rent management
        </Text>

        <View style={styles.buttonContainer}>
          <Button 
            title="LANDLORD" 
            onPress={() => console.log('Landlord pressed')} 
            variant="primary"
          />
          <Button 
            title="TENANT" 
            onPress={() => console.log('Tenant pressed')} 
            variant="outline"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: -20,
  },
  textLogo: {
    width: 150,
    height: 40,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 60,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 16, // Adds space between buttons
  },
});

export default WelcomeScreen;
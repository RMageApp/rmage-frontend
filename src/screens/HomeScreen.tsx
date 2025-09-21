import React, { useState, useEffect, use } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { checkBackendHealth } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [backendStatus, setBackendStatus] = useState("Checking backend...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await checkBackendHealth();
        if (response.status === 200) {
          setBackendStatus(response.data.status);
        } else {
          setBackendStatus(`Error: ${response.status}`);
        }

      } catch (error: any) {
        setBackendStatus(`Error: ${error.message}`);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchHealth();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to RMage</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000000ff" />
      ) : (
        <Text style={styles.status}>{backendStatus}</Text>
      )}
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#d5caedff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  status: { fontSize: 16, marginVertical: 20 },
});

export default HomeScreen;
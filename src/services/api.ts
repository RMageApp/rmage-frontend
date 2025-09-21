import axios from 'axios';

const baseURL =  'http://localhost:8080';

const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

export const checkBackendHealth = () => {
  return apiClient.get('/health');
};
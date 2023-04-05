import axios from 'axios';

export const baseUrl = 'http://localhost:4001';

// AXIOS CONFIGURATION
const httpApiKit = axios.create({
  baseURL: `${baseUrl}`,
  timeout: 10000,
});

// IF YOU HAVE TOKEN WILL BE BINDING OVER HERE, SINCE THERE IS NO LOGIN, I HAVE ADDED AS IMPROVEMENT.
export const setClientToken = (token: string) => {
  httpApiKit.interceptors.request.use((config: any) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

export default httpApiKit;

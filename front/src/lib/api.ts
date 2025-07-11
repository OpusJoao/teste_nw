import axios from 'axios';
import { getCurrentUser } from '../app/session.server';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: apiUrl,
});


api.interceptors.request.use(async (config) => {
  const user = await getCurrentUser();
  const token = user?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

import axios from 'axios';

export const API_BASE_URL = 'https://thesimpsonsapi.com/api';
export const CDN_BASE_URL = 'https://cdn.thesimpsonsapi.com/500';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

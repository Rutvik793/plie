import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://3.7.81.243/projects/plie-api/public/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

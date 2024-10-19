import {apiClient} from '../client/PlieApiClient';

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/login', {
      email,
      password,
    });
    console.log('DATA', response.data);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const fetchEvents = async token => {
  try {
    const response = await apiClient.post(
      '/events-listing',
      {},
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    return response.data;
  } catch (error) {
    console.error('Fetch Events Error:', error);
    throw error;
  }
};

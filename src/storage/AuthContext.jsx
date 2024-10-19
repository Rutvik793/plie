// // context/AuthContext.js
// import React, {createContext, useState} from 'react';

// // Create Auth Context
// export const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//   const [authToken, setAuthToken] = useState(null);

//   return (
//     <AuthContext.Provider value={{authToken, setAuthToken}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// context/AuthContext.js
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(null);

  // Function to set the token in both state and AsyncStorage
  const storeToken = async token => {
    try {
      await AsyncStorage.setItem('authToken', token);
      setAuthToken(token);
    } catch (error) {
      console.error('Error storing the token', error);
    }
  };

  // Function to get the token from AsyncStorage on initial load
  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setAuthToken(token);
      }
    } catch (error) {
      console.error('Error loading the token', error);
    }
  };

  // Load token when the component mounts
  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{authToken, setAuthToken: storeToken}}>
      {children}
    </AuthContext.Provider>
  );
};

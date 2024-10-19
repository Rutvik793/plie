import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {login} from '../api/service/PlieApiService';
import {AuthContext} from '../storage/AuthContext';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {setAuthToken} = useContext(AuthContext); // Use AuthContext

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const data = await login(email, password);
      const token = data.data.token;

      if (token) {
        setAuthToken(token); // Save token in context or state
        console.log(token, 'TOKEN Success');
        // Navigate to TabbarNavigation after successful login
        navigation.navigate('TabbarNavigation');
      } else {
        Alert.alert('Error', 'Invalid login credentials');
      }
    } catch (error) {
      // Catching errors that might arise during the API call
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pliē</Text>
        <Icon name="image" size={64} color="black" style={styles.icon} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@email.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Icon name="eye" size={24} color="gray" style={styles.eyeIcon} />
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.signUpText}>
          Not a member? <Text style={styles.signUpLink}>Sign Up Here</Text>
        </Text>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or Sign In with:</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/image/googleLogo.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/image/AppleLogo.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/image/FaceBookLogo.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.guestText}>Enter as Guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#D1D5DB',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 64,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  icon: {
    marginTop: 32,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 32,
    width: '100%',
    maxWidth: 400,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    color: '#4B5563',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  forgotPassword: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 16,
  },
  signInButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  signUpLink: {
    color: '#3B82F6',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  dividerText: {
    color: '#6B7280',
    fontSize: 14,
    marginHorizontal: 8,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  socialButton: {
    // backgroundColor: 'white',
    // borderWidth: 1,
    // borderColor: '#D1D5DB',
    // borderRadius: 50,
    // padding: 8,
    marginHorizontal: 8,
  },
  socialIcon: {
    width: 56,
    height: 56,
  },
  guestText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    left: '40%',
  },
});

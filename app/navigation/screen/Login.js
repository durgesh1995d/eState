import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../utils';
import Button from '../components/Button';
import PasswordHideIcon from '../../assets/svgIcon/PasswordHideIcon';
import PasswordShowIcon from '../../assets/svgIcon/PasswordShowIcon';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigationfn = async () => {
    await AsyncStorage.setItem('log-in', JSON.stringify({login: true}));
    setTimeout(() => {
      navigation.navigate('SplashScreen');
    }, 1000);
  };

  const loginHandler = () => {
    if (username == '' && password == '') {
      setUsernameError(true);
      setPasswordError(true);
      return;
    }
    if (username == '') {
      setUsernameError(true);
      return;
    }
    if (password == '') {
      setPasswordError(true);
      return;
    }
    navigationfn();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <View style={styles.inputView}>
        <TextInput
          placeholder="Enter Username"
          style={[styles.commonInputText]}
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            if (usernameError) {
              setUsernameError(false);
            }
          }}
        />
        {usernameError && (
          <Text style={styles.textError}>Please Enter Username</Text>
        )}
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Enter Password"
          style={[styles.commonInputText]}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (passwordError) {
              setPasswordError(false);
            }
          }}
          secureTextEntry={passwordVisible}
        />
        {passwordVisible ? (
          <TouchableWithoutFeedback onPress={() => setPasswordVisible(false)}>
            <View style={styles.passwordIconStyle}>
              <PasswordHideIcon />
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={() => setPasswordVisible(true)}>
            <View style={styles.passwordIconStyle}>
              <PasswordShowIcon />
            </View>
          </TouchableWithoutFeedback>
        )}
        {passwordError && (
          <Text style={styles.textError}>Please Enter Password</Text>
        )}
      </View>
      <View style={styles.inputView}>
        <Button title="Login" onPress={loginHandler} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.FONT_SIZES.headH4,
    color: theme.colors.PRIMARY_COLOR,
    marginBottom: 100,
  },
  inputView: {
    marginBottom: 10,
    height: 70,
    width: '100%',
    paddingHorizontal: 30,
  },
  commonInputText: {
    paddingHorizontal: 10,
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 10,
  },
  passwordIconStyle: {
    padding: 10,
    position: 'absolute',
    right: 30,
  },
  textError: {
    color: theme.colors.ERROR_TEXT,
    fontSize: theme.FONT_SIZES.body2,
    paddingLeft: 10,
  },
});

export default Login;

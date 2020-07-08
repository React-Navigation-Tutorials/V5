import React from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Center from '../components/Center';
import AppTabs from '../components/AppTabs';
import AuthStack from '../components/AuthStack';
import {AuthContext} from '../components/AuthProvider';


export const Routes = () => {
  const {user, login} = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    AsyncStorage.getItem('user')
      .then(user => {
        if (!!user) {
          // decode
          login();
          console.log('user', user);
          setLoading(false);
        } else {
          setLoading(false);
        }
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  return (
    <NavigationContainer
      // screenOptions={{
      //   header: () => null
      // }}
      initialRoutName="Login">
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

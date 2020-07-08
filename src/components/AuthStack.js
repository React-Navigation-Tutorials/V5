import React from 'react';
import {Text, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Center from '../components/Center';
import {AuthContext} from '../components/AuthProvider';

const Stack = createStackNavigator();

function Login({navigation}) {
  const {login} = React.useContext(AuthContext);
  return (
    <Center>
      <Text>Login</Text>
      <Button
        title="go to Register"
        onPress={() => {
          navigation.navigate('Register');
        }}
      />
      <Button title="log me in" onPress={() => login()} />
    </Center>
  );
}
function Register({navigation, route}) {
  return (
    <Center>
      <Text>Route name {route.name}</Text>
      <Button
        title="go to Login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </Center>
  );
}
const AuthStack = () => {
  const {login} = React.useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: 'Sign up',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

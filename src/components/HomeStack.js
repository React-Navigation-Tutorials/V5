import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import Center from "./Center";
import { AuthContext } from "./AuthProvider";

const Feed = () => {
  return (
    <Center>
      <Text>feed</Text>
    </Center>
  );
};

const Stack = createStackNavigator();
const HomeStack = () => {
  const { logout } = React.useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => logout()}>
                <Text>LOGOUT</Text>
              </TouchableOpacity>
            );
          }
        }}
        component={Feed}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

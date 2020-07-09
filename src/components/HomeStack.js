import React from "react";
import { Text, TouchableOpacity, Button, FlatList } from "react-native";
import faker from "faker";
import { createStackNavigator } from "@react-navigation/stack";
import Center from "./Center";
import { AuthContext } from "./AuthProvider";
import { addProductRoutes } from "./addProductRoutes";

const Feed = ({ navigation }) => {
  return (
    <Center>
      <FlatList
        renderItem={({ item }) => {
          return (
            <Button
              title={item}
              onPress={() =>
                navigation.navigate("Product", {
                  name: item
                })
              }
            />
          );
        }}
        keyExtractor={(product, idx) => product + idx}
        data={Array.from(Array(50), () => faker.commerce.product())}
      />
    </Center>
  );
};

const Stack = createStackNavigator();

const HomeStack = () => {
  const { logout } = React.useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Feed">
      {addProductRoutes(Stack)}
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

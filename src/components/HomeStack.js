import React from "react";
import { Text, TouchableOpacity, Button, FlatList } from "react-native";
import faker from "faker";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import Center from "./Center";
import { AuthContext } from "./AuthProvider";

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

function Product({ route, navigation }) {
  return (
    <Center>
      <Text>{route.params.name}</Text>
      <Button
        title="Edit product"
        onPress={() =>
          navigation.navigate("EditProduct", {
            name: route.params.name
          })
        }
      />
    </Center>
  );
}
function apiCall() {
  return true;
}

function EditProduct({ route, navigation }) {
  const [formState] = React.useState();
  //   const submit = React.useRef(() => {});

  function submit() {
    apiCall(formState);
    navigation.goBack();
  }

  React.useEffect(() => {
    navigation.setParams({ submit });
  }, []);

  return (
    <Center>
      <Text>editing {route.params.name}...</Text>
    </Center>
  );
}

const Stack = createStackNavigator();

const HomeStack = () => {
  const { logout } = React.useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route, navigation }) => ({
          headerTitle: `Edit: ${route.params.name}`,
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (route.params.submit) {
                    route.params.submit();
                  }
                }}
              >
                <Text>DONE</Text>
              </TouchableOpacity>
            );
          }
        })}
        name="EditProduct"
        component={EditProduct}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: `Product: ${route.params.name}`
        })}
        name="Product"
        component={Product}
      />
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

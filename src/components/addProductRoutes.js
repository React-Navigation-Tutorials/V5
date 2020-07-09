import React from "react";
import { Text, Button, TouchableOpacity } from "react-native";
import Center from "./Center";
import { AuthContext } from "./AuthProvider";

export const addProductRoutes = Stack => {
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
      const submit = React.useRef(() => {});

    submit.current = () => {
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

  return (
    <>
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: `Edit: ${route.params.name}`,
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (route.params.submit) {
                    route.params.submit.current();
                  }
                }}
                style={{ paddingRight: 8 }}
              >
                <Text
                  style={{
                    color: "red"
                  }}
                >
                  DONE
                </Text>
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
    </>
  );
};

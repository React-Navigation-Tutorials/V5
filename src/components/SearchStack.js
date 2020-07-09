import React from "react";
import { Text, FlatList, Button } from "react-native";
import faker from "faker";
import { createStackNavigator } from "@react-navigation/stack";

import Center from "./Center";
import { addProductRoutes } from "./addProductRoutes";


const Stack = createStackNavigator();

const SearchStack = ({navigation}) => {
  const Search = () => {
    const [show, setShow] = React.useState(false);
    return (
      <Center>
        <Button title="Search Products" onPress={() => setShow(true)} />

        {show && (
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
        )}
        <Text>Search</Text>
      </Center>
    );
  };

  return (
    <Stack.Navigator initialRouteName='Search' >
      <Stack.Screen name="Search" component={Search} />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};

export default SearchStack;

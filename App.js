import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import NewWorkoutScreen from "./screens/NewWorkoutScreen";
import {GRAPHQL_URL, HASURA_SECRET} from "@env"
import 'react-native-get-random-values'

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: `${GRAPHQL_URL}`,
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': `${HASURA_SECRET}`
  }
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="NewWorkout" component={NewWorkoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

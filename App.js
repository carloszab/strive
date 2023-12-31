import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import NewWorkoutScreen from "./screens/NewWorkoutScreen";
import WorkoutHistoryScreen from "./screens/WorkoutHistoryScreen";
import { GRAPHQL_URL, HASURA_SECRET } from "@env";
import "react-native-get-random-values";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import WorkoutViewScreen from "./screens/WorkoutViewScreen";

import { Provider } from 'react-redux';
import store from './redux/store';

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: `${GRAPHQL_URL}`,
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": `${HASURA_SECRET}`,
  },
});

export default function App() {
  return (
    <Provider store={store}>
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="NewWorkout" component={NewWorkoutScreen} />
          <Stack.Screen
            name="WorkoutHistory"
            component={WorkoutHistoryScreen}
          />
          <Stack.Screen name="WorkoutView" component={WorkoutViewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
    </Provider>
  );
}

import { View, Text } from "react-native";
import React from "react";
import * as queries from "../src/graphql/queries";
import { useQuery } from "@apollo/client";

const WorkoutHistory = () => {
  const { loading, error, data } = useQuery(queries.GET_WORKOUTS);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      <Text>WorkoutHistory</Text>
      {data.workout.map(({ id, name, detail }) => (
        <View key={id}>
          <Text>{name}</Text>
        </View>
      ))}
    </View>
  );
};

export default WorkoutHistory;

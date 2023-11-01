import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import * as queries from "../src/graphql/queries";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

const WorkoutHistory = () => {
  const { loading, error, data } = useQuery(queries.GET_WORKOUTS);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "History",
    });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
      <FlatList
        data={data.workout}
        keyExtractor={(workout) => workout.id}
        renderItem={({ item: workout }) => (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "lightgray",
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {workout.name}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 16, color: "black" }}>
                  1 hour 50 minutes
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={{ fontSize: 12, color: "gray" }}>monday</Text>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: "gray" }}>
                  <Text> 5 minutes ago</Text>
                </Text>
              </View>
            </View>
          </View>
        )}
      />
  );
};

export default WorkoutHistory;

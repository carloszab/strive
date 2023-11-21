import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";

const WorkoutHistory = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "History",
    });
  }, []);

  if (route.params.loading) {
    return <Text>Loading...</Text>;
  }

  if (route.params.error) {
    return <Text>Error getting workouts</Text>;
  }

  return (
    <FlatList
      data={route.params.workouts.workout}
      keyExtractor={(workout) => workout.id}
      renderItem={({ item: workout }) => (
        <TouchableOpacity
          key={workout.id}
          onPress={() => {
            navigation.navigate("WorkoutView", {
              id: workout.id,
              name: workout.name,
              detail: workout.detail,
              timestamp: workout.timestamp,
              refetchWorkouts: route.params.refetchWorkouts,
            });
          }}
        >
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
        </TouchableOpacity>
      )}
    />
  );
};

export default WorkoutHistory;

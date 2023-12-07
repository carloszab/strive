import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { formatDistanceToNow } from "date-fns";

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

  function formatSecondsToHoursAndMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} and ${minutes} ${
        minutes === 1 ? "minute" : "minutes"
      }`;
    } else {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    }
  }

  function formatTimestamp(timestamp) {
    const currentDate = new Date();
    const previousDate = new Date(timestamp);

    return formatDistanceToNow(previousDate, { addSuffix: true });
  }

  function formatWeekDay(timestamp) {
    const date = new Date(timestamp);
        const dayOfWeek = date.getDay();
        const daysOfWeekNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        return dayName = daysOfWeekNames[dayOfWeek];
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
              duration_seconds: workout.duration_seconds,
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
                  {formatSecondsToHoursAndMinutes(workout.duration_seconds)}
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
                <Text style={{ fontSize: 12, color: "gray" }}>{formatWeekDay(workout.timestamp)}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: "gray" }}>
                  <Text>{formatTimestamp(workout.timestamp)}</Text>
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

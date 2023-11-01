import { View, Text, FlatList, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import * as queries from "../src/graphql/queries";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { formatDistanceToNow } from 'date-fns';

const WorkoutHistoryRecent = () => {
  const { loading, error, data } = useQuery(queries.GET_WORKOUTS);

  const navigation = useNavigation();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  function formatTimestamp(timestamp) {
    const currentDate = new Date();
    const previousDate = new Date(timestamp);
  
    return formatDistanceToNow(previousDate, { addSuffix: true });
  }
  

  return (
    <View>
      {data.workout.map((workout) => {
        const date = new Date(workout.timestamp);
        const dayOfWeek = date.getDay();
        const dayOfMonth = date.getDate();
        const daysOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = daysOfWeekNames[dayOfWeek];
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const formattedTimestamp = formatTimestamp(workout.timestamp);
        
        return (
          <TouchableOpacity key={workout.id} onPress={() => {navigation.navigate("WorkoutView", {name: workout.name, detail:workout.detail});}}>
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
                <Text style={{ fontSize: 12, color: "gray" }}>{formattedTimestamp}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: "gray" }}>
                  <Text>{formattedTimestamp}</Text>
                </Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default WorkoutHistoryRecent;

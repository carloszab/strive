import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const WorkoutCalendar = (props) => {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    auxMarkedDates = markedDates;

    if (props.workouts) {
      props.workouts.workout.map((workout) => {
        const date = new Date(workout.timestamp);

        const formattedTimestamp = formatTimestampToYYYYMMDD(workout.timestamp);

        auxMarkedDates[formattedTimestamp] = {
          selected: true,
          marked: true,
          selectedColor: "black",
          id: workout.id,
          name: workout.name,
          detail: workout.detail,
          timestamp: workout.timestamp,
          duration_seconds: workout.duration_seconds,
        };
      });

      setMarkedDates(auxMarkedDates);
    }
  }, [props.workouts]);

  function formatTimestampToYYYYMMDD(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const navigation = useNavigation();

  return (
    <View>
      <Calendar
        displayLoadingIndicator={props.loading}
        current={getCurrentDate() || "2023-01-01"}
        onDayPress={(day) => {
          console.log("selected day", day);
          if (markedDates[day.dateString]) {
            navigation.navigate("WorkoutView", {
              id: markedDates[day.dateString].id,
              name: markedDates[day.dateString].name,
              detail: markedDates[day.dateString].detail,
              timestamp: markedDates[day.dateString].timestamp,
              duration_seconds: markedDates[day.dateString].duration_seconds,
              refetchWorkouts: props.refetchWorkouts,
            });
          }
        }}
        markedDates={markedDates}
      />
    </View>
  );
};

export default WorkoutCalendar;

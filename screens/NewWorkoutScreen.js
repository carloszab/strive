import {
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";
import WorkoutExercise from "../components/WorkoutExercise";
import { performMutation } from "../src/graphql/apollo";
import * as mutations from "../src/graphql/mutations";
import { buttons } from "../styles/buttons";

import { useSelector, useDispatch } from "react-redux";
import {
  resetCustomWorkout,
  setCustomWorkoutName,
  setExercises,
  startCustomWorkout,
} from "../redux/actions";

const NewWorkoutScreen = ({ route, navigation }) => {
  const customWorkoutName = useSelector((state) => state.customWorkoutName);
  const customWorkoutStarted = useSelector(
    (state) => state.customWorkoutStarted
  );
  const customWorkoutTime = useSelector((state) => state.customWorkoutTime);
  const [workoutName, onChangeWorkoutName] = useState(
    customWorkoutName || "Custom Workout"
  );
  const [exerciseName, onChangeExerciseName] = useState("");
  const exercisesRedux = useSelector((state) => state.exercises);
  const [exercises, onChangeExercises] = useState(exercisesRedux || []);
  const [elapsedTime, setElapsedTime] = useState("0:00");
  const [elapsedTimeSeconds, setElapsedTimeSeconds] = useState(0);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Custom Workout",
    });
  }, []);

  useEffect(() => {
    if (!customWorkoutStarted) {
      dispatch(startCustomWorkout());
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      calculateElapsedTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [customWorkoutStarted, customWorkoutTime]);

  onAddExercise = () => {
    let myuuid = uuidv4();
    let exercisesAux = [...exercises];
    exercisesAux.push({ id: myuuid, name: exerciseName });
    onChangeExercises(exercisesAux);
    dispatch(setExercises(exercisesAux));
    onChangeExerciseName("");
  };

  onExerciseChange = (id, sets) => {
    let exercisesAux = [...exercises];
    exercisesAux.map((exercise) => {
      if (exercise["id"] === id) {
        exercise["sets"] = sets;
      }
    });
    onChangeExercises(exercisesAux);
    dispatch(setExercises(exercisesAux));
  };

  onChangeCustomWorkoutName = (name) => {
    onChangeWorkoutName(name);
    dispatch(setCustomWorkoutName(name));
  };

  resetCustomWorkoutData = () => {
    onChangeExercises([]);
    onChangeExerciseName("");
    onChangeWorkoutName("Custom Workout");
    dispatch(resetCustomWorkout());
  };

  calculateElapsedTime = () => {
    if (customWorkoutTime != null) {
      const currentTime = new Date();
      const elapsedTime = currentTime - new Date(customWorkoutTime);
      const minutes = Math.floor(elapsedTime / 60000);
      const seconds = Math.floor((elapsedTime % 60000) / 1000);
      setElapsedTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      setElapsedTimeSeconds(Math.floor(elapsedTime / 1000));
    } else {
      setElapsedTime("0:00");
      setElapsedTimeSeconds(0);
    }
  };

  const handleCancelWorkout = () => {
    dispatch(resetCustomWorkout());
    navigation.navigate("Home");
  };

  const handleFinishWorkout = performMutation(
    mutations.INSERT_WORKOUT,
    { id: uuidv4, name: workoutName, detail: exercises, duration_seconds: elapsedTimeSeconds },
    (data) => {
      console.log(`Added todo with ID, `, data);
      resetCustomWorkoutData();
      route.params.refetchWorkouts();
      navigation.navigate("Home");
    },
    (error) => {
      console.error("Error adding todo", error);
    }
  );

  const showCancelAlert = () =>
    Alert.alert(
      "Cancel workout",
      "Are you sure you want to cancel this workout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: handleCancelWorkout },
      ]
    );

  const showFinishAlert = () =>
    Alert.alert(
      "Finish workout",
      "Are you sure you want to finish this workout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: handleFinishWorkout },
      ]
    );

  return (
    <SafeAreaView className="bg-white pt-1">
      <ScrollView>
        <View className="flex flex-row space-x-2 justify-between m-2 mt-0">
          <View style={styles.inputContainer}>
            <TextInput
              className="border-2 border-gray-200 m-2 rounded-md"
              onChangeText={(name) => onChangeCustomWorkoutName(name)}
              value={workoutName.toString()}
              placeholder="Workout Name"
            />
          </View>
          <Text>{elapsedTime == "0:00" ? "" : elapsedTime}</Text>
        </View>

        <View>
          {exercises.map((item, index) => (
            <View
              key={index}
              className="border-2 border-gray-200 p-3 m-2 rounded-md"
            >
              <WorkoutExercise
                key={index}
                index={index + 1}
                id={item["id"]}
                name={item["name"]}
                onExerciseChange={onExerciseChange}
                sets={item["sets"]}
              />
            </View>
          ))}
        </View>

        <View className="flex flex-row space-x-2 justify-between m-2">
          <View style={styles.inputContainer}>
            <TextInput
              className="border-2 border-gray-200 m-2 rounded-md"
              style={styles.input}
              textAlign={"center"}
              onChangeText={(e) => onChangeExerciseName(e)}
              value={exerciseName.toString()}
              placeholder="Exercise Name"
            />
          </View>

          <TouchableOpacity onPress={onAddExercise} style={buttons.button}>
            <Text style={buttons.text}>ADD EXERCISE</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={showCancelAlert}
          style={buttons.button}
          className="m-3"
        >
          <Text style={buttons.text}>CANCEL WORKOUT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={showFinishAlert}
          style={buttons.button}
          className="m-3 mt-0"
        >
          <Text style={buttons.text}>FINISH WORKOUT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default NewWorkoutScreen;

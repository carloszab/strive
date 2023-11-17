import {
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";
import WorkoutExercise from "../components/WorkoutExercise";
import { performMutation } from "../src/graphql/apollo";
import * as mutations from "../src/graphql/mutations";
import { buttons } from "../styles/buttons";

import { useSelector, useDispatch } from "react-redux";
import { setCustomWorkoutName, setExercises } from "../redux/actions";

const NewWorkoutScreen = ({ navigation }) => {
  const customWorkoutName = useSelector((state) => state.customWorkoutName);
  const [workoutName, onChangeWorkoutName] = useState(
    customWorkoutName || "Custom Workout"
  );
  const [exerciseName, onChangeExerciseName] = useState("");
  const exercisesRedux = useSelector((state) => state.exercises);
  const [exercises, onChangeExercises] = useState(exercisesRedux || []);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Custom Workout",
    });
  }, []);

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

  resetCustomWorkout = () => {
    onChangeExercises([]);
    onChangeExerciseName("");
    onChangeWorkoutName("Custom Workout");
    dispatch(setExercises([]));
    dispatch(setCustomWorkoutName("Custom Workout"));
  };

  const handleFinishExercise = performMutation(
    mutations.INSERT_WORKOUT,
    { id: uuidv4, name: workoutName, detail: exercises },
    (data) => {
      console.log(`Added todo with ID, `, data);
      resetCustomWorkout();
    },
    (error) => {
      console.error("Error adding todo", error);
    }
  );

  return (
    <SafeAreaView className="bg-white pt-1">
      <ScrollView>
        <TextInput
          className="border-2 border-gray-200 m-2 rounded-md"
          onChangeText={(name) => onChangeCustomWorkoutName(name)}
          value={workoutName.toString()}
          placeholder="Workout Name"
        />

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
          onPress={handleFinishExercise}
          style={buttons.button}
          className="m-3"
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

import {
  View,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";
import WorkoutExercise from "../components/WorkoutExercise";
import { performMutation } from "../src/graphql/apollo";
import * as mutations from "../src/graphql/mutations";
import { buttons } from "../styles/buttons";

const WorkoutViewScreen = ({ route, navigation }) => {
  const [workoutName, onChangeWorkoutName] = useState(
    route.params.name || "Custom Workout"
  );
  const [exerciseName, onChangeExerciseName] = useState("");
  const [exercises, onChangeExercises] = useState(route.params.detail || []);

  onAddExercise = () => {
    let myuuid = uuidv4();
    let exercises2 = [...exercises];
    exercises2.push({ id: myuuid, name: exerciseName });
    onChangeExercises(exercises2);
    onChangeExerciseName("");
    console.log("exercises: ", JSON.stringify(exercises));
  };

  onExerciseChange = (id, sets) => {
    let exercisesAux = JSON.parse(JSON.stringify(exercises));
    for (i in exercisesAux) {
      if (exercisesAux[i]["id"] === id) {
        exercisesAux[i]["sets"] = sets;
      }
    }
    onChangeExercises(exercisesAux);
  };

  const handleUpdateWorkout = performMutation(
    mutations.UPDATE_WORKOUT,
    {
      id: route.params.id,
      name: workoutName,
      detail: exercises,
      timestamp: route.params.timestamp,
    },
    (data) => {
      console.log(`Updated workout with ID, `, data);
    },
    (error) => {
      console.error("Error updating workout", error);
    }
  );

  const handleDeleteWorkout = performMutation(
    mutations.DELETE_WORKOUT,
    { id: route.params.id },
    (data) => {
      console.log(`Deleted workout with ID, `, data);
    },
    (error) => {
      console.error("Error deleting workout", error);
    }
  );

  return (
    <SafeAreaView className="bg-white pt-1">
      <ScrollView>
        <TextInput
          className="border-2 border-gray-200 m-2 rounded-md"
          onChangeText={(e) => onChangeWorkoutName(e)}
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
        <TouchableOpacity onPress={handleUpdateWorkout} style={buttons.button} className="m-3">
          <Text style={buttons.text}>UPDATE WORKOUT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteWorkout} style={buttons.button} className="m-3 mt-0">
          <Text style={buttons.text}>DELETE WORKOUT</Text>
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

export default WorkoutViewScreen;

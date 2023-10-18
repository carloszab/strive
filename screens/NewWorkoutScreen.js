import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";
import WorkoutSet from "../components/WorkoutSet";
import WorkoutExercise from "../components/WorkoutExercise";

const NewWorkoutScreen = () => {
  const [workoutName, onChangeWorkoutName] = useState("Custom Workout");
  const [exerciseName, onChangeExerciseName] = useState("");
  const [exercises, onChangeExercises] = useState([]);

  onAddExercise = () => {
    let myuuid = uuidv4();
    let exercises2 = [...exercises];
    exercises2.push({ id: myuuid, name: exerciseName });
    onChangeExercises(exercises2);
    onChangeExerciseName("");
    console.log("exercises: ", JSON.stringify(exercises));
  };

  return (
    <SafeAreaView className="bg-white pt-1">
      <TextInput
          className="border-2 border-gray-200 m-2 rounded-md"
          onChangeText={(e) => onChangeWorkoutName(e)}
          value={workoutName.toString()}
          keyboardType="numeric"
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
            />
          </View>
        ))}
      </View>

      <View className="flex flex-row space-x-2 justify-between m-2">
        <TextInput
          className="border-2 border-gray-200 m-2 rounded-md"
          onChangeText={(e) => onChangeExerciseName(e)}
          value={exerciseName.toString()}
          keyboardType="numeric"
          placeholder="Exercise Name"
        />
        <Button title="add exercise" onPress={onAddExercise}></Button>
      </View>

      <Button title="finish exercise"></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default NewWorkoutScreen;

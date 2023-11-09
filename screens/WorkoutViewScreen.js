import { View, Button, TextInput, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";
import WorkoutExercise from "../components/WorkoutExercise";
import { performMutation } from "../src/graphql/apollo";
import * as mutations from "../src/graphql/mutations";

const WorkoutViewScreen = ({ route, navigation }) => {
  const [workoutName, onChangeWorkoutName] = useState(route.params.name || "Custom Workout");
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
    let exercisesAux = [...exercises];
    exercisesAux.map((exercise) => {
      if (exercise["id"] === id) {
        exercise["sets"] = sets;
      }
    });
    onChangeExercises(exercisesAux);
  };

  const handleFinishExercise = performMutation(
    mutations.INSERT_WORKOUT,
    { id: uuidv4, name: workoutName, detail: exercises },
    (data) => {
      console.log(`Added todo with ID, `, data);
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
                onExerciseChange={onExerciseChange}
                sets={item["sets"]}
              />
            </View>
          ))}
        </View>

        <View className="flex flex-row space-x-2 justify-between m-2">
          <TextInput
            className="border-2 border-gray-200 m-2 rounded-md"
            onChangeText={(e) => onChangeExerciseName(e)}
            value={exerciseName.toString()}
            placeholder="Exercise Name"
          />
          <Button title="add exercise" onPress={onAddExercise}></Button>
        </View>

        <Button title="update exercise" onPress={handleFinishExercise}></Button>
      </ScrollView>
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

export default WorkoutViewScreen;

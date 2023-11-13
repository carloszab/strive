import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import WorkoutSet from "./WorkoutSet";

const WorkoutExercise = (props) => {
  const [sets, onChangeSets] = useState(props.sets || []);

  onAddSet = () => {
    let myuuid = uuidv4();
    let sets2 = [...sets];
    sets2.push({ id: myuuid, weight: "", reps: "" });
    onChangeSets(sets2);
  };

  handleChangeSet = (newSet) => {
    let setsAux = [...sets];
    for (i in setsAux) {
      if (setsAux[i]["id"] === newSet["id"]) {
        setsAux[i] = newSet;
      }
    }
    onChangeSets(setsAux);
    props.onExerciseChange(props.id, setsAux);
  };

  return (
    <View>
      <Text>{props.name}</Text>

      {sets.map((set, index) => (
        <View key={index}>
          <WorkoutSet
            key={index}
            index={index + 1}
            set={set}
            onChangeSet={handleChangeSet}
          />
        </View>
      ))}

      <Button title="add set" onPress={onAddSet}></Button>
    </View>
  );
};

export default WorkoutExercise;

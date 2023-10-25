import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import WorkoutSet from "./WorkoutSet";

const WorkoutExercise = (props) => {
  const [sets, onChangeSets] = useState([]);

  //   useEffect(() => { onChangeSets(props.sets);}, [props.sets]);

  // if sets != props.sets
  // onChangeSets(props.sets);

  onAddSet = () => {
    let myuuid = uuidv4();
    let sets2 = [...sets];
    sets2.push({ id: myuuid, weight: "", reps: "" });
    onChangeSets(sets2);
    console.log("sets: ", JSON.stringify(sets));
  };

  handleChangeSet = (newSet) => {
    let setsAux = [...sets];
    setsAux.map((set) => {
        if (set["id"] === newSet["id"]) {
            set = newSet;
        }
    });
    onChangeSets(setsAux);
    props.onExerciseChange(props.id, sets);
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

import { View, Text, Button, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import WorkoutSet from "./WorkoutSet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus, faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import Spacer from "./Spacer";

const WorkoutExercise = (props) => {
  const [sets, onChangeSets] = useState(props.sets || []);

  onAddSet = () => {
    let myuuid = uuidv4();
    let setsAux = [...sets];
    setsAux.push({ id: myuuid, weight: "", reps: "" });
    onChangeSets(setsAux);
    props.onExerciseChange(props.id, setsAux);
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
      <Text className="font-medium text-lg mb-3">{props.name}</Text>
      <View className="flex flex-row space-x-2 justify-between items-center px-12">
        <Text className="font-medium">Set</Text>
        <Text className="font-medium">Weight</Text>
        <Text className="font-medium">Reps</Text>
      </View>

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

      <Spacer size={10} />

      <TouchableOpacity onPress={onAddSet} style={styles.addSetButton}>
        <FontAwesomeIcon icon={faCirclePlus} size={20} color="white" />
        <Text style={styles.addSetLabel}>Add Set</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  addSetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(185, 9, 9, .2)",
    padding: 10,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  addSetLabel: {
    color: "#b90909",
    marginLeft: 10,
  },
};

export default WorkoutExercise;

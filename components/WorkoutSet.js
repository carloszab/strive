import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

// import { styled } from 'nativewind';

// const StyledView = styled(View)

const WorkoutSet = (props) => {

  const onChangeWeight = (e) => {
    let newSet = JSON.parse(JSON.stringify(props.set))
    newSet["weight"] = e;
    props.onChangeSet(newSet);
  };

  const onChangeReps = (e) => {
    let newSet = JSON.parse(JSON.stringify(props.set))
    newSet["reps"] = e;
    props.onChangeSet(newSet);
  };

  return (
    <View>
      <View class="">
        <View className="flex flex-row space-x-2 justify-between items-center">
          <Text>Set {props.index}</Text>

          <TextInput
            className="border-2 border-gray-200 m-2 rounded-md"
            textAlign={"center"}
            onChangeText={(e) => onChangeWeight(e)}
            value={props.set["weight"].toString()}
            keyboardType="numeric"
            placeholder="weight"
          />

          <TextInput
            className="border-2 border-gray-200 m-2 rounded-md"
            textAlign={"center"}
            onChangeText={(e) => onChangeReps(e)}
            value={props.set["reps"].toString()}
            keyboardType="numeric"
            placeholder="reps"
          />
        </View>
      </View>
    </View>
  );
};

export default WorkoutSet;

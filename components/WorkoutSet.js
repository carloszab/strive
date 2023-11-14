import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";

// import { styled } from 'nativewind';

// const StyledView = styled(View)

const WorkoutSet = (props) => {
  const onChangeWeight = (e) => {
    let newSet = JSON.parse(JSON.stringify(props.set));
    newSet["weight"] = e;
    props.onChangeSet(newSet);
  };

  const onChangeReps = (e) => {
    let newSet = JSON.parse(JSON.stringify(props.set));
    newSet["reps"] = e;
    props.onChangeSet(newSet);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{props.index}</Text>
        </View>
        <View style={styles.inputs}>
          <TextInput
            className="border-gray-200 m-2 rounded-md"
            style={styles.input}
            placeholder="weight"
            textAlign={"center"}
            value={props.set["weight"].toString()}
            onChangeText={(e) => onChangeWeight(e)}
            keyboardType="numeric"
          />
          <TextInput
            className="border-gray-200 m-2 rounded-md"
            style={styles.input}
            placeholder="reps"
            textAlign={"center"}
            value={props.set["reps"].toString()}
            onChangeText={(e) => onChangeReps(e)}
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },
  label: {
    alignSelf: "center",
    fontWeight: "bold",
  },
  labelContainer: {
    width: 100,
  },
  inputs: {
    flex: 1, // Allow inputs to take remaining space
    flexDirection: "row",
  },
  input: {
    flex: 1, // Equal width for both input columns
    marginRight: 10, // Optional: Add some spacing between inputs
    borderWidth: 1,
    padding: 5,
  },
});

export default WorkoutSet;

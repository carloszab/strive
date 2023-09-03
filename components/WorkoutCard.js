import { View, Text, Image, Pressable } from "react-native";
import React from "react";

const WorkoutCard = (props) => {
  return (
    <Pressable className="relative mr-2 bg-white">
      <Image source={{ uri: props.imageUrl }} className="h-20 w-20 rounded" />
      <Text>{props.title}</Text>
    </Pressable>
  );
};

export default WorkoutCard;

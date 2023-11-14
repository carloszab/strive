import { View, Text, ScrollView } from "react-native";
import React from "react";
import WorkoutCard from "./WorkoutCard";

const Workouts = () => {
  return (
    <View>
      <Text className="font-bold text-xl">{"Workouts"}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        <WorkoutCard
          title="PPL"
          imageUrl="https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2573&q=80"
        />
        <WorkoutCard
          title="Bodyweight"
          imageUrl="https://images.unsplash.com/photo-1593455026613-e30bfc0a54a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
        />
        <WorkoutCard
          title="Cardio"
          imageUrl="https://images.unsplash.com/photo-1649174457187-75c37d3fe7ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2525&q=80"
        />
        <WorkoutCard
          title="PPL"
          imageUrl="https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2573&q=80"
        />
        <WorkoutCard
          title="Bodyweight"
          imageUrl="https://images.unsplash.com/photo-1593455026613-e30bfc0a54a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
        />
        <WorkoutCard
          title="Cardio"
          imageUrl="https://images.unsplash.com/photo-1649174457187-75c37d3fe7ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2525&q=80"
        />
      </ScrollView>
    </View>
  );
};

export default Workouts;

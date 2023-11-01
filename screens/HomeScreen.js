import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
  Button,
  FlatList,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Spacer from "../components/Spacer";
import CustomButton from "../components/Button";
import Workouts from "../components/WorkoutsList";
import NewWorkout from "./NewWorkoutScreen";
import WorkoutHistoryRecent from "../components/WorkoutHistoryRecent";
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
  const fivePercentWindowHeight = Dimensions.get("window").height * 0.05;
  const SafeAreaViewAndroid =
    Platform.OS === "android" ? fivePercentWindowHeight : 0;

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Home",
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white py-5 mb-5">
      <Spacer size={SafeAreaViewAndroid} />
      <ScrollView>
        <View className="flex-row pb-3 items-center space-x-2">
          <Image
            source={require("../assets/logo-icon-pearl.png")}
            className="h-10 w-10 rounded-tr-2xl rounded-bl-2xl"
          />
          <Text className="font-bold text-2xl">Welcome</Text>
        </View>
        <Workouts />
        <CustomButton
          onPress={() => {
            navigation.navigate("NewWorkout");
          }}
          title="New Workout"
        />
        <Button
          title="test"
          onPress={() => {
            navigation.navigate("NewWorkout");
          }}
        />
        <Spacer size={Dimensions.get("window").height * 0.05} />
        <Text
          className="font-bold text-xl"
          onPress={() => {
            navigation.navigate("WorkoutHistory");
          }}
        >
          {"History >"}
        </Text>
        <WorkoutHistoryRecent />
        <Button
          title="see more..."
          onPress={() => {
            navigation.navigate("WorkoutHistory");
          }}
        />
        {/* <Spacer size={Dimensions.get("window").height * 0.5} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

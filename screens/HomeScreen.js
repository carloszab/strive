import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Spacer from "../components/Spacer";
import CustomButton from "../components/Button";
import Workouts from "../components/WorkoutsList";
import WorkoutHistoryRecent from "../components/WorkoutHistoryRecent";
import WorkoutCalendar from "../components/WorkoutCalendar";
import * as queries from "../src/graphql/queries";
import { useQuery } from "@apollo/client";
import { buttons } from "../styles/buttons";

const HomeScreen = () => {
  const { loading, error, data: workouts } = useQuery(queries.GET_WORKOUTS);

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
        {/* <CustomButton
          onPress={() => {
            navigation.navigate("NewWorkout");
          }}
          title="New Workout"
        /> */}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NewWorkout");
          }}
          style={buttons.button}
          className="mx-3 my-5"
        >
          <Text style={buttons.text}>NEW WORKOUT</Text>
        </TouchableOpacity>

        {/* <Spacer size={Dimensions.get("window").height * 0.05} /> */}

        <Text className="font-bold text-xl">{"Calendar"}</Text>
        <WorkoutCalendar workouts={workouts} loading={loading} error={error} />
        <Spacer size={Dimensions.get("window").height * 0.05} />
        <WorkoutHistoryRecent
          workouts={workouts}
          loading={loading}
          error={error}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

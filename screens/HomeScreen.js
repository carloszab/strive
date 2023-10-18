import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
  Button,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Spacer from "../components/Spacer";
import { ChevronDownIcon as ChevronDownIconOutline } from "react-native-heroicons/outline";
import CustomButton from "../components/Button";
import Workouts from "../components/WorkoutsList";
import NewWorkout from "./NewWorkoutScreen";

import { useQuery, gql, useMutation } from '@apollo/client';
import InsertExercise from "../components/InsertExercise";


const GET_WORKOUT = gql`
  query GetWorkout {
        workout {
          id
          name
          detail
        }
      }
`;



function DisplayWorkouts() {
  const { loading, error, data } = useQuery(GET_WORKOUT);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return data.workout.map(({ id, name }) => (
    <View key={id}>
      <Text>{name}</Text>
    </View>
  ));
}


// function InsertWorkout(name, detail) {

  // const submit = () => {
  //   insertTodo({
  //     variables: { name: "hola", detail: "" },
  //   });
  // };
// }

const HomeScreen = () => {
  const halfWindowsHeight = Dimensions.get("window").height * 0.05;
  const SafeAreaViewAndroid = Platform.OS === "android" ? halfWindowsHeight : 0;

  const navigation = useNavigation();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Home",
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      <Spacer size={SafeAreaViewAndroid} />
      <View className="flex-row pb-3 items-center space-x-2">
        <Image
          source={require("../assets/logo-icon-pearl.png")}
          className="h-10 w-10 rounded-tr-2xl rounded-bl-2xl"
        />
        <Text className="font-bold text-2xl">
          Welcome
        </Text>
      </View>
      <ScrollView>
        <Workouts/>
        <CustomButton onPress={() => {}} title="New Workout" />
        <Button title="test" onPress={() => {navigation.navigate('NewWorkout')}}/>
        {/* <Button title="submit" onPress={submit}/> */}
      </ScrollView>
      <DisplayWorkouts />
      <InsertExercise />
    </SafeAreaView>
  );
};

export default HomeScreen;

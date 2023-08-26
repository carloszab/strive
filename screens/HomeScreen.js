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
        <Text className="font-bold text-xl">
          Welcome
        </Text>
      </View>
      <ScrollView>
        <CustomButton onPress={() => {}} title="New Workout" />
        <Button title="test" color="blue" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

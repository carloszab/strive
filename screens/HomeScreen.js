import { View, Text, SafeAreaView, Dimensions } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Spacer from "../components/Spacer";

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
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Spacer size={SafeAreaViewAndroid} />
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

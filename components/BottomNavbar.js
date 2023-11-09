import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

function BottomNavbar() {
  return (
    <View style={styles.bottomNavbar}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Button 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Button 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Button 3</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60, // Adjust the height as needed
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});

export default BottomNavbar;

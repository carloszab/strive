import { StyleSheet } from "react-native";

export const defaultStyle = StyleSheet.create({
  'button': {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#000",
  },
  'button-active': {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
  },
  'text': {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  'text-active': {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

const primaryButton = {
  ...defaultStyle['button'],
  backgroundColor: "#b90909",
};

export const buttons = StyleSheet.create({
  ...defaultStyle,
  'primary': primaryButton,
});

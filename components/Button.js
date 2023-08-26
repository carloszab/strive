import { React, useState } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

export default function Button(props) {
  const [pressed, setPressed] = useState(false);
  const onPress = (e) => {
    setPressed(!pressed);
  };

  function getPressableStyle() {
    if (pressed) {
      return styles.button_active;
    } else {
      return styles.button;
    }
  }

  function getTextStyle() {
    if (pressed) {
      return styles.text_active;
    } else {
      return styles.text;
    }
  }

  return (
    <StyledPressable
      style={[getPressableStyle(), props.styleButton]}
      onPress={onPress}
    >
      <StyledText selectable={false} style={getTextStyle()}>
        {props.title}
      </StyledText>
    </StyledPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#000",
  },
  button_active: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  text_active: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

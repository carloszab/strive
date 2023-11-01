import { React, useState } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { styled } from "nativewind";
import { buttons } from "../styles/buttons";

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

export default function Button(props) {
  const [pressed, setPressed] = useState(false);
  const onPress = (e) => {
    setPressed(!pressed);
    props.onPress()
  };

  function getPressableStyle() {
    if (pressed) {
      return buttons['button-active'];
    } else {
      return buttons.button;
    }
  }

  function getTextStyle() {
    if (pressed) {
      return buttons.text_active;
    } else {
      return buttons.text;
    }
  }

  return (
    <Pressable
      style={[getPressableStyle(), props.styleButton]}
      onPress={onPress}
    >
      <Text selectable={false} style={getTextStyle()}>
        {props.title}
      </Text>
    </Pressable>
  );
}


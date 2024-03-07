import { Spinner, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import Animated, { withRepeat, withTiming } from "react-native-reanimated";

const Loader = () => {
  const entering = () => {
    "worklet";
    const animations = {
      opacity: withRepeat(withTiming(1, { duration: 1000 }), 50, true),
      transform: [{ scale: withTiming(1, { duration: 500 }) }],
    };
    const initialValues = {
      opacity: 0.5,
      transform: [{ scale: 0.8 }],
    };
    return {
      initialValues,
      animations,
    };
  };
  return (
    <View style={{ justifyContent: "center", alignItems: "center", gap: 10 }}>
      <Spinner />
      <Animated.View entering={entering}>
        <Text style={{ textAlign: "center" }}>Loading ... </Text>
      </Animated.View>
    </View>
  );
};

export default Loader;

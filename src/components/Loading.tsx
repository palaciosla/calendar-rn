import React from "react";
import Layout from "./Layout";
import { Spinner, Text } from "@ui-kitten/components";
import { View } from "react-native";

const Loading = () => {
  return (
    <Layout>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: 4,
        }}
      >
        <Spinner />
        <Text>Loading ... </Text>
      </View>
    </Layout>
  );
};

export default Loading;

import React from "react";
import Layout from "./Layout";
import { View } from "react-native";
import Loader from "./Loader";

const Loading = () => {
  return (
    <Layout style={{ justifyContent: "center", alignItems: "center" }}>
      <Loader />
    </Layout>
  );
};

export default Loading;

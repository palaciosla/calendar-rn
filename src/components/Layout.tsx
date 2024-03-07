import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../theme";

const Layout = ({ children, style }: { children: JSX.Element; style?: any }) => {
  return <View style={{ ...styles.root, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.primary[400],
    height: "100%",
    flex: 1,
  },
});

export default Layout;

import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import Constants from "expo-constants";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Drawer from "./src/components/Drawer";
import AuthProvider from "./src/context/AuthProvider";
import { theme } from "./src/theme";
import { useState } from "react";
import Snackbar from "./src/components/Snackbar";
import * as Font from "expo-font";
import * as mapping from "./mapping.json";

const loadFonts = async () => {
  await Font.loadAsync({
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-extrabold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    "montserrat-light": require("./assets/fonts/Montserrat-Light.ttf"),
    "montserrat-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: "",
  });

  const handleCloseSnackbar = () =>
    setSnackbar({ isVisible: false, message: "" });

  const handleOpenSnackbar = (message: string) => {
    setSnackbar({ isVisible: true, message });
  };

  useEffect(() => {
    loadFonts().finally(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark} customMapping={mapping}>
          <View style={styles.container}>
            <AuthProvider handleOpenSnackbar={handleOpenSnackbar}>
              <NavigationContainer>
                <Drawer />
              </NavigationContainer>
            </AuthProvider>
            {/* <Calendar /> */}
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="light-content"
            />
          </View>

          <Snackbar
            isVisible={snackbar.isVisible}
            handleClose={handleCloseSnackbar}
            message={snackbar.message}
            actionText="Dismiss"
            onActionPress={handleCloseSnackbar}
            duration={2500}
            position="bottom"
          />
        </ApplicationProvider>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary[400],
    paddingTop: Constants.statusBarHeight + 5,
  },
});

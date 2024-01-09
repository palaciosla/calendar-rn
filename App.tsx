import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Calendar from "./src/screens/Calendar";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import Constants from "expo-constants";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
          <View style={styles.container}>
            <Calendar />
          </View>
        </ApplicationProvider>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252a48",
    paddingTop: Constants.statusBarHeight + 5,
  },
});

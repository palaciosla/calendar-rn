import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { useContext } from "react";
import { AuthContext, AuthState } from "../context/AuthProvider";
import { StyleSheet, View } from "react-native";
import { theme } from "../theme";
import { Button, Icon, Text } from "@ui-kitten/components";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const authContext = useContext(AuthContext) as AuthState;
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: theme.colors.primary[100],
        justifyContent: "space-between",
        height: "100%",
      }}
      indicatorStyle="white"
    >
      <View>
        <View style={{ backgroundColor: theme.colors.primary[300] }}>
          <Text
            style={{
              color: "white",
              fontWeight: "800",
              textAlign: "center",
              paddingVertical: 10,
              textTransform: "uppercase",
            }}
          >
            SuenhoLucido
          </Text>
        </View>
        <Button
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate("Calendar")}
        >
          Calendar
        </Button>
        <Button
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate("Profile")}
        >
          Profile
        </Button>
      </View>
      <Button onPress={() => authContext.logOut()}>Logout </Button>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerItem: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
});

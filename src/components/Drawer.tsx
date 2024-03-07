import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useContext } from "react";
import Calendar from "../screens/Calendar";
import Login from "../screens/Login";
import { AuthContext, AuthState } from "../context/AuthProvider";
import CustomDrawerContent from "./CustomDrawerContent";
import Profile from "../screens/Profile";
import Reset from "../screens/Reset";

const Drawer = () => {
  const Drawer = createDrawerNavigator();
  const auth = useContext(AuthContext) as AuthState;
  return (
    <Drawer.Navigator
      initialRouteName="Login"
      drawerContent={CustomDrawerContent}
    >
      {auth && auth.user ? (
        <>
          <Drawer.Screen
            name="Calendar"
            component={Calendar}
            // options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            // options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Reset"
            component={Reset}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default Drawer;

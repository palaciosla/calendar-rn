import { Avatar, Button, Input, Text } from "@ui-kitten/components";
import React, { useContext, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Layout from "../components/Layout";
import { AuthContext, AuthState } from "../context/AuthProvider";
import { auth } from "../../credentials";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user } = useContext(AuthContext) as AuthState;
  const [userData, setUserData] = useState({
    displayName: user.displayName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
  });
  console.log("user ----", user);
  const handleChange = (value: any, name: keyof typeof userData) => {
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpdateUser = () => {
    if (auth && auth.currentUser) {
      updateProfile(auth.currentUser, userData)
        .then((res) => Alert.alert("Profile updated!"))
        .catch(() => Alert.alert("An error occurred!", "Please try again"));
    }
  };

  return (
    <Layout>
      <View
        style={{
          gap: 30,
          paddingHorizontal: 22,
          paddingVertical: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <Text style={styles.title}>Profile</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>{`Hi ${userData.email}!`}</Text>
        </View>
        <View
          style={{ alignItems: "center", justifyContent: "center", gap: 10 }}
        >
          <Avatar source={require("../../assets/avatar.png")} size="giant" />
          <Input
            label="Email"
            defaultValue={userData.email || undefined}
            textContentType="telephoneNumber"
            onChangeText={(value) => handleChange(Number(value), "email")}
          />
          <Input
            label="Phone Number"
            defaultValue={userData.phoneNumber || undefined}
            onChangeText={(value) => handleChange(value, "phoneNumber")}
          />
          <Input
            label="Name"
            defaultValue={userData.displayName || undefined}
            onChangeText={(value) => handleChange(value, "displayName")}
          />
          {/* <Input label="Password" secureTextEntry /> */}
        </View>
        <Button onPress={handleUpdateUser}>UPDATE</Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "800",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
});

export default Profile;

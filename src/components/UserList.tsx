import { Avatar, Layout, Text, Tooltip } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { PROFILES } from "../utils/mock";

interface UserListProps {
  users: number[];
}

const getUserInfo = (id: number) => {
  return PROFILES.find((prof) => prof.id === id)?.name;
};

const UserList = ({ users }: UserListProps) => {
  const [visible, setVisible] = useState(false);
  return users.length <= 2 ? (
    <>
      <Avatar
        source={require("../../assets/profile-pic1.jpg")}
        size="small"
        shape="square"
        style={styles.rounded}
      />
      <Avatar
        source={require("../../assets/profile-pic2.jpg")}
        size="small"
        shape="square"
        style={styles.rounded}
      />
    </>
  ) : (
    <>
      <Avatar
        source={require("../../assets/profile-pic1.jpg")}
        size="small"
        shape="square"
        style={styles.rounded}
      />
      <View style={styles.container}>
        <Tooltip
          anchor={() => (
            <Text
              category="label"
              style={{ fontWeight: "800" }}
              onPress={() => setVisible(true)}
            >
              +{users.length - 1}
            </Text>
          )}
          visible={visible}
          onBackdropPress={() => setVisible(false)}
          style={styles.tooltip}
        >
          <Layout>
            {users.slice(1).map((user, index) => (
              <Text key={index} category="label" style={{ color: "#fff" }}>
                {getUserInfo(user)}
              </Text>
            ))}
          </Layout>
        </Tooltip>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rounded: { borderRadius: 8 },
  container: {
    width: 33,
    height: 33,
    backgroundColor: "#4a5592",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  tooltip: { backgroundColor: "#252a50", borderColor: "#252a80" },
});

export default UserList;

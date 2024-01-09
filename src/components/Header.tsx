import { Button, Icon, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setModalIsOpen }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Text category="h2">Schedule</Text>
      <TouchableOpacity onPress={() => setModalIsOpen(true)}>
        <Icon name="plus-circle-outline" fill="#FFF" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 35,
    alignItems: "center",
  },
  icon: { width: 30, height: 30 },
});

export default Header;

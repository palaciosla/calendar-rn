import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SnackbarProps {
  message: string;
  actionText: string;
  onActionPress: () => void;
  duration: number;
  position: string;
  isVisible: boolean;
  handleClose: () => void;
}

const Snackbar = ({
  isVisible,
  handleClose,
  message,
  actionText,
  onActionPress,
  duration = 3000,
  position = "bottom",
}: SnackbarProps) => {
  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [isVisible, duration]);

  return isVisible ? (
    <View
      style={[
        styles.container,
        position === "top" ? styles.topContainer : styles.bottomContainer,
        { backgroundColor: "#252a50", marginHorizontal: 12 },
      ]}
    >
      <Text style={[styles.messageText]}>{message}</Text>
      {actionText && (
        <TouchableOpacity onPress={onActionPress}>
          <Text style={[styles.actionText]}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    left: 0,
    right: 0,
  },
  topContainer: {
    top: 15,
  },
  bottomContainer: {
    bottom: 15,
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#fff",
  },
});

export default Snackbar;

import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components";
import { theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { AuthContext, AuthState } from "../context/AuthProvider";

const Reset = () => {
  const navigation = useNavigation();
  const { sendResetPasswordEmail } = useContext(AuthContext) as AuthState;
  const [email, setEmail] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!email) return;
    sendResetPasswordEmail(email);
  };

  return (
    <Layout style={styles.container}>
      <>
        <View style={styles.card}>
          <Text style={styles.text}>Send a code verification</Text>
          <View>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Email"
                style={styles.input}
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            <Button style={styles.sendBtn} onPress={handleSubmit}>
              Send
            </Button>
          </View>
        </View>
        <TouchableOpacity
          style={styles.forgot}
          onPress={() => navigation.navigate("Login" as never)}
        >
          <Text>Go to login</Text>
        </TouchableOpacity>
      </>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "85%",
    backgroundColor: theme.colors.primary[300],
    padding: 25,
    borderRadius: 10,
    gap: 15,
  },
  sendBtn: {
    marginTop: 12,
  },
  input: {},
  text: {
    fontSize: 22,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
  },
  inputContainer: {
    gap: 4,
  },
  forgot: {
    position: "absolute",
    bottom: 15,
    fontWeight: "700",
  },
});

export default Reset;

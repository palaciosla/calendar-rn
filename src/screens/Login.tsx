import { Input, Button, Spinner, Text } from "@ui-kitten/components";
import React, { useContext } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { AuthContext, AuthState } from "../context/AuthProvider";
import { theme } from "../theme";
import Loading from "../components/Loading";
import Layout from "../components/Layout";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideInRight,
} from "react-native-reanimated";

const schema = yup.object().shape({
  email: yup.string().email().required("The email is required"),
  password: yup.string().trim().required("The password is required"),
});

interface FormData {
  email: string;
  password: string;
}

const INITIAL_FORM_DATA: FormData = {
  email: "",
  password: "",
};

const Login = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext) as AuthState;
  const { values, resetForm, handleChange, errors, handleSubmit } =
    useFormik<FormData>({
      initialValues: INITIAL_FORM_DATA,
      onSubmit: (values) => {
        login(values);
      },
      validationSchema: schema,
    });

  const login = async (values: FormData) => {
    try {
      auth &&
        auth
          .loginUser(values)
          .then(() => {
            resetForm();
            navigation.navigate("Calendar" as never);
          })
          .catch((error) =>
            auth.handleOpenSnackbar("Invalid email or password.")
          );
    } catch (error) {
      console.log("error logging", error);
      auth.handleOpenSnackbar("Invalid email or password.");
    }
  };

  return (
    <Layout style={styles.container}>
      <>
        <Animated.View
          entering={SlideInRight.duration(500)}
          exiting={SlideInDown.duration(200)}
        >
          <View style={styles.card}>
            <Text style={styles.text}>Welcome to SuenhoLucido!</Text>
            <View>
              <View style={styles.inputContainer}>
                <Input
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  status={errors.email ? "danger" : "primary"}
                  style={styles.input}
                />
                {errors.email && (
                  <Text
                    style={{
                      paddingTop: 5,
                      paddingBottom: 5,
                      fontSize: 12,
                      color: theme.colors.secondary[200],
                    }}
                  >
                    {errors.email}
                  </Text>
                )}
                <Input
                  placeholder="Password"
                  value={values.password}
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  status={errors.password ? "danger" : "primary"}
                  style={styles.input}
                />
                {errors.password && (
                  <Text
                    style={{
                      paddingTop: 5,
                      fontSize: 12,
                      color: theme.colors.secondary[200],
                    }}
                  >
                    {errors.password}
                  </Text>
                )}
              </View>
              <Button
                style={styles.loginBtn}
                onPress={() => handleSubmit()}
                disabled={auth && auth.loading}
              >
                {auth && auth.loading ? (
                  <View>
                    <Spinner />
                  </View>
                ) : (
                  <Text>Login</Text>
                )}
              </Button>
            </View>
          </View>
        </Animated.View>
        <TouchableOpacity
          style={{ ...styles.forgot }}
          onPress={() => navigation.navigate("Reset" as never)}
        >
          <Text>Forgot your Password?</Text>
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
  loginBtn: {
    marginTop: 12,
  },
  input: {},
  text: {
    fontSize: 22,
    fontWeight: "800",
    color: "white",
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

export default Login;

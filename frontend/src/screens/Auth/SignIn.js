import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import firebase from "@react-native-firebase/app";

function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <Button title="Sign In" onPress={handleSignIn} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate("SignUp")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  error: {
    color: "red",
  },
});

export default SignIn;

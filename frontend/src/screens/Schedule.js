import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

function ScheduleScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome ScheduleScreen!</Text>
      <Button
        mode="contained"
        onPress={() => {
          /* Navigate or any action */
        }}
      >
        Click Me
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default ScheduleScreen;

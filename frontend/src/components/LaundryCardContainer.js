import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LaundryCard from "./LaundryCard";

function LaundryCardContainer() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laundry Status</Text>
      <LaundryCard title="Washer 1" status="In Use" timeRemaining="15 mins" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
  },
});

export default LaundryCardContainer;

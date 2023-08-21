import { Card, Title, Paragraph } from "react-native-paper";
import React from "react";
import { StyleSheet } from "react-native";

function LaundryCard({ title, status, timeRemaining }) {
  return (
    <Card style={styles.card}>
      <Title>{title}</Title>
      <Paragraph>Status: {status}</Paragraph>
      <Paragraph>Time Remaining: {timeRemaining}</Paragraph>
    </Card>
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

export default LaundryCard;

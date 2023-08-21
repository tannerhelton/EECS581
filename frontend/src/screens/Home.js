import React from "react";
import { View, Text, Button } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Go to Details"
        onPress={() => console.log("Button Pressed")}
      />
    </View>
  );
};

export default Home;

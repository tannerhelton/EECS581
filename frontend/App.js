import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/Home";
import MealsScreen from "./src/screens/Meals";
import EventsScreen from "./src/screens/Schedule";
import MessagingScreen from "./src/screens/Messages";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Meals" component={MealsScreen} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Messaging" component={MessagingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

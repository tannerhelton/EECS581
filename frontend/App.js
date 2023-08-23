import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import firebase from "@react-native-firebase/app";

import AuthNavigator from "./AuthNavigator";

import HomeScreen from "./src/screens/Home";
import MealsScreen from "./src/screens/Meals";
import EventsScreen from "./src/screens/Schedule";
import MessagingScreen from "./src/screens/Messages";

const Tab = createBottomTabNavigator();

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Meals" component={MealsScreen} />
          <Tab.Screen name="Events" component={EventsScreen} />
          <Tab.Screen name="Messaging" component={MessagingScreen} />
        </Tab.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

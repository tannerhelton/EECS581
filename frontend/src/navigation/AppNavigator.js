import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Home";
import MealsScreen from "../screens/Meals";
import EventsScreen from "../screens/Schedule";
import MessagingScreen from "../screens/Messages";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Meals" component={MealsScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Messaging" component={MessagingScreen} />
    </Tab.Navigator>
  );
}

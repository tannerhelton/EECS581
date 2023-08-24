import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/Auth/SignIn";

const AuthStack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignIn} />
    </AuthStack.Navigator>
  );
}

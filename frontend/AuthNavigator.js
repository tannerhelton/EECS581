import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./src/screens/Auth/SignIn";

const AuthStack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignIn} />
      {/* <AuthStack.Screen name="SignUp" component={SignUp} /> */}
    </AuthStack.Navigator>
  );
}

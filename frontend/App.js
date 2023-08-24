import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

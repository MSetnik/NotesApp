import React from "react";

// React navigation
import { NavigationContainer } from "@react-navigation/native";

// Routes
import StackNavigation from "./src/routes/stack-navigation";

export default function App () {
  return (
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
  );
}

import * as React from "react";

// Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Scenes
import Home from "../scenes/home";
import NoteDetails from "../scenes/note-details";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NoteDetails" component={NoteDetails} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

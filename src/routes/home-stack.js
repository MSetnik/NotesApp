import React from "react";
import { Platform } from "react-native";
// Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Scenes
import Home from "../scenes/home";
import NoteDetails from "../scenes/note-details";
import Settings from "../scenes/settings";
// Firebase

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      presentation: Platform.OS !== "ios" ? "transparentModal" : "card"
    }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NoteDetails" component={NoteDetails} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default HomeStack;

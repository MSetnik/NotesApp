import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
// Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Scenes
import Home from "../scenes/home";
import NoteDetails from "../scenes/note-details";
import Settings from "../scenes/settings";
import Login from "../scenes/login";
import Register from "../scenes/register";

// Firebase
import { Firebase } from "../firebase-config";

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      presentation: Platform.OS !== "ios" ? "transparentModal" : "card"
    }}
    >
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Register" component={Register}/>
    </Stack.Navigator>
  );
};

export default LoginStack;

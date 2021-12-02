import React, { useEffect, useReducer, useState } from "react";

import { ActivityIndicator, useColorScheme, View } from "react-native";

// React navigation
import { NavigationContainer } from "@react-navigation/native";

// Routes
import HomeStack from "./src/routes/home-stack";
import LoginStack from "./src/routes/login-stack";

// Reducers
import { initialState } from "./src/store/initial-state";
import { reducer, StoreContext } from "./src/store/reducer";
import { actions, createAction } from "./src/store/actions";

// Async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
import { ASYNC_STORAGE_KEY, THEME_KEY } from "./src/constants";

// Firebase
import Firebase from "./src/firebase-config";
import { Colors } from "./src/styles";

export default function App () {
  const [state, dispatch] = useReducer(reducer, initialState);
  const colorScheme = useColorScheme();

  useEffect(() => {
    dispatch(createAction(actions.SET_THEME, colorScheme));

    const getDataAsyncStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        const theme = await AsyncStorage.getItem(THEME_KEY);

        if (value !== null) {
          dispatch(createAction(actions.ADD_NOTE, JSON.parse(value)));
          dispatch(createAction(actions.SET_THEME, theme));
          dispatch(createAction(actions.END_LOADER));
        } else {
          dispatch(createAction(actions.ADD_NOTE, []));
          dispatch(createAction(actions.SET_THEME, theme));
          dispatch(createAction(actions.END_LOADER));
        }
      } catch (e) {
        console.log(e);
      }
    };

    getDataAsyncStorage();
  }, []);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged (user) {
    if (user !== null) {
      dispatch(createAction(actions.USER_LOGIN, user.email));
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = Firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: Colors.themeColor(state.theme).background }}>
        <ActivityIndicator size="large" color={Colors.themeColor(state.theme).secondary} />
      </View>
    );
  }

  if (!state.user) {
    return (
      <StoreContext.Provider value={{ dispatch, state }}>
        <NavigationContainer>
          <LoginStack/>
        </NavigationContainer>
      </StoreContext.Provider>
    );
  }

  return (
    <StoreContext.Provider value={{ dispatch, state }}>
      <NavigationContainer>
        <HomeStack/>
      </NavigationContainer>
    </StoreContext.Provider>
  );
}

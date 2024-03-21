import React, { useCallback, useEffect, useReducer, useState } from "react";

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
import { Colors } from "./src/styles";
import { getAuth } from "firebase/auth";
import { getStoredUser } from "./src/helpers/async-storage-helper";

// Splash Screen
import * as SplashScreen from "expo-splash-screen";
import { getUserNotes } from "./src/endpoint/firestore";

SplashScreen.preventAutoHideAsync();

export default function App () {
  const [state, dispatch] = useReducer(reducer, initialState);
  const colorScheme = useColorScheme();

  useEffect(() => {
    dispatch(createAction(actions.SET_THEME, colorScheme));

    const getDataAsyncStorage = async () => {
      try {
        const notes = JSON.parse(await AsyncStorage.getItem(ASYNC_STORAGE_KEY));
        const userData = await getStoredUser();
        const theme = await AsyncStorage.getItem(THEME_KEY);

        if (userData) {
          dispatch(createAction(actions.USER_LOGIN, userData));
        }

        if (notes !== null) {
          if (userData && userData.email === "Guest") {
            dispatch(createAction(actions.ADD_NOTE, notes));
            dispatch(createAction(actions.ADD_LOCAL_NOTES, notes));
          } else if (userData && userData.email !== "Guest") {
            getUserNotes(userData.uid, dispatch)
              .then(async () => {
                setInitializing(false);
                await SplashScreen.hideAsync();
              });
            // dispatch(createAction(actions.ADD_NOTE, userNotes));
          }
          dispatch(createAction(actions.SET_THEME, theme));
          dispatch(createAction(actions.END_LOADER));
        } else {
          dispatch(createAction(actions.ADD_NOTE, []));
          dispatch(createAction(actions.SET_THEME, theme));
          dispatch(createAction(actions.END_LOADER));
        }

        setInitializing(false);

        await SplashScreen.hideAsync();
      } catch (e) {
        console.error(e);
      }
    };

    getDataAsyncStorage();
  }, []);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  async function onAuthStateChanged (user) {
    if (user && user !== null) {
      dispatch(createAction(actions.USER_LOGIN, user.email));

      if (user.email === "Guest") {
        const notes = JSON.parse(await AsyncStorage.getItem(ASYNC_STORAGE_KEY));

        dispatch(createAction(actions.ADD_NOTE, notes));
        dispatch(createAction(actions.ADD_NOTE, notes));
      } else {
        dispatch(createAction(actions.ADD_NOTE, []));
      }
    }
    // if (initializing) setInitializing(false);
  }

  let auth;
  useEffect(() => {
    if (!auth) {
      auth = getAuth();
    }

    const subscriber = async () => {
      await onAuthStateChanged(auth, (user) => onAuthStateChanged(user));
    };

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
        <NavigationContainer >
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

import React, { useEffect, useReducer } from "react";

// React navigation
import { NavigationContainer } from "@react-navigation/native";

// Routes
import StackNavigation from "./src/routes/stack-navigation";

// Reducers
import { initialState } from "./src/store/initial-state";
import { reducer, StoreContext } from "./src/store/reducer";
import { actions, createAction } from "./src/store/actions";

// Async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
import { ASYNC_STORAGE_KEY } from "./src/constants";

export default function App () {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getDataAsyncStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);

        if (value !== null) {
          dispatch(createAction(actions.ADD_NOTE, JSON.parse(value)));
          dispatch(createAction(actions.END_LOADER));
        } else {
          dispatch(createAction(actions.ADD_NOTE, []));
          dispatch(createAction(actions.END_LOADER));
        }
      } catch (e) {
        console.log(e);
      }
    };

    getDataAsyncStorage();
  }, []);

  return (
    <StoreContext.Provider value={{ dispatch, state }}>
      <NavigationContainer>
        <StackNavigation/>
      </NavigationContainer>
    </StoreContext.Provider>
  );
}

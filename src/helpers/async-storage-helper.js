import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_KEY } from "../constants";

const USER_DATA = "@user_data";

export const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem(USER_DATA, JSON.stringify(user));
  } catch (error) {
    // Error saving data
    console.error(error, "Async storage storeUser");
  }
};

export const getStoredUser = async () => {
  try {
    const value = await AsyncStorage.getItem(USER_DATA);
    if (value !== null) {
      // We have data!!
      console.log(value);
      return JSON.parse(value);
    }

    return null;
  } catch (error) {
    // Error retrieving data
    console.error(error, "Async storage getStoredUser() ");
  }
};

export const storeLocalNotes = async (notes) => {
  try {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    // Error saving data
    console.error(error, "Async storage storeUser");
  }
};

export const getStoredLocalNotes = async () => {
  try {
    const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
    if (value !== null) {
      // We have data!!
      return JSON.parse(value);
    }

    return null;
  } catch (error) {
    // Error retrieving data
    console.error(error, "Async storage getStoredUser() ");
  }
};

// import { useContext } from "react";

// // Store

// import { actions, createAction } from "../store/actions";

// const store = useContext(StoreContext);
// const state = store.state;

// Theme colors
export const darkTheme = {
  background: "#000000",
  card1: "#EBB8B8",
  card2: "#C3B7F0",
  card3: "#B9EAA3",
  card4: "#EBF38A",
  card5: "#8AC7F2",
  card6: "#EFC8DB",
  btnColor: "#333332",
  addNoteBtn: "#333332",
  error: "#db0f0f",
  textColor: "#FFFFFF",
  textColorSecondary: "#000000",
  backgroundSecondary: "#7a7a79",
  shadowColor: "#000",
  switchTrue: "#81b0ff",
  switchFalse: "#767577",
  dateColor: "#838383"

};

export const lightTheme = {
  background: "#FFFFFF",
  card1: "#EBB8B8",
  card2: "#C3B7F0",
  card3: "#B9EAA3",
  card4: "#EBF38A",
  card5: "#8AC7F2",
  card6: "#EFC8DB",
  btnColor: "#EAEAEA",
  addNoteBtn: "#FFFFFF",
  error: "#DB0F0F",
  textColor: "#000000",
  textColorSecondary: "#FFFFFF",
  backgroundSecondary: "#F7F7F7",
  shadowColor: "#000",
  switchTrue: "#81b0ff",
  switchFalse: "#767577",
  dateColor: "#838383"
};

// Color theme selector
export const themeColor = (colorScheme) => {
  // const currentThemeType = "light";

  // if (store.state.darkTheme) {
  // }

  if (colorScheme === "light") {
    return lightTheme;
  } else {
    return darkTheme;
  }
};

// Opacity setup
export const DISABLED_OPACITY = 0.4;
export const OPACITY_80 = 0.8;

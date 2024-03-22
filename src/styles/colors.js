
// Theme colors
export const darkTheme = {
  primary: "#4AA4F4",
  primaryDark: "#0a529e",
  secondary: "#3DF5AF",
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
  errorLight: "#ffbdbd",
  textColor: "#FFFFFF",
  textColorSecondary: "#000000",
  backgroundSecondary: "#7a7a79",
  shadowColor: "#000",
  switchTrue: "#81b0ff",
  switchFalse: "#767577",
  dateColor: "#838383",
  success: "#06A77D",
  warning: "#FE9B2B",
  placeholderColor: "#404040"

};

export const lightTheme = {
  primary: "#4AA4F4",
  primaryDark: "#0a529e",
  secondary: "#5E58F6",
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
  errorLight: "#ffbdbd",
  textColor: "#000000",
  textColorSecondary: "#FFFFFF",
  backgroundSecondary: "#F7F7F7",
  shadowColor: "#000",
  switchTrue: "#81b0ff",
  switchFalse: "#767577",
  dateColor: "#838383",
  success: "#06A77D",
  warning: "#FE9B2B",
  placeholderColor: "#d9d9d9"
};

// Color theme selector
export const themeColor = (colorScheme) => {
  if (colorScheme === "light") {
    return lightTheme;
  } else {
    return darkTheme;
  }
};

// Opacity setup
export const DISABLED_OPACITY = 0.4;
export const OPACITY_80 = 0.8;

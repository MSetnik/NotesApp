// Theme colors
export const darkTheme = {
  background: "#FFFFFF",
  card1: "#EBB8B8",
  card2: "#C3B7F0",
  card3: "#B9EAA3",
  card4: "#EBF38A",
  card5: "#8AC7F2",
  card6: "#EFC8DB",
  btnColor: "#EAEAEA",
  error: "#db0f0f",
  textColor: "#FFFFFF",
  textColorSecondary: "#000000",
  backgroundSecondary: "#F7F7F7"

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
  error: "#DB0F0F",
  textColor: "#000000",
  textColorSecondary: "#FFFFFF",
  backgroundSecondary: "#F7F7F7"
};

// Color theme selector
export const themeColor = () => {
  const currentThemeType = "light";

  if (currentThemeType === "light") {
    return lightTheme;
  } else {
    return darkTheme;
  }
};

// Opacity setup
export const DISABLED_OPACITY = 0.4;
export const OPACITY_80 = 0.8;

import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Switch, Platform } from "react-native";

// Constants
import Constants from "expo-constants";
import { THEME_KEY } from "../constants";

// Styles
import { SharedStyles, Typography, Colors } from "../styles";

// Localizations
import { localization } from "../localization";

// Components
import { CircleBtn } from "../components/atoms";
import { Header } from "../components/molecules";
// Expo icons
import { Feather } from "@expo/vector-icons";

// Store
import { StoreContext } from "../store/reducer";
import { actions, createAction } from "../store/actions";

// Async Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// const appVersion = Constants.manifest.version;
const appVersion = 1;

const Settings = ({ navigation }) => {
  const store = useContext(StoreContext);
  const state = store.state;
  const dispatch = store.dispatch;

  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(state.theme !== "light");

  const toggleSwitch = (switchState) => {
    setIsDarkModeEnabled(!isDarkModeEnabled);

    if (!switchState) {
      dispatch(createAction(actions.SET_THEME, "light"));
      saveThemeAsyncStorage("light");
    } else {
      dispatch(createAction(actions.SET_THEME, "dark"));
      saveThemeAsyncStorage("dark");
    }
  };

  const saveThemeAsyncStorage = async (theme) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={[SharedStyles.layout.safeArea, {
      paddingTop: Typography.FONT_SIZE_TITLE_LG * 2,
      backgroundColor: Colors.themeColor(state.theme).background
    }]}>
      <Header
        leftElement={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CircleBtn
              color={Colors.themeColor(state.theme).btnColor}
              onPress={() => navigation.goBack()}
            >
              <Feather name="chevron-left" size={Typography.FONT_SIZE_TITLE_MD} color={Colors.themeColor(state.theme).textColor} />
            </CircleBtn>
            <Text style={[SharedStyles.typography.titleLarge, { color: Colors.themeColor(state.theme).textColor, marginLeft: Typography.FONT_SIZE_TITLE_MD }]}>
              {localization("settingsTitle")}
            </Text>
          </View>

        }
        rightElement={null}
      />

      <View style={[styles.container, { backgroundColor: Colors.themeColor(state.theme).background }]}>

        <Text style={[SharedStyles.typography.subtitle, styles.subTitle, { color: Colors.themeColor(state.theme).textColor }]}>{localization("theme")}</Text>
        <View style={styles.dataContainer}>
          <View style={[styles.dataItem, { borderColor: Colors.themeColor(state.theme).textColor }]}>
            <Text style={[SharedStyles.typography.bodySmall, { color: Colors.themeColor(state.theme).textColor }]}>{localization("darkMode")}</Text>
            <Switch
              style={{ transform: Platform.OS === "ios" ? [{ scaleX: 0.7 }, { scaleY: 0.7 }] : [{ scaleX: 1 }, { scaleY: 1 }] }}
              thumbColor={isDarkModeEnabled ? Colors.themeColor(state.theme).backgroundSecondary : Colors.themeColor(state.theme).background}
              trackColor={{ false: Colors.themeColor(state.theme).switchFalse, true: Colors.themeColor(state.theme).switchTrue }}
              onValueChange={toggleSwitch}
              value={isDarkModeEnabled}
            />
          </View>
        </View>
        <Text style={[SharedStyles.typography.subtitle, styles.subTitle, { color: Colors.themeColor(state.theme).textColor }]}>{localization("about")}</Text>
        <View style={styles.dataContainer}>
          <View style={[styles.dataItem, { color: Colors.themeColor(state.theme).textColor, borderColor: Colors.themeColor(state.theme).textColor }]}>
            <Text style={[SharedStyles.typography.bodySmall, { color: Colors.themeColor(state.theme).textColor }]}>{localization("appVersion")}</Text>
            <Text style={[SharedStyles.typography.bodyMedum, { color: Colors.themeColor(state.theme).textColor, marginRight: Typography.FONT_SIZE_TITLE_MD * 0.5 }]}>{appVersion}</Text>
          </View>
        </View>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Typography.FONT_SIZE_TITLE_LG,
    marginTop: Typography.FONT_SIZE_TITLE_MD
  },
  title: {
    paddingBottom: Typography.FONT_SIZE_TITLE_LG
  },
  subTitle: {
    paddingBottom: Typography.FONT_SIZE_SMALL - 2
  },
  dataContainer: {
    paddingBottom: Typography.FONT_SIZE_TITLE_LG
  },
  dataItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Typography.FONT_SIZE_SMALL,
    borderBottomWidth: 0.2
  }

});

export default Settings;

import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Switch, Platform, Pressable, Alert } from "react-native";

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

// Firebase
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getAuth, signOut } from "firebase/auth";
import { storeLocalNotes, storeUser } from "../helpers/async-storage-helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addUserNote } from "../endpoint/firestore";

const appVersion = Constants.expoConfig.version;

const Settings = ({ navigation }) => {
  const { top } = useSafeAreaInsets();
  const store = useContext(StoreContext);
  const state = store.state;
  const dispatch = store.dispatch;

  const auth = getAuth();

  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(state.theme !== "light");

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out!");
        dispatch(createAction(actions.USER_LOGIN, null));
        dispatch(createAction(actions.ADD_NOTE, []));
        storeUser(null);
      });
  };

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

  const syncLocalNotesWithFirestore = async () => {
    try {
      await state.localNotes.forEach(async (note) => {
        await addUserNote(state.user.uid, note);
      });

      dispatch(createAction(actions.ADD_LOCAL_NOTES, []));
      await storeLocalNotes([]);

      Alert.alert("Sinkronizacija uspješna");
    } catch (e) {
      Alert.alert("Greška kod sinkronizacije. Pokušajte ponovno kasnije.");
    }
  };

  return (
    <View style={[SharedStyles.layout.safeArea, {
      paddingTop: top,
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

      <View style={[styles.container]}>

        <Text style={[SharedStyles.typography.subtitle, { color: Colors.themeColor(state.theme).textColor }]}>User</Text>
        <View style={styles.dataContainer}>
          <View style={[styles.dataItem, { borderColor: Colors.themeColor(state.theme).textColor }]}>
            <Text style={[SharedStyles.typography.bodySmall, { color: Colors.themeColor(state.theme).textColor }]}>{state.user.email}</Text>
          </View>
        </View>

        <Text style={[SharedStyles.typography.subtitle, { color: Colors.themeColor(state.theme).textColor }]}>{localization("appSettings")}</Text>
        <View style={styles.dataContainer}>
          <View style={[styles.dataItem, { borderColor: Colors.themeColor(state.theme).textColor }]}>
            <Text style={[SharedStyles.typography.bodySmall, { color: Colors.themeColor(state.theme).textColor }]}>{localization("darkMode")}</Text>
            <Switch
              style={{ transform: Platform.OS === "ios" ? [{ scaleX: 0.7 }, { scaleY: 0.7 }] : [{ scaleX: 1 }, { scaleY: 1 }] }}
              thumbColor={isDarkModeEnabled ? Colors.themeColor(state.theme).backgroundSecondary : Colors.themeColor(state.theme).background}
              trackColor={{ true: Colors.themeColor(state.theme).secondary, false: Colors.themeColor(state.theme).primary }}
              onValueChange={toggleSwitch}
              value={isDarkModeEnabled}
            />
          </View>
          {
            state.user.email !== "Guest" && state.localNotes.length !== 0 &&
            <Pressable
              style={[styles.dataItem, { borderColor: Colors.themeColor(state.theme).textColor }]}
              onPress={() => {
                syncLocalNotesWithFirestore();
              }}
            >
              <Text style={[SharedStyles.typography.bodySmall, { color: Colors.themeColor(state.theme).textColor }]}>{localization("syncNotes")}</Text>
              <View style={{}}>
                <Feather name="chevron-right" size={18}/>
              </View>
            </Pressable>
          }

        </View>

        <Text style={[SharedStyles.typography.subtitle, { color: Colors.themeColor(state.theme).textColor }]}>{localization("about")}</Text>
        <View style={styles.dataContainer}>
          <View style={[styles.dataItem, { color: Colors.themeColor(state.theme).textColor, borderColor: Colors.themeColor(state.theme).textColor }]}>
            <Text style={[SharedStyles.typography.bodySmall, { color: Colors.themeColor(state.theme).textColor }]}>{localization("appVersion")}</Text>
            <Text style={[SharedStyles.typography.bodyMedum, { color: Colors.themeColor(state.theme).textColor, marginRight: Typography.FONT_SIZE_TITLE_MD * 0.5 }]}>{appVersion}</Text>
          </View>
        </View>

      </View>

      <View style={[styles.container, { color: Colors.themeColor(state.theme).textColor, borderColor: Colors.themeColor(state.theme).textColor, justifyContent: "flex-start", flex: 1 }]}>
        <CircleBtn color={ state.user.email === "Guest" ? Colors.themeColor(state.theme).secondary : Colors.themeColor(state.theme).error} style={{ marginBottom: Typography.FONT_SIZE_TITLE_MD, justifyContent: "center", alignItems: "center" }}
          onPress={() => logout()}
        >
          {
            <Text style={[SharedStyles.typography.button, { color: Colors.themeColor("dark").textColor }]}>{
              state.user.email === "Guest" ? localization("login") : localization("logout")
            }</Text>
          }
        </CircleBtn>
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

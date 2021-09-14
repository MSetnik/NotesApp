import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import CircleBtn from "../components/atoms/circle-btn";
import Header from "../components/molecules/header";

// Component
import NoteCard from "../components/molecules/note-card";

// Expo icons
import { Feather } from "@expo/vector-icons";
import { Colors, SharedStyles, Typography } from "../styles";

// Store
import { StoreContext } from "../store/reducer";

// Localization
import { localization } from "../localization";

const Settings = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.themeColor().background, paddingTop: Typography.FONT_SIZE_TITLE_LG * 2 }}>

    </View>
  );
};

export default Settings;

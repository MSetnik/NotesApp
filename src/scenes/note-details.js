import React, { useRef } from "react";
import { View, Text, TextInput, KeyboardAvoidingView, Platform, Pressable } from "react-native";

// Styles
import { Colors, Typography } from "../styles";

// Components
import CircleBtn from "../components/atoms/circle-btn";
import Header from "../components/molecules/header";

// Expo icons
import { Feather } from "@expo/vector-icons";

const NoteDetails = ({ navigation, route }) => {
  const editText = useRef(null);

  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.themeColor().background,
      paddingTop: Typography.FONT_SIZE_TITLE_LG * 2
    }}>
      <Header
        leftElement={
          <CircleBtn
            color={Colors.themeColor().btnColor}
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-left" size={Typography.FONT_SIZE_TITLE_MD} color="black" />
          </CircleBtn>
        }
        rightElement={
          <CircleBtn color={Colors.themeColor().btnColor}>
            <Text style={{ fontSize: Typography.FONT_SIZE_NORMAL }}>Save</Text>
          </CircleBtn>

        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ paddingHorizontal: 20, flex: 1 }}>
        <TextInput style={{
          flexDirection: "row",
          fontSize: Typography.FONT_SIZE_TITLE_LG,
          marginTop: 10,
          fontWeight: "bold"
        }}
        placeholder='Title'
        />

        <Text style={{ fontSize: Typography.FONT_SIZE_NORMAL, marginTop: 20, color: "#838383" }}>May 20, 2021</Text>

        <View style={{ flex: 1, marginTop: 10 }} >
          <Pressable style={{ flex: 1 }} onPress={() => {
            editText.current.focus();
          }}>
            <TextInput
              ref={editText}
              multiline={true}
              style={{
                fontSize: Typography.FONT_SIZE_TITLE_LG,
                fontWeight: "bold"
              }}
              placeholder="Type something ..."
            />
          </Pressable>

        </View>

      </KeyboardAvoidingView>

    </View>
  );
};

export default NoteDetails;

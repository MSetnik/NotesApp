import React, { useRef, useState } from "react";
import { View, Text, TextInput, KeyboardAvoidingView, Platform, Pressable } from "react-native";

// Styles
import { Colors, Typography } from "../styles";

// Components
import CircleBtn from "../components/atoms/circle-btn";
import Header from "../components/molecules/header";

// Expo icons
import { Feather } from "@expo/vector-icons";
import { dateHelper } from "../helpers";

const NoteDetails = ({ navigation, route }) => {
  const editText = useRef(null);
  let note;
  const date = new Date();

  if (route.params !== undefined) {
    note = route.params.item;
  }

  const [title, setTitle] = useState(note !== undefined ? note.title : "");
  const [content, setContent] = useState(note !== undefined ? note.content : "");

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
        onChangeText={(e) => setTitle(e)}
        placeholder='Title'
        value={title}
        />

        <Text style={{ fontSize: Typography.FONT_SIZE_NORMAL, marginTop: 20, color: "#838383" }}>{note !== undefined ? dateHelper.formatDate(note.date) : dateHelper.formatDate(date)}</Text>

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
              onChangeText={(e) => setContent(e)}
              placeholder="Type something ..."
              value={content}
            />
          </Pressable>

        </View>

      </KeyboardAvoidingView>

    </View>
  );
};

export default NoteDetails;

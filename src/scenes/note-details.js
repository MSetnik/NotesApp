import React, { useRef, useState, useContext } from "react";
import { View, Text, TextInput, KeyboardAvoidingView, Platform, Pressable, LogBox } from "react-native";

// Styles
import { Colors, Typography } from "../styles";

// Components
import CircleBtn from "../components/atoms/circle-btn";
import Header from "../components/molecules/header";

// Expo icons
import { Feather } from "@expo/vector-icons";
import { dateHelper } from "../helpers";

// Store
import { StoreContext } from "../store/reducer";
import { actions, createAction } from "../store/actions";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state"
]);

const colors = [
  Colors.themeColor().card1,
  Colors.themeColor().card2,
  Colors.themeColor().card3,
  Colors.themeColor().card4,
  Colors.themeColor().card5,
  Colors.themeColor().card6
];

const NoteDetails = ({ navigation, route }) => {
  const store = useContext(StoreContext);
  const state = store.state;
  const dispatch = store.dispatch;

  const editText = useRef(null);

  let note;
  const date = new Date();

  if (route.params !== undefined) {
    note = route.params.item;
  }

  const [title, setTitle] = useState(note !== undefined ? note.title : "");
  const [content, setContent] = useState(note !== undefined ? note.content : "");

  const getRandomColor = () => {
    let c;
    const index = Math.floor(Math.random() * 6);
    colors.forEach((color, i) => {
      if (i === index) {
        c = color;
      }
    });

    return c;
  };

  const saveNote = () => {
    const newNotesData = state.notes;

    state.notes.forEach((n, index) => {
      if (note.id === n.id) {
        const newNoteData = {
          id: n.id,
          title: title,
          content: content,
          date: date,
          color: n.color

        };

        newNotesData.splice(index, 1);
        newNotesData.splice(0, 0, newNoteData);

        dispatch(createAction(actions.ADD_NOTE, newNotesData));
      }
    });

    navigation.goBack();
  };

  const getNextId = () => {
    let biggestId = 0;
    state.notes.forEach(n => {
      if (n.id > biggestId) {
        biggestId = n.id;
      }
    });

    ++biggestId;
    return biggestId;
  };

  const addNote = () => {
    const newNotesData = state.notes;
    const newNoteData = {
      id: getNextId(),
      title: title,
      content: content,
      date: date,
      color: getRandomColor()

    };

    newNotesData.splice(0, 0, newNoteData);

    dispatch(createAction(actions.ADD_NOTE, newNotesData));

    navigation.goBack();
  };

  const deleteNote = () => {
    state.notes.forEach((n, index) => {
      if (n.id === note.id) {
        state.notes.splice(index, 1);
      }
    });

    dispatch(createAction(actions.ADD_NOTE, state.notes));

    navigation.goBack();
  };

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
          <View style={{ flexDirection: "row" }}>
            {
              note !== undefined && <View style={{ marginRight: 10 }}>
                <CircleBtn
                  color={Colors.themeColor().btnColor}
                  onPress={() => deleteNote()}
                >
                  <Feather name="trash-2" size={Typography.FONT_SIZE_TITLE_MD} color={Colors.themeColor().error} />
                </CircleBtn>

              </View>
            }

            <View>
              <CircleBtn
                color={Colors.themeColor().btnColor}
                onPress={() => note !== undefined ? saveNote() : addNote()}
              >
                <Text style={{ fontSize: Typography.FONT_SIZE_NORMAL }}>Save</Text>
              </CircleBtn>
            </View>

          </View>

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

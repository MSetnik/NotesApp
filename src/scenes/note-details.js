import React, { useRef, useState, useContext, useEffect } from "react";
import { View, Text, TextInput, KeyboardAvoidingView, Platform, Pressable, LogBox, AppState } from "react-native";

// UUID
import * as Crypto from "expo-crypto";

// Styles
import { Colors, SharedStyles, Typography } from "../styles";

// Components
import { CircleBtn } from "../components/atoms";
import { Header } from "../components/molecules";

// Expo icons
import { Feather } from "@expo/vector-icons";

// Helpers
import { dateHelper } from "../helpers";

// Store
import { StoreContext } from "../store/reducer";
import { actions, createAction } from "../store/actions";

// Localization
import { localization } from "../localization";

// Async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
import { ASYNC_STORAGE_KEY } from "../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { addUserNote, deleteUserNote, updateUserNote } from "../endpoint/firestore";

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
  const { top, bottom } = useSafeAreaInsets();
  const store = useContext(StoreContext);
  const state = store.state;
  const dispatch = store.dispatch;

  const editText = useRef(null);

  let note;

  if (route.params !== undefined) {
    note = route.params.item;
  }

  const date = new Date();

  const [title, setTitle] = useState(note !== undefined ? note.title : "");
  const [content, setContent] = useState(note !== undefined ? note.content : "");

  // spremanje biljeski kod navigation listenera ne dohvaca izmjenjen state.
  // WORKAROUND:
  const noteTitle = useRef(title);
  const noteContent = useRef(content);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    // navigation.addListener("blur", () => {
    //   if (note !== undefined) {
    //     saveNote(true, noteTitle.current, noteContent.current);
    //   } else if (noteTitle.current !== "" || noteContent.current !== "") {
    //     addNote(true, noteTitle.current, noteContent.current);
    //   }
    // });
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/active/) && (nextAppState === "background" || nextAppState === "inactive")
      ) {
        if (note !== undefined) {
          saveNote(true, noteTitle.current, noteContent.current);
        } else {
          addNote(true, title, content);
        }
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const storeDataAsyncStorage = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getRandomColor = () => {
    let c;
    const index = Math.floor(Math.random() * colors.length);
    colors.forEach((color, i) => {
      if (i === index) {
        c = color;
      }
    });

    return c;
  };

  const saveNote = (navigationOnBlur = false, title, content) => {
    const saveNoteDate = new Date();

    const newNotesData = state.notes;

    state.notes.forEach((n, index) => {
      if (note.id === n.id) {
        const newNoteData = {
          id: n.id,
          title: title,
          content: content,
          date: saveNoteDate.toString(),
          color: n.color

        };

        if (newNoteData.id !== n.id || newNoteData.title !== n.title || newNoteData.content !== n.content) {
          newNotesData.splice(index, 1);
          newNotesData.splice(0, 0, newNoteData);

          dispatch(createAction(actions.ADD_NOTE, newNotesData));
          dispatch(createAction(actions.ADD_LOCAL_NOTES, newNotesData));

          updateUserNote(state.user.uid, note.firestoreId, newNoteData);

          if (state.user.email === "Guest") {
            storeDataAsyncStorage(newNotesData);
          }
        }
      }
    });

    navigation.removeListener("blur");

    if (!navigationOnBlur) {
      navigation.goBack();
    }
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

  const addNote = (navigationOnBlur = false, title, content) => {
    const addNoteDate = new Date();

    const newNotesData = state.notes;
    const newNoteData = {
      id: getNextId(),
      uuid: Crypto.randomUUID(),
      title: title,
      content: content,
      date: addNoteDate,
      color: getRandomColor()

    };

    if (state.user.email !== "Guest") {
      addUserNote(state.user.uid, newNoteData);
    }

    newNotesData.unshift(newNoteData);

    if (state.user.email !== "Guest") {
      dispatch(createAction(actions.ADD_NOTE, newNotesData));
    } else {
      dispatch(createAction(actions.ADD_NOTE, newNotesData));
      dispatch(createAction(actions.ADD_LOCAL_NOTES, newNotesData));
    }

    storeDataAsyncStorage(newNotesData);

    navigation.removeListener("blur");

    if (!navigationOnBlur) {
      navigation.goBack();
    }
  };

  const deleteNote = () => {
    state.notes.forEach((n, index) => {
      if (n.id === note.id) {
        state.notes.splice(index, 1);
      }
    });

    dispatch(createAction(actions.ADD_NOTE, state.notes));

    if (state.user.email !== "Guest") {
      deleteUserNote(state.user.uid, note.firestoreId);
    } else {
      storeDataAsyncStorage(state.notes);
    }

    navigation.goBack();
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.themeColor(state.theme).background,
      paddingTop: top
    }}>
      <Header
        leftElement={
          <CircleBtn
            color={Colors.themeColor(state.theme).btnColor}
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-left" size={Typography.FONT_SIZE_TITLE_MD} color={Colors.themeColor(state.theme).textColor} />
          </CircleBtn>
        }
        rightElement={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {
              note !== undefined && <View style={{ marginRight: Typography.FONT_SIZE_TITLE_MD * 0.5 }}>
                <CircleBtn
                  color={Colors.themeColor(state.theme).btnColor}
                  onPress={() => deleteNote()}
                >
                  <Feather name="trash-2" size={Typography.FONT_SIZE_TITLE_MD} color={Colors.themeColor(state.theme).error} />
                </CircleBtn>

              </View>
            }

            <View>
              <CircleBtn
                disabled={!!(title === "" && content === "")}
                color={Colors.themeColor(state.theme).btnColor}
                onPress={() => note !== undefined ? saveNote(false, title, content) : addNote(false, title, content)}
              >
                <Text style={{ fontSize: Typography.FONT_SIZE_NORMAL, color: Colors.themeColor(state.theme).textColor }}>{localization("save")}</Text>
              </CircleBtn>
            </View>

          </View>

        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ paddingHorizontal: Typography.FONT_SIZE_TITLE_MD, flex: 1 }}>
        <TextInput style={[SharedStyles.typography.titleMedium, {
          flexDirection: "row",
          marginTop: Typography.FONT_SIZE_TITLE_MD * 2,
          fontWeight: "bold",
          color: Colors.themeColor(state.theme).textColor
        }]}
        onChangeText={(e) => {
          noteTitle.current = e;
          setTitle(e);
        }}
        placeholderTextColor={Colors.themeColor(state.theme).btnColor}
        placeholder={localization("titlePlaceholder")}
        value={title}
        />

        <Text style={[SharedStyles.typography.bodySmall, {
          marginTop: Typography.FONT_SIZE_TITLE_MD,
          color: Colors.themeColor(state.theme).dateColor
        }]}>
          {note !== undefined ? dateHelper.formatDate(note.date) : dateHelper.formatDate(date)}
        </Text>

        <View style={{ flex: 1, marginTop: Typography.FONT_SIZE_TITLE_MD * 0.5 }} >
          <Pressable style={{ flex: 1 }} onPress={() => {
            editText.current.focus();
          }}>
            <TextInput
              ref={editText}
              multiline={true}
              style={[SharedStyles.typography.bodyMedum, { color: Colors.themeColor(state.theme).textColor }]}
              onChangeText={(e) => {
                noteContent.current = e;
                setContent(e);
              }}
              placeholder={localization("contentPlaceholder")}
              value={content}
              placeholderTextColor={ Colors.themeColor(state.theme).btnColor}
            />
          </Pressable>

        </View>

      </KeyboardAvoidingView>

    </View>
  );
};

export default NoteDetails;

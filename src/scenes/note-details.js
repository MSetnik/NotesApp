import React, { useRef, useState, useContext, useEffect } from "react";
import { View, Text, TextInput, KeyboardAvoidingView, Platform, Pressable, LogBox } from "react-native";

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

// Firebase
import Firebase from "../firebase-config";

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

  // spremanje biljeski kod navigation listenera ne dohvaca izmjenjen state.
  // WORKAROUND:
  const noteTitle = useRef(title);
  const noteContent = useRef(content);

  const db = Firebase.firestore();
  const auth = Firebase.auth();

  // const notes = db.collection("notes")
  //   .doc("3CkweN2h4OxllofI9zGp")
  //   .get();
  //   .set({
  //     email: currentUser.email,
  //     lastName: lastName,
  //     firstName: firstName,
  //   });
  // const fireNotes = Firebase.firestore().collection("notes");

  console.log(note);
  useEffect(() => {
    navigation.addListener("blur", () => {
      if (note !== undefined) {
        saveNote(true, noteTitle.current, noteContent.current);
      } else if (noteTitle.current !== "" || noteContent.current !== "") {
        addNote(true, noteTitle.current, noteContent.current);
      }
    });
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
    const newNotesData = state.notes;
    console.log(state.user);
    alert("cas");
    state.notes.forEach((n, index) => {
      if (note.id === n.id) {
        const newNoteData = {
          id: n.id,
          title: title,
          content: content,
          date: date,
          color: n.color

        };

        if (newNoteData.id !== n.id || newNoteData.title !== n.title || newNoteData.content !== n.content) {
          newNotesData.splice(index, 1);
          newNotesData.splice(0, 0, newNoteData);

          dispatch(createAction(actions.ADD_NOTE, newNotesData));

          storeDataAsyncStorage(newNotesData);
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

  const addNote = async (navigationOnBlur = false, title, content) => {
    if (state.user === "guest") {
      const newNotesData = state.notes;
      const newNoteData = {
        id: getNextId(),
        title: title,
        content: content,
        date: date,
        color: getRandomColor()
      };

      newNotesData.unshift(newNoteData);

      dispatch(createAction(actions.ADD_NOTE, newNotesData));

      storeDataAsyncStorage(newNotesData);
    } else {
      await db.collection("users")
        .doc(auth.currentUser.uid)
      // .doc(state.userId)
        .collection("notes")
        .add({
          title: title,
          content: content,
          date: date,
          color: getRandomColor(),
          userId: state.userId
        });
      navigation.removeListener("blur");
    }

    // .add({});

    // const res = await db.collection("cities").doc("LA").set(data);
    // .set({

    // });
    // .set({
    //   title: title,
    //   content: content
    // });
    // console.log(state.user);
    // alert("da");
    // console.log(getFirestore);

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

    storeDataAsyncStorage(state.notes);

    navigation.goBack();
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.themeColor(state.theme).background,
      paddingTop: Typography.FONT_SIZE_TITLE_LG * 2
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
          marginTop: Typography.FONT_SIZE_TITLE_MD * 0.5,
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

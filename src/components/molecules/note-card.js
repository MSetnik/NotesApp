import React, { forwardRef, useContext, useEffect } from "react";
import { Text, StyleSheet, Pressable, Platform } from "react-native";
import { Colors, SharedStyles } from "../../styles";

import Animated, { useSharedValue, withTiming, Easing, ReduceMotion, useAnimatedStyle, FadeOutDown, FadeInDown } from "react-native-reanimated";

// Helpers
import { dateHelper } from "../../helpers";

// Icons
import { Feather } from "@expo/vector-icons";
import { CircleBtn } from "../atoms";
import { StoreContext } from "../../store/reducer";
import { storeLocalNotes } from "../../helpers/async-storage-helper";
import { actions, createAction } from "../../store/actions";

const NoteCard = ({
  type = 1,
  item,
  index,
  navigation,
  setSearchQuery,
  setLongPressActive,
  longPressActive,
  deleteNote
}) => {
  const store = useContext(StoreContext);
  const state = store.state;
  const dispatch = store.dispatch;
  const notes = store.state.notes;

  const opacity = useSharedValue(0);
  const position = useSharedValue(-50);

  const enterAnimation = () => {
    opacity.value = withTiming(1, {
      duration: (index + 1) * 300,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System
    });
    position.value = withTiming(0, {
      duration: (index + 1) * 300,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System
    });
  };

  const exitAnimation = () => {
    console.log("da");
    opacity.value = withTiming(0, {
      duration: 600,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System
    });
    position.value = withTiming(-50, {
      duration: 600,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System
    });
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // transform: [{ translateY: position.value }],
      // bottom: position.value,
      opacity: opacity.value
    };
  });

  const deleteSelectedNote = (noteId) => {
    if (state.user.email !== "Guest") {
      console.log(item);
      deleteNote(state.user.uid, noteId);
    } else {
      state.notes.forEach((n, index) => {
        console.log(item, "DA");
        console.log(n, "DAERERR");

        if (n.uuid === item[0].uuid || n.uuid === item[1].uuid) {
          state.notes.splice(index, 1);
        }
      });

      dispatch(createAction(actions.ADD_NOTE, state.notes));
      storeLocalNotes(state.notes);
    }
  };

  if (type === 1) {
    return (
      <Animated.View exiting={FadeOutDown} entering={FadeInDown}
        style={[{
          flexDirection: "row",
          justifyContent: item[1] !== undefined ? "space-evenly" : "flex-start",
          flex: 1,
          marginBottom: 10,
          marginLeft: item[1] !== undefined ? 0 : 10
        }]}>
        <Pressable
          onLongPress={() => {
            setLongPressActive(true);
          }}

          style={[styles.cardShort, { backgroundColor: item[0].color }]}
          onPress={() => {
            navigation.navigate("NoteDetails", { item: item[0] });
            setSearchQuery("");
            setLongPressActive(false);
          }}
        >
          {
            longPressActive &&
            <CircleBtn onPress={() => { deleteSelectedNote(state.user.email === "Guest" ? item[0].uuid : item[0].firestoreId); }} style={{ backgroundColor: Colors.themeColor(state.theme).errorLight, flex: 0, position: "absolute", zIndex: 99, right: 5, top: 5 }}>
              <Feather name="minus" color={Colors.themeColor(state.theme).error}/>
            </CircleBtn>
          }

          <Text style={[SharedStyles.typography.titleNormal, styles.noteTitle, { fontWeight: item[0].title !== "" ? "bold" : "normal" }]} numberOfLines={3}>{item[0].title !== "" ? item[0].title : item[0].content}</Text>

          <Text style={{ justifyContent: "flex-end" }}>{dateHelper.formatDate(item[0].date)}</Text>
        </Pressable>

        {
          item[1] !== undefined &&
          <Pressable
            onLongPress={() => {
              setLongPressActive(true);
            }}
            style={[styles.cardShort, { backgroundColor: item[1].color }]}
            onPress={() => {
              navigation.navigate("NoteDetails", { item: item[1] });
              setSearchQuery("");
              setLongPressActive(false);
            }}
          >
            {
              longPressActive &&
              <CircleBtn onPress={() => { deleteSelectedNote(state.user.email === "Guest" ? item[1].uuid : item[1].firestoreId); }}style={{ backgroundColor: Colors.themeColor(state.theme).errorLight, flex: 0, position: "absolute", zIndex: 99, right: 5, top: 5 }}>
                <Feather name="minus" color={Colors.themeColor(state.theme).error}/>
              </CircleBtn>
            }

            <Text style={[SharedStyles.typography.titleNormal, styles.noteTitle, { fontWeight: item[1].title !== "" ? "bold" : "normal" }]} numberOfLines={3}>{item[1].title !== "" ? item[1].title : item[1].content}</Text>

            <Text style={{ justifyContent: "flex-end" }}>{dateHelper.formatDate(item[1].date)}</Text>
          </Pressable>
        }

      </Animated.View>

    );
  } else {
    return (
      <Animated.View exiting={FadeOutDown} entering={FadeInDown} style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10 }}>
        <Pressable
          onLongPress={() => {
            setLongPressActive(true);
          }}
          style={[styles.cardLong, { backgroundColor: item.color }]}
          onPress={() => {
            navigation.navigate("NoteDetails", { item: item });
            setSearchQuery("");
            setLongPressActive(false);
          }}
        >
          {
            longPressActive &&
            <CircleBtn onPress={() => { deleteSelectedNote(state.user.email === "Guest" ? item.uuid : item.firestoreId); }}style={{ backgroundColor: Colors.themeColor(state.theme).errorLight, flex: 0, position: "absolute", zIndex: 99, right: 5, top: 5 }}>
              <Feather name="minus" color={Colors.themeColor(state.theme).error}/>
            </CircleBtn>
          }
          <Text style={[SharedStyles.typography.titleNormal, styles.noteTitle, { fontWeight: item.title !== "" ? "bold" : "normal" }]} numberOfLines={3}>{item.title !== "" ? item.title : item.content}</Text>

          <Text style={{ justifyContent: "flex-end" }}>{dateHelper.formatDate(item.date)}</Text>
        </Pressable>
      </Animated.View>

    );
  }
};

const styles = StyleSheet.create({
  cardShort: {
    width: "46%",
    maxWidth: 200,
    maxHeight: 200,
    aspectRatio: 1 / 1,
    backgroundColor: "red",
    borderRadius: 20,
    padding: 14
  },
  noteTitle: {
    flex: 1
  },
  cardLong: {
    width: "95%",
    maxHeight: 200,
    aspectRatio: 15 / 7,
    borderRadius: 20,
    padding: 14
  }
});

export default NoteCard;

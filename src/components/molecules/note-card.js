import React, { useEffect } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { SharedStyles } from "../../styles";

import Animated, { useSharedValue, withTiming, Easing, ReduceMotion } from "react-native-reanimated";

// Helpers
import { dateHelper } from "../../helpers";

const NoteCard = ({
  type = 1,
  item,
  index,
  navigation
}) => {
  const opacity = useSharedValue(0);
  const position = useSharedValue(-50);

  const enterAnimation = () => {
    opacity.value = withTiming(1, {
      duration: (index + 1) * 600,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System
    });
    position.value = withTiming(0, {
      duration: (index + 1) * 600,
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

  useEffect(() => {
    enterAnimation();
  }, []);

  if (type === 1) {
    return (
      <Animated.View style={{ flexDirection: "row", justifyContent: item[1] !== undefined ? "space-evenly" : "flex-start", marginBottom: 10, marginLeft: item[1] !== undefined ? 0 : 10, opacity, bottom: position }}>
        <Pressable
          style={[styles.cardShort, { backgroundColor: item[0].color }]}
          onPress={() => navigation.navigate("NoteDetails", { item: item[0] })}
        >
          <Text style={[SharedStyles.typography.titleNormal, styles.noteTitle, { fontWeight: item[0].title !== "" ? "bold" : "normal" }]} numberOfLines={3}>{item[0].title !== "" ? item[0].title : item[0].content}</Text>

          <Text style={{ justifyContent: "flex-end" }}>{dateHelper.formatDate(item[0].date)}</Text>
        </Pressable>

        {
          item[1] !== undefined &&
          <Pressable
            style={[styles.cardShort, { backgroundColor: item[1].color }]}
            onPress={() => navigation.navigate("NoteDetails", { item: item[1] })}
          >
            <Text style={[SharedStyles.typography.titleNormal, styles.noteTitle, { fontWeight: item[1].title !== "" ? "bold" : "normal" }]} numberOfLines={3}>{item[1].title !== "" ? item[1].title : item[1].content}</Text>

            <Text style={{ justifyContent: "flex-end" }}>{dateHelper.formatDate(item[1].date)}</Text>
          </Pressable>
        }

      </Animated.View>

    );
  } else {
    return (
      <Animated.View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10, opacity, bottom: position }}>
        <Pressable
          style={[styles.cardLong, { backgroundColor: item.color }]}
          onPress={() => navigation.navigate("NoteDetails", { item: item })}
        >
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
    aspectRatio: 15 / 7,
    borderRadius: 20,
    padding: 14
  }
});

export default NoteCard;

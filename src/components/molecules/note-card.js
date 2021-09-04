import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Typography } from "../../styles";

const NoteCard = ({
  type = 1,
  title,
  content,
  date,
  color,
  position,
  navigation
}) => {
  if (type === 1) {
    return (
      <Pressable
        style={[styles.cardShort]}
        onPress={() => navigation.navigate("NoteDetails")}
      >
        <Text style={styles.noteTitle} numberOfLines={3}>How to make your personal ..</Text>

        <Text style={{ justifyContent: "flex-end" }}>May 21, 2020</Text>
      </Pressable>
    );
  } else {
    return (
      <Pressable
        style={[styles.cardLong]}
        onPress={() => navigation.navigate("NoteDetails")}
      >
        <Text style={styles.noteTitle} numberOfLines={3}>How to make your personal ..</Text>

        <Text style={{ justifyContent: "flex-end" }}>May 21, 2020</Text>
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  cardShort: {
    width: "45%",
    aspectRatio: 1 / 1,
    backgroundColor: "red",
    borderRadius: 20,
    padding: 14
  },
  noteTitle: {
    flex: 1,
    fontSize: Typography.FONT_SIZE_TITLE_MD
  },
  cardLong: {
    width: "95%",
    aspectRatio: 15 / 7,
    backgroundColor: "red",
    borderRadius: 20,
    padding: 14
  }
});

export default NoteCard;

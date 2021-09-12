import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Typography } from "../../styles";

// Helpers
import { dateHelper } from "../../helpers";

const NoteCard = ({
  type = 1,
  item,
  navigation
}) => {
  if (type === 1) {
    return (
      <View style={{ flexDirection: "row", justifyContent: item[1] !== undefined ? "space-evenly" : "flex-start", marginBottom: 10, marginLeft: item[1] !== undefined ? 0 : 10 }}>
        <Pressable
          style={[styles.cardShort, { backgroundColor: item[0].color }]}
          onPress={() => navigation.navigate("NoteDetails", { item: item[0] })}
        >
          <Text style={styles.noteTitle} numberOfLines={3}>{item[0].title !== "" ? item[0].title : item[0].content}</Text>

          <Text style={{ justifyContent: "flex-end" }}>{dateHelper.formatDate(item[0].date)}</Text>
        </Pressable>

        {
          item[1] !== undefined &&
          <Pressable
            style={[styles.cardShort, { backgroundColor: item[1].color }]}
            onPress={() => navigation.navigate("NoteDetails", { item: item[1] })}
          >
            <Text style={styles.noteTitle} numberOfLines={3}>{item[1].title !== "" ? item[1].title : item[1].content}</Text>

            <Text style={{ justifyContent: "flex-end" }}>{dateHelper.formatDate(item[1].date)}</Text>
          </Pressable>
        }

      </View>

    );
  } else {
    return (
      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10 }}>
        <Pressable
          style={[styles.cardLong, { backgroundColor: item.color }]}
          onPress={() => navigation.navigate("NoteDetails", { item: item })}
        >
          <Text style={styles.noteTitle} numberOfLines={3}>{item.title !== "" ? item.title : item.content}</Text>

          <Text style={{ justifyContent: "flex-end" }}>{dateHelper.formatDate(item.date)}</Text>
        </Pressable>
      </View>

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
    flex: 1,
    fontSize: Typography.FONT_SIZE_TITLE_MD
  },
  cardLong: {
    width: "95%",
    aspectRatio: 15 / 7,
    borderRadius: 20,
    padding: 14
  }
});

export default NoteCard;

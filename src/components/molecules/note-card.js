import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Typography, Colors } from "../../styles";

// Helpers
import { dateHelper } from "../../helpers";

// Styles

const colors = [
  Colors.themeColor().card1,
  Colors.themeColor().card2,
  Colors.themeColor().card3,
  Colors.themeColor().card4,
  Colors.themeColor().card5,
  Colors.themeColor().card6
];

const NoteCard = ({
  type = 1,
  item,
  navigation
}) => {
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

  if (type === 1) {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 10 }}>
        <Pressable
          style={[styles.cardShort, { backgroundColor: getRandomColor() }]}
          onPress={() => navigation.navigate("NoteDetails", { item: item[0] })}
        >
          <Text style={styles.noteTitle} numberOfLines={3}>{item[0].title !== "" ? item[0].title : item[0].content}</Text>

          <Text style={{ justifyContent: "flex-end" }}>{dateHelper.formatDate(item[0].date)}</Text>
        </Pressable>

        <Pressable
          style={[styles.cardShort, { backgroundColor: getRandomColor() }]}
          onPress={() => navigation.navigate("NoteDetails", { item: item[1] })}
        >
          <Text style={styles.noteTitle} numberOfLines={3}>{item[1].title !== "" ? item[1].title : item[1].content}</Text>

          <Text style={{ justifyContent: "flex-end" }}>{dateHelper.formatDate(item[1].date)}</Text>
        </Pressable>
      </View>

    );
  } else {
    return (
      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10 }}>
        <Pressable
          style={[styles.cardLong, { backgroundColor: getRandomColor() }]}
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
    borderRadius: 20,
    padding: 14
  }
});

export default NoteCard;

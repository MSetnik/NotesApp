import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import CircleBtn from "../components/atoms/circle-btn";
import Header from "../components/molecules/header";

// Component
import NoteCard from "../components/molecules/note-card";

// Expo icons
import { Feather } from "@expo/vector-icons";
import { Colors, SharedStyles, Typography } from "../styles";

// data
import { data } from "../assets/dummy-data";

const Home = ({ navigation }) => {
  // Formatiranje JSON podataka za ispis
  const data1 = () => {
    const d = [];

    let array = [];
    let index1 = 1;
    data.forEach((el, index) => {
      if (index1 % 3 === 0) {
        index1 = 0;
        d.push(array);
        d.push(el);
        array = [];
      } else {
        array.push(el);
      }

      if (index + 1 === data.length && index1 % 3 !== 0) {
        d.push(array);
      }

      index1++;
    });

    return d;
  };

  const renderItem = ({ item, index }) => {
    if (item[0] !== undefined) {
      return <NoteCard item={item} type={1} index={index} navigation={navigation}/>;
    }
    return <NoteCard item={item} type={2} index={index} navigation={navigation}/>;
  };

  const keyExtractor = (item) => {
    if (item[0] !== undefined) {
      return item[0].id;
    }

    return item.id;
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.themeColor().background, paddingTop: Typography.FONT_SIZE_TITLE_LG * 2 }}>
      <Header
        leftElement={
          <Text style={{ fontSize: Typography.FONT_SIZE_NORMAL * 2 }}>Notes</Text>
        }
        rightElement={
          <CircleBtn color={Colors.themeColor().btnColor}>
            <Feather name="search" size={24} color="black" />
          </CircleBtn>
        }
      />

      <FlatList
        style={{ flex: 1 }}
        data={ data1() }
        renderItem={renderItem}
        keyExtractor={(item) => keyExtractor(item)}
      />

      <View style={[{ position: "absolute", bottom: 40, right: 40 }, SharedStyles.shadow.elevation5]}>
        <CircleBtn
          borderRadius={50}
          color={Colors.themeColor().background}
          onPress={() => navigation.navigate("NoteDetails", {
            title: "sadawda"
          })}
        >
          <Feather name="plus" size={24} color="black" />
        </CircleBtn>
      </View>
    </View>
  );
};

export default Home;

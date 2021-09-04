import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
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
  const renderItem = ({ item, index }) => {
    // if (index % 3 === 0) {
    //   return (
    //     <NoteCard type={2} navigation={navigation}/>
    //   );
    // } else {
    //   <NoteCard type={1} navigation={navigation}/>;
    // }
    if (index % 3 === 0) {
      return (
        <NoteCard type={1} navigation={navigation}/>

      );
    }
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

      <FlatList style={{ flex: 1 }} data={data} renderItem={renderItem} keyExtractor={item => item.id} />

      <View style={[{ position: "absolute", bottom: 40, right: 40 }, SharedStyles.shadow.elevation5]}>
        <CircleBtn
          borderRadius={50}
          color={Colors.themeColor().background}
          onPress={() => navigation.navigate("NoteDetails", {
            title: " sadawda"
          })}
        >
          <Feather name="plus" size={24} color="black" />
        </CircleBtn>
      </View>
    </View>
  );
};

export default Home;

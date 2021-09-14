import React, { useContext, useEffect, useRef } from "react";
import { View, Text, FlatList } from "react-native";

// Component
import { NoteCard, Header } from "../components/molecules";
import { CircleBtn, NoDataMessage } from "../components/atoms";

// Expo icons
import { Feather } from "@expo/vector-icons";
import { Colors, SharedStyles, Typography } from "../styles";

// Store
import { StoreContext } from "../store/reducer";

// Localization
import { localization } from "../localization";

const SETTINGS = false;

const Home = ({ navigation }) => {
  const store = useContext(StoreContext);

  const notes = store.state.notes;

  // Formatiranje JSON podataka za ispis
  const data1 = () => {
    const d = [];

    let array = [];
    let index1 = 1;
    notes.forEach((el, index) => {
      if (index1 % 3 === 0) {
        index1 = 0;
        d.push(array);
        d.push(el);
        array = [];
      } else {
        array.push(el);
      }

      if (index + 1 === notes.length && index1 % 3 !== 0) {
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
    let key;
    if (item[0] !== undefined) {
      key = item[0].id.toString();
      return key;
    }

    key = item.id.toString();
    return key;
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.themeColor().background, paddingTop: Typography.FONT_SIZE_TITLE_LG * 2 }}>
      <Header
        leftElement={
          <Text style={{ fontSize: Typography.FONT_SIZE_NORMAL * 2 }}>{localization("notes")}</Text>
        }

        rightElement={SETTINGS && <CircleBtn
          color={Colors.themeColor().btnColor}
          onPress={() => navigation.navigate("Settings")}>
          <Feather name="settings" size={Typography.FONT_SIZE_TITLE_MD} color="black" />
        </CircleBtn> }
      />

      {
        notes.length !== 0 ? <FlatList
          style={{ flex: 1 }}
          data={data1()}
          renderItem={renderItem}
          keyExtractor={(item) => keyExtractor(item)}
        /> : <NoDataMessage
          icon={<Feather name="alert-octagon" size={Typography.FONT_SIZE_TITLE_MD} color={Colors.themeColor().textColor} />}
          text={localization("noDataText")}
          style={{ marginTop: Typography.FONT_SIZE_TITLE_MD }}
          textStyle={{ marginLeft: Typography.FONT_SIZE_TITLE_MD * 0.5 }}/>
      }

      <View style={[{ position: "absolute", bottom: Typography.FONT_SIZE_TITLE_MD * 2, right: Typography.FONT_SIZE_TITLE_MD * 2 }, SharedStyles.shadow.elevation5]}>
        <CircleBtn
          color={Colors.themeColor().background}
          onPress={() => navigation.navigate("NoteDetails")}
          style={SharedStyles.shadow.elevation5}
        >
          <Feather name="plus" size={Typography.FONT_SIZE_TITLE_LG} color={Colors.themeColor().textColor} />
        </CircleBtn>
      </View>
    </View>
  );
};

export default Home;

import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Pressable } from "react-native";

// Status Bar
import { StatusBar } from "expo-status-bar";

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

// Firebase
import Firebase from "../firebase-config";
import { data } from "../assets/dummy-data";

const SETTINGS = true;

const Home = ({ navigation }) => {
  const store = useContext(StoreContext);
  const state = store.state;
  const notes = store.state.notes;
  const [notesData, setNotesData] = useState("");

  const db = Firebase.firestore();
  const auth = Firebase.auth();

  useEffect(() => {
    const getFirebaseData = async () => {
      const firebaseData = [];
      const d = [];
      await Firebase.firestore().collection("users").doc(auth.currentUser.uid).collection("notes").get().then((querySnapshot) => {
        querySnapshot.forEach(snapshot => {
          const data = snapshot.data();
          firebaseData.push(data);
          setNotesData(firebaseData);
          console.log("gotobo");
        });
        // return firebaseData;
      });

      //   let array = [];
      //   let index1 = 1;
      //   data.forEach((el, index) => {
      //     if (index1 % 3 === 0) {
      //       index1 = 0;
      //       d.push(array);
      //       d.push(el);
      //       array = [];
      //     } else {
      //       array.push(el);
      //     }

      //     if (index + 1 === data.length && index1 % 3 !== 0) {
      //       d.push(array);
      //     }

      //     index1++;
      //   });

      //   return d;
    };
    getFirebaseData();

    // if (state.user === "guest") {
    //   setNotesData(data1());
    // } else {
    //   setNotesData(getFirebaseData());
    // }
  });

  console.log(notesData);

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
    console.log(item);
    if (item[0] !== undefined) {
      return <NoteCard item={item} type={1} index={index} navigation={navigation}/>;
    }
    return <NoteCard item={item} type={2} index={index} navigation={navigation}/>;
  };

  const renderItem2 = (data) => {
    console.log(data);
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

  if (store.state.isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: Colors.themeColor(state.theme).background }}>
        <ActivityIndicator size="large" color={Colors.themeColor(state.theme).secondary} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.themeColor(state.theme).background, paddingTop: Typography.FONT_SIZE_TITLE_LG * 2 }}>

      <StatusBar style={state.theme === "light" ? "dark" : "light"}/>
      <Header
        leftElement={
          <Text style={{ fontSize: Typography.FONT_SIZE_NORMAL * 2, color: Colors.themeColor(state.theme).textColor }}>{localization("notes")}</Text>
        }

        rightElement={SETTINGS && <CircleBtn
          color={Colors.themeColor(state.theme).btnColor}
          onPress={() => navigation.navigate("Settings")}>
          <Feather name="settings" size={Typography.FONT_SIZE_TITLE_MD} color={Colors.themeColor(state.theme).textColor} />
        </CircleBtn> }
      />

      {/* {
        notes.length !== 0 ? <FlatList
          style={{ flex: 1 }}
          data={notesData}
          renderItem={renderItem}
          keyExtractor={(item) => keyExtractor(item)}
        /> : <Pressable onPress={() => navigation.navigate("NoteDetails")}>
          <NoDataMessage
            icon={<Feather name="alert-octagon" size={Typography.FONT_SIZE_TITLE_MD} color={Colors.themeColor(state.theme).textColor} />}
            text={localization("noDataText")}
            style={{ marginTop: Typography.FONT_SIZE_TITLE_MD }}
            textStyle={{ marginLeft: Typography.FONT_SIZE_TITLE_MD * 0.5 }}/>
        </Pressable>

      } */}

      <FlatList
        style={{ flex: 1 }}
        data={notesData}
        renderItem={renderItem}
        keyExtractor={(item) => keyExtractor(item)}
      />

      <View style={[{ position: "absolute", bottom: Typography.FONT_SIZE_TITLE_MD * 2, right: Typography.FONT_SIZE_TITLE_MD * 2 }, SharedStyles.shadow.elevation5]}>
        <CircleBtn
          color={Colors.themeColor(state.theme).secondary}
          onPress={() => navigation.navigate("NoteDetails")}
          style={[SharedStyles.shadow.elevation5, { padding: Typography.FONT_SIZE_TITLE_LG / 1.15 }]}
        >
          <Feather name="plus" size={Typography.FONT_SIZE_TITLE_LG} color={Colors.themeColor("dark").textColor} />
        </CircleBtn>
      </View>
    </View>
  );
};

export default Home;

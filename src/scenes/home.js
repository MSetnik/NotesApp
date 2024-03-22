import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Pressable, TextInput, Platform } from "react-native";

// Reanimated
import Animated, { useSharedValue, withTiming, Easing, ReduceMotion, useAnimatedStyle } from "react-native-reanimated";

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
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useFocusEffect } from "@react-navigation/native";
import { FONT_SIZE_TITLE_MD } from "../styles/typography";
import { deleteUserNote } from "../endpoint/firestore";

const SETTINGS = true;

const Home = ({ navigation }) => {
  const { top, bottom } = useSafeAreaInsets();
  const store = useContext(StoreContext);
  const state = store.state;
  const notes = store.state.notes;

  const textInputRef = useRef(null);
  const flatListRef = useRef(null);
  const noteCardRef = useRef(null);

  const marginTop = useSharedValue(-60);

  const [textInputVisible, setTextInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(notes);
  const [longPressActive, setLongPressActive] = useState(false);

  useEffect(() => {
    setSearchResult(notes);
  }, [notes]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // alert("Screen was unfocused");
        setTextInputVisible(false);
        marginTop.value = withTiming(-60, {
          duration: 200,
          easing: Easing.inOut(Easing.quad),
          reduceMotion: ReduceMotion.System
        });

        textInputRef.current.blur();

        // Useful for cleanup functions
      };
    }, [])
  );

  // Formatiranje JSON podataka za ispis
  const data1 = () => {
    const d = [];

    let array = [];
    let index1 = 1;

    searchResult.forEach((el, index) => {
      if (index1 % 3 === 0) {
        index1 = 0;
        d.push(array);
        d.push(el);
        array = [];
      } else {
        array.push(el);
      }

      if (index + 1 === searchResult.length && index1 % 3 !== 0) {
        d.push(array);
      }

      index1++;
    });

    return d;
  };

  const renderItem = ({ item, index }) => {
    if (item[0] !== undefined) {
      return <NoteCard deleteNote={deleteUserNote} longPressActive={longPressActive} setLongPressActive={setLongPressActive} item={item} type={1} index={index} navigation={navigation} setSearchQuery={searchItem}/>;
    }
    return <NoteCard deleteNote={deleteUserNote} longPressActive={longPressActive} setLongPressActive={setLongPressActive} item={item} type={2} index={index} navigation={navigation} setSearchQuery={searchItem}/>;
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

  const searchItem = (searchQuery) => {
    setSearchQuery(searchQuery);
    if (searchQuery !== "") {
      const result = notes.filter(item =>
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResult(result);
    } else {
      setSearchResult(notes);
    }
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: marginTop.value }]
    };
  });

  if (store.state.isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: Colors.themeColor(state.theme).background }}>
        <ActivityIndicator size="large" color={Colors.themeColor(state.theme).secondary} />
      </View>
    );
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.themeColor(state.theme).background
    }}>
      <StatusBar style={state.theme === "light" ? "dark" : "light"}/>
      <View style={{
        backgroundColor: Colors.themeColor(state.theme).background,
        paddingTop: top,
        marginBottom: Typography.FONT_SIZE_TITLE_MD,
        zIndex: 99
      }}>
        <Header
          leftElement={
            <Text style={{ fontSize: Typography.FONT_SIZE_NORMAL * 2, color: Colors.themeColor(state.theme).textColor }}>{localization("notes")}</Text>
          }
          rightElement={SETTINGS && longPressActive ? <CircleBtn
            onPress={() => { setLongPressActive(false); }}
            color={Colors.themeColor(state.theme).btnColor}
          >
            <Text style={[SharedStyles.typography.bodySmall, { color: Colors.themeColor(state.theme).textColor }]}>{localization("done")}</Text>
          </CircleBtn> : <View style={{ flexDirection: "row" }}>
            <CircleBtn
              disabled={notes.length === 0}
              color={Colors.themeColor(state.theme).btnColor}
              onPress={() => {
                searchItem("");

                if (textInputVisible) {
                  setTextInputVisible(false);
                  marginTop.value = withTiming(-60, {
                    duration: 200,
                    easing: Easing.inOut(Easing.quad),
                    reduceMotion: ReduceMotion.System
                  });

                  textInputRef.current.blur();
                } else {
                  setTextInputVisible(true);
                  marginTop.value = withTiming(0, {
                    duration: 200,
                    easing: Easing.inOut(Easing.quad),
                    reduceMotion: ReduceMotion.System
                  });

                  textInputRef.current.focus();
                }
              }}>
              <Feather name={!textInputVisible ? "search" : "x" } size={Typography.FONT_SIZE_TITLE_MD} color={Colors.themeColor(state.theme).textColor} />
            </CircleBtn>

            <CircleBtn
              style={{ marginLeft: Typography.FONT_SIZE_NORMAL }}
              color={Colors.themeColor(state.theme).btnColor}
              onPress={() => navigation.navigate("Settings")}>
              <Feather name="settings" size={Typography.FONT_SIZE_TITLE_MD} color={Colors.themeColor(state.theme).textColor} />
            </CircleBtn></View>}
        />

      </View>

      <Animated.View style={[{
        flexDirection: "row"
        // marginTop: marginTop
      }, animatedStyles]}>
        <TextInput
          ref={textInputRef}
          placeholder="Search"
          onChangeText={text => searchItem(text)}
          value={searchQuery}
          style={{
            color: Colors.themeColor(state.theme).dateColor,
            borderColor: Colors.themeColor(state.theme).btnColor,
            marginHorizontal: "2%",
            height: 40,
            borderWidth: 1,
            paddingHorizontal: 12,
            borderRadius: 20,
            flex: 1
          }}
        />

        {
          searchQuery !== "" &&
            <CircleBtn
              style={{
                position: "absolute",
                right: 18,
                backgroundColor: "transparent",
                top: -2
              }}
              color={Colors.themeColor(state.theme).btnColor}
              onPress={() => {
                searchItem("");
              }}>
              <Feather name={"x"} size={Typography.FONT_SIZE_TITLE_MD} color={Colors.themeColor(state.theme).error} />
            </CircleBtn>
        }

      </Animated.View>

      {
        notes.length === 0 ? <Pressable onPress={() => navigation.navigate("NoteDetails")} style={{ marginTop: -50 }}>
          <NoDataMessage
            icon={<Feather name="alert-octagon" size={Typography.FONT_SIZE_TITLE_MD} color={Colors.themeColor(state.theme).textColor} />}
            text={localization("noDataText")}
            style={{ marginTop: Typography.FONT_SIZE_TITLE_MD }}
            textStyle={{ marginLeft: Typography.FONT_SIZE_TITLE_MD * 0.5 }}/>
        </Pressable> : searchResult.length !== 0 ? <Animated.FlatList
          ref={flatListRef}
          style={[{ flex: 1, marginTop: Typography.FONT_SIZE_TITLE_MD, marginBottom: -bottom }, animatedStyles]}
          data={data1()}
          contentContainerStyle={{ paddingBottom: bottom * 1.5 }}
          renderItem={renderItem}
          keyExtractor={(item) => keyExtractor(item)}
        /> : <View>
          <NoDataMessage
            icon={<Feather name="alert-octagon" size={Typography.FONT_SIZE_TITLE_MD} color={Colors.themeColor(state.theme).textColor} />}
            text={localization("searchEmpty")}
            style={{ marginTop: Typography.FONT_SIZE_TITLE_MD }}
            textStyle={{ marginLeft: Typography.FONT_SIZE_TITLE_MD * 0.5 }}/>
        </View>
      }

      <View style={[{ position: "absolute", bottom: bottom + Typography.FONT_SIZE_TITLE_MD * 2, right: Typography.FONT_SIZE_TITLE_MD * 2 }, SharedStyles.shadow.elevation5]}>
        <CircleBtn
          color={Colors.themeColor(state.theme).secondary}
          onPress={() => {
            navigation.navigate("NoteDetails");
            searchItem("");
            setLongPressActive(false);
          }}
          style={[SharedStyles.shadow.elevation5, { padding: Typography.FONT_SIZE_TITLE_LG / 1.15 }]}
        >
          <Feather name="plus" size={Typography.FONT_SIZE_TITLE_LG} color={Colors.themeColor("dark").textColor} />
        </CircleBtn>
      </View>
    </View>
  );
};

export default Home;

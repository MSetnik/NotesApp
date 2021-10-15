import React, { useState, useContext } from "react";
import { Pressable, Text, TextInput, View, KeyboardAvoidingView } from "react-native";

// Constants
import Constants from "expo-constants";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Sharedstyles
import { SharedStyles, Colors } from "../styles";

// Components
import { CircleBtn } from "../components/atoms";

// Linear gradient
import { LinearGradient } from "expo-linear-gradient";

// Store
import { StoreContext } from "../store/reducer";
import { actions, createAction } from "../store/actions";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const store = useContext(StoreContext);
  const state = store.state;

  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight + 20, alignItems: "center", backgroundColor: Colors.themeColor(state.theme).background }}>
      <Text style={{ fontSize: 40, marginTop: 40, color: Colors.themeColor(state.theme).primary, fontWeight: "600" }}>
          Log in
      </Text>

      <KeyboardAvoidingView
        behavior={"position"}
        style={{ justifyContent: "center", marginTop: 100, width: "80%" }}>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            <Text style={{ fontSize: 20, marginRight: 5, color: Colors.themeColor(state.theme).secondary }}>
              E-Mail
            </Text>

            <AntDesign name="exclamationcircleo" size={20} color={Colors.themeColor(state.theme).warning} />
          </View>

          <TextInput
            onChange={setEmail}
            placeholder='pero.peric@mail.com'
            placeholderTextColor={Colors.themeColor(state.theme).placeholderColor}
            style={[SharedStyles.typography.button, {
              borderBottomWidth: 1,
              borderColor: Colors.themeColor(state.theme).warning,
              color: Colors.themeColor(state.theme).textColor,
              fontWeight: "normal"

            }]} />
        </View>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            <Text style={{ fontSize: 20, marginRight: 5, color: Colors.themeColor(state.theme).secondary }}>
             Password
            </Text>

            <AntDesign name="exclamationcircleo" size={20} color={Colors.themeColor(state.theme).warning}/>

          </View>

          <TextInput
            onChange={setPassword}
            placeholder='********'
            placeholderTextColor={Colors.themeColor(state.theme).placeholderColor}
            style={[SharedStyles.typography.button, {
              borderBottomWidth: 1,
              borderColor: Colors.themeColor(state.theme).warning,
              color: Colors.themeColor(state.theme).textColor,
              fontWeight: "normal"
            }]} />
          <Text style={{ color: Colors.themeColor(state.theme).warning }}>
            Your Password is incorect
          </Text>
        </View>
        <CircleBtn color={Colors.themeColor("light").primary} style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }}>
          <Text style={[SharedStyles.typography.button, { color: Colors.themeColor("dark").textColor }]}>Login</Text>

        </CircleBtn>
      </KeyboardAvoidingView>

      <View style={{ marginTop: 150, position: "relative" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{
            marginBottom: 10,
            color: Colors.themeColor(state.theme).textColor
          }}
          >Dont have account?
          </Text>
          <Pressable style={{ marginBottom: 10 }} onPress={() => navigation.navigate("Register")}>
            <Text style={[SharedStyles.typography.titleNormal, {
              fontWeight: "bold",
              color: Colors.themeColor(state.theme).textColor
            }]}>
              Sign up
            </Text>
          </Pressable>
          <Text style={{
            marginBottom: 10,
            color: Colors.themeColor(state.theme).textColor
          }}>or</Text>
          <Pressable>
            <Text style={[SharedStyles.typography.titleNormal, {
              fontWeight: "bold",
              color: Colors.themeColor(state.theme).textColor
            }]}>
                Continue as guest
            </Text>
          </Pressable>
        </View>
      </View>

    </View>
  );
};

export default Login;

import React, { useState, useContext } from "react";
import { Pressable, Text, TextInput, View, KeyboardAvoidingView, ActivityIndicator } from "react-native";

// Constants
import Constants from "expo-constants";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Sharedstyles
import { SharedStyles, Colors, Typography } from "../styles";

// Components
import { CircleBtn } from "../components/atoms";

// Linear gradient
import { LinearGradient } from "expo-linear-gradient";

// Store
import { StoreContext } from "../store/reducer";
import { actions, createAction } from "../store/actions";

// Firebase
import Firebase from "../firebase-config";

// Localization
import { localization } from "../localization";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const store = useContext(StoreContext);
  const state = store.state;
  const dispatch = store.dispatch;

  // Errors
  const [loginError, setLoginError] = useState(null);

  const auth = Firebase.auth();

  const onHandleLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        setIsLoading(true);

        await auth.signInWithEmailAndPassword(email, password)
          .then(resp => {
            console.log(resp);
            setIsLoading(false);
            setLoginError(false);

            dispatch(createAction(actions.USER_LOGIN, email));
          });
      }
    } catch (error) {
      setLoginError(true);
      alert(error);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight + 20, alignItems: "center", backgroundColor: Colors.themeColor(state.theme).background }}>
      <Text style={{ fontSize: 40, marginTop: 40, color: Colors.themeColor(state.theme).primary, fontWeight: "600" }}>
        {localization("loginTitle")}
      </Text>

      <KeyboardAvoidingView
        behavior={"position"}
        style={{ justifyContent: "center", marginTop: 100, width: "80%" }}>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            <Text style={{ fontSize: 20, marginRight: 5, color: Colors.themeColor(state.theme).secondary }}>
              {localization("eMail")}
            </Text>

            {
              loginError !== null ? !loginError ? <AntDesign
                name="checkcircleo"
                size={20}
                color={Colors.themeColor(state.theme).success}
              /> : <AntDesign
                name="exclamationcircleo"
                size={20}
                color={Colors.themeColor(state.theme).warning}
              /> : null
            }

          </View>

          <TextInput
            onChangeText={setEmail}
            placeholder={"example@mail.com"}
            placeholderTextColor={Colors.themeColor(state.theme).placeholderColor}
            autoCapitalize='none'
            style={[SharedStyles.typography.button, {
              borderBottomWidth: 1,
              borderColor: loginError !== null ? !loginError ? Colors.themeColor(state.theme).success : Colors.themeColor(state.theme).warning : Colors.themeColor(state.theme).textColor,
              color: Colors.themeColor(state.theme).textColor,
              fontWeight: "normal"

            }]} />

        </View>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            <Text style={{ fontSize: 20, marginRight: 5, color: Colors.themeColor(state.theme).secondary }}>
              {localization("password")}
            </Text>

            {
              loginError !== null ? !loginError ? <AntDesign
                name="checkcircleo"
                size={20}
                color={Colors.themeColor(state.theme).success}
              /> : <AntDesign
                name="exclamationcircleo"
                size={20}
                color={Colors.themeColor(state.theme).warning}
              /> : null
            }

          </View>

          <TextInput
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize='none'
            placeholder='********'
            placeholderTextColor={Colors.themeColor(state.theme).placeholderColor}
            style={[SharedStyles.typography.button, {
              borderBottomWidth: 1,
              borderColor: loginError !== null ? !loginError ? Colors.themeColor(state.theme).success : Colors.themeColor(state.theme).warning : Colors.themeColor(state.theme).textColor,
              color: Colors.themeColor(state.theme).textColor,
              fontWeight: "normal"
            }]} />

        </View>
        <CircleBtn color={Colors.themeColor("light").primary} style={{ marginTop: Typography.FONT_SIZE_TITLE_MD, justifyContent: "center", alignItems: "center" }}
          onPress={() => onHandleLogin()}
        >
          {
            isLoading ? <ActivityIndicator size="small" color={Colors.themeColor("dark").textColor}/> : <Text style={[SharedStyles.typography.button, { color: Colors.themeColor("dark").textColor }]}>{localization("login")}</Text>
          }

        </CircleBtn>

        {
          loginError && <Text style={ {
            color: Colors.themeColor(state.theme).warning,
            fontSize: Typography.FONT_SIZE_MEDIUM,
            textAlign: "center",
            marginTop: Typography.FONT_SIZE_TITLE_MD,
            marginBottom: -(Typography.FONT_SIZE_TITLE_MD + Typography.FONT_SIZE_MEDIUM)
          }}>{localization("loginError")}</Text>
        }

      </KeyboardAvoidingView>

      <View style={{ marginTop: 150, position: "relative" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{
            marginBottom: 10,
            color: Colors.themeColor(state.theme).textColor
          }}
          >
            {localization("noAccMsg")}
          </Text>
          <CircleBtn color={Colors.themeColor(state.theme).secondary} style={{ marginTop: Typography.FONT_SIZE_TITLE_MD, justifyContent: "center", alignItems: "center" }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={[SharedStyles.typography.titleNormal, { color: Colors.themeColor("dark").textColor }]}>{localization("register")}</Text>
          </CircleBtn>

          <Text style={{
            marginVertical: 10,
            color: Colors.themeColor(state.theme).textColor
          }}>
            {localization("or")}
          </Text>
          <Pressable onPress={() => dispatch(createAction(actions.USER_LOGIN, "Guest"))}>
            <Text style={[SharedStyles.typography.titleNormal, {
              fontWeight: "bold",
              color: Colors.themeColor(state.theme).textColor
            }]}>
              {localization("continueAsGuest")}
            </Text>
          </Pressable>
        </View>
      </View>

    </View>
  );
};

export default Login;

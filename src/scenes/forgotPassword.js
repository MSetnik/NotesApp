import React, { useState, useContext, useCallback, useEffect, useRef } from "react";
import { Pressable, Text, TextInput, View, KeyboardAvoidingView, Alert, Image, Dimensions, AppState } from "react-native";

// Constants
import Constants from "expo-constants";

// Icons
import { AntDesign, Feather } from "@expo/vector-icons";

// Sharedstyles
import { SharedStyles, Colors, Typography } from "../styles";

// Components
import { CircleBtn } from "../components/atoms";

// Linear gradient
import { LinearGradient } from "expo-linear-gradient";

// Store
import { StoreContext } from "../store/reducer";
import { actions, createAction } from "../store/actions";

// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "../firebase-config";
// import { getAuth, onAuthStateChanged, FacebookAuthProvider, signInWithCredential } from "firebase/auth";
import { Firebase } from "../firebase-config";
import { localization } from "../localization";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, sendSignInLinkToEmail, signInWithEmailAndPassword } from "firebase/auth";
import { storeUser } from "../helpers/async-storage-helper";

const ForgotPassword = ({ navigation }) => {
  const appState = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Errors
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [waitingForVerification, setWaitingForVerification] = useState(false);

  const [loading, setIsLoading] = useState(false);

  const store = useContext(StoreContext);
  const state = store.state;
  const dispatch = store.dispatch;
  // firebase.initializeApp(firebaseConfig);
  const auth = getAuth();

  useEffect(() => {
    const subscriber = AppState.addEventListener("change", (state) => {
      console.log(appState);
      console.log(state);
      if (state === "active" && appState.current.match(/inactive|background/) && waitingForVerification) {
        navigation.goBack();
      }

      appState.current = state;
    });

    return () => subscriber.remove();
  }, []);

  const validateEmail = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
      return true;
    }
  };

  const sendPasswordReset = () => {
    if (validateEmail()) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log("sent");
        });

      return;
    }

    Alert.alert("Krivi format email adrese", "Provjerite unesenu email adresu i pokušajte ponovno");
  };

  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight + 20, alignItems: "center", backgroundColor: Colors.themeColor(state.theme).background }}>
      <CircleBtn
        style={{ marginLeft: Typography.FONT_SIZE_NORMAL, alignSelf: "start" }}
        color={Colors.themeColor(state.theme).btnColor}
        onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={Typography.FONT_SIZE_TITLE_MD} color={Colors.themeColor(state.theme).textColor} />
      </CircleBtn>
      <Text style={{
        width: "60%",
        textAlign: "center",
        fontSize: 40,
        marginTop: Typography.FONT_SIZE_TITLE_MD,
        color: Colors.themeColor(state.theme).primary,
        fontWeight: "600"
      }}>
        {localization("forgotPassword")}
      </Text>

      <Text style={{
        width: "80%",
        textAlign: "center",
        fontSize: Typography.FONT_SIZE_NORMAL,
        marginTop: Typography.FONT_SIZE_TITLE_MD * 3,
        color: Colors.themeColor(state.theme).dateColor
      }}>
        {localization("forgotPasswordSubtext")}
      </Text>

      <KeyboardAvoidingView
        behavior={"padding"}
        style={{ justifyContent: "center", marginTop: 100, width: "80%" }}>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            <Text style={{ fontSize: 20, marginRight: 5, color: Colors.themeColor(state.theme).secondary }}>
              {localization("eMail")}
            </Text>

            {
              emailError !== null ? !emailError ? <AntDesign
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
              borderColor: emailError !== null ? !emailError ? Colors.themeColor(state.theme).success : Colors.themeColor(state.theme).warning : Colors.themeColor(state.theme).textColor,
              color: Colors.themeColor(state.theme).textColor

            }]} />

          {
            emailError && <Text style={ { color: Colors.themeColor(state.theme).textColor }}>{localization("emailErrorMsg")}</Text>
          }
        </View>

        <CircleBtn
          isLoading={loading}
          onPress={() => sendPasswordReset()}
          color={Colors.themeColor("light").primary}
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Text style={[SharedStyles.typography.button, { color: Colors.themeColor("dark").textColor }]}>{localization("send")}</Text>
        </CircleBtn>
      </KeyboardAvoidingView>

    </View>
  );
};

export default ForgotPassword;

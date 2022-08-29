import React, { useState, useContext } from "react";
import { Pressable, Text, TextInput, View, KeyboardAvoidingView, Alert } from "react-native";

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

// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "../firebase-config";
// import { getAuth, onAuthStateChanged, FacebookAuthProvider, signInWithCredential } from "firebase/auth";
import Firebase from "../firebase-config";
import { localization } from "../localization";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Errors
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [emailError, setEmailError] = useState(null);

  const store = useContext(StoreContext);
  const state = store.state;
  const dispatch = store.dispatch;
  // firebase.initializeApp(firebaseConfig);
  const auth = Firebase.auth();

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

  const onHandleSignup = async () => {
    if (!validateEmail()) {
      return;
    }

    if (password.length === 0 || confirmPassword.length === 0) {
      setPasswordError(true);
      setConfirmPasswordError(true);
      return;
    }

    if (password.length <= 6) {
      console.log("manje od 6");
      setPasswordErrorMsg(localization("passwordErrorMsg"));
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    if (password !== confirmPassword) {
      console.log("Nije isto");
      setPasswordErrorMsg(localization("confirmPasswordErrorMsg"));
      setConfirmPasswordError(true);
      return;
    } else {
      setConfirmPasswordError(false);
    }

    try {
      if (email !== "" && password !== "") {
        console.log("success");
        await auth.createUserWithEmailAndPassword(email, password)
          .then(resp => {
            dispatch(createAction(actions.USER_LOGIN, resp.user.email));
          });
      }
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/email-already-in-use") {
        alert(localization("emailInUseMsg"));
        return;
      }

      if (error.code === "auth/invalid-email") {
        alert(localization("emailErrorMsg"));
        return;
      }

      if (error.code === "auth/network-request-failed") {
        alert(localization("emailErrorMsg"));
      }
      // console.error(error);
      // console.log("fail");
      // alert(error);
      // console.log(error);
    }
  };

  // const register = () => {
  //   if (password === confirmPassword) {
  //     // console.log(firebase.auth());
  //     // auth()
  //     //   .createUserWithEmailAndPassword(email, password)
  //     //   .then(() => {
  //     //     console.log("User account created & signed in!");
  //     //   })
  //     //   .catch(error => {
  //     //     if (error.code === "auth/email-already-in-use") {
  //     //       console.log("That email address is already in use!");
  //     //     }

  //     //     if (error.code === "auth/invalid-email") {
  //     //       console.log("That email address is invalid!");
  //     //     }

  //     //     console.error(error);
  //     //   });
  //   } else {
  //     setPasswordError(true);
  //   }
  // };

  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight + 20, alignItems: "center", backgroundColor: Colors.themeColor(state.theme).background }}>
      <Text style={{ fontSize: 40, marginTop: 40, color: Colors.themeColor(state.theme).primary, fontWeight: "600" }}>
        {localization("register")}
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

        <View style={{ marginBottom: Typography.FONT_SIZE_TITLE_LG }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            <Text style={{ fontSize: 20, marginRight: 5, color: Colors.themeColor(state.theme).secondary }}>
              {localization("password")}

            </Text>

            {
              passwordError !== null ? !passwordError ? <AntDesign
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
            placeholderTextColor={Colors.themeColor(state.theme).placeholderColor}
            secureTextEntry={true}
            autoCapitalize='none'
            placeholder='********'
            style={[SharedStyles.typography.button, {
              borderBottomWidth: 1,
              borderColor: passwordError !== null ? !passwordError ? Colors.themeColor(state.theme).success : Colors.themeColor(state.theme).warning : Colors.themeColor(state.theme).textColor,
              color: Colors.themeColor(state.theme).textColor
            }]} />

          {
            passwordError && <Text style={ { color: Colors.themeColor(state.theme).textColor }}>{passwordErrorMsg}</Text>
          }

        </View>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            <Text style={{ fontSize: 20, marginRight: 5, color: Colors.themeColor(state.theme).secondary }}>
              {localization("confirmPassword")}

            </Text>
            {
              confirmPasswordError !== null ? !confirmPasswordError ? <AntDesign
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
            onChangeText={setConfirmPassword}
            placeholderTextColor={Colors.themeColor(state.theme).placeholderColor}
            secureTextEntry={true}
            autoCapitalize='none'
            placeholder='********'
            style={[SharedStyles.typography.button, {
              borderBottomWidth: 1,
              borderColor: confirmPasswordError !== null ? !confirmPasswordError ? Colors.themeColor(state.theme).success : Colors.themeColor(state.theme).warning : Colors.themeColor(state.theme).textColor,

              color: Colors.themeColor(state.theme).textColor
            }]} />
          {
            confirmPasswordError && <Text style={ { color: Colors.themeColor(state.theme).textColor }}>{passwordErrorMsg}</Text>
          }
        </View>
        <CircleBtn
          onPress={() => onHandleSignup()}
          color={Colors.themeColor("light").primary}
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Text style={[SharedStyles.typography.button, { color: Colors.themeColor("dark").textColor }]}>{localization("register")}</Text>
        </CircleBtn>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

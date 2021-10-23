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

// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "../firebase-config";
// import { getAuth, onAuthStateChanged, FacebookAuthProvider, signInWithCredential } from "firebase/auth";
import Firebase from "../firebase-config";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Errors
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(false);

  const store = useContext(StoreContext);
  const state = store.state;

  // firebase.initializeApp(firebaseConfig);
  const auth = Firebase.auth();

  const onHandleSignup = async () => {
    console.log(email);

    // console.log(email.match("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])"));
    // console.log(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))/g.test('matko@mail.com'))
    // console.log(/^([a-z0-9]{5,})$/.test("abc1")); // false

    const validateEmail = () => {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        console.log("Email is Not Correct");
        return false;
      } else {
        console.log("Email is Correct");
        return true;
      }
    };

    console.log(validateEmail("matko@mail.com"));
    //   switch (password) {
    //     case password < 6:
    //       setPasswordErrorMsg("Password must be at least 6 characters");
    //       setPasswordError(true);
    //       break;

    //     case password !== confirmPassword:
    //       setPasswordErrorMsg("Passwords must match");
    //       setPasswordError(true);
    //   }

    //   // if (password !== confirmPassword) {
    //   //   setPasswordError(true);
    //   //   return;
    //   // }

  //   try {
  //     if (email !== "" && password !== "") {
  //       await auth.createUserWithEmailAndPassword(email, password);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  };

  const register = () => {
    if (password === confirmPassword) {
      // console.log(firebase.auth());
      // auth()
      //   .createUserWithEmailAndPassword(email, password)
      //   .then(() => {
      //     console.log("User account created & signed in!");
      //   })
      //   .catch(error => {
      //     if (error.code === "auth/email-already-in-use") {
      //       console.log("That email address is already in use!");
      //     }

      //     if (error.code === "auth/invalid-email") {
      //       console.log("That email address is invalid!");
      //     }

      //     console.error(error);
      //   });
    } else {
      setPasswordError(true);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight + 20, alignItems: "center", backgroundColor: Colors.themeColor(state.theme).background }}>
      <Text style={{ fontSize: 40, marginTop: 40, color: Colors.themeColor(state.theme).primary, fontWeight: "600" }}>
          Register
      </Text>

      <KeyboardAvoidingView
        behavior={"padding"}
        style={{ justifyContent: "center", marginTop: 100, width: "80%" }}>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            <Text style={{ fontSize: 20, marginRight: 5, color: Colors.themeColor(state.theme).secondary }}>
              E-Mail
            </Text>

            <AntDesign name="exclamationcircleo" size={20} color={Colors.themeColor(state.theme).warning} />
          </View>

          <TextInput
            onChangeText={setEmail}
            placeholder='pero.peric@mail.com'
            placeholderTextColor={Colors.themeColor(state.theme).placeholderColor}
            style={[SharedStyles.typography.button, {
              borderBottomWidth: 1,
              borderColor: Colors.themeColor(state.theme).warning,
              color: Colors.themeColor(state.theme).textColor

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
            onChangeText={setPassword}
            placeholder='********'
            placeholderTextColor={Colors.themeColor(state.theme).placeholderColor}
            style={[SharedStyles.typography.button, {
              borderBottomWidth: 1,
              borderColor: Colors.themeColor(state.theme).warning,
              color: Colors.themeColor(state.theme).textColor
            }]} />

          {
            passwordError && <Text>Password doesnt match</Text>
          }

        </View>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            <Text style={{ fontSize: 20, marginRight: 5, color: Colors.themeColor(state.theme).secondary }}>
             Confirm Password
            </Text>
            <AntDesign name="exclamationcircleo" size={20} color={Colors.themeColor(state.theme).warning}/>
          </View>

          <TextInput
            onChangeText={setConfirmPassword}
            placeholder='********'
            placeholderTextColor={Colors.themeColor(state.theme).placeholderColor}
            style={[SharedStyles.typography.button, {
              borderBottomWidth: 1,
              borderColor: Colors.themeColor(state.theme).warning,
              color: Colors.themeColor(state.theme).textColor
            }]} />
          {
            passwordError && <Text>Password doesnt match</Text>
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
          <Text style={[SharedStyles.typography.button, { color: Colors.themeColor("dark").textColor }]}>Register</Text>
        </CircleBtn>
      </KeyboardAvoidingView>

      {/* <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 50 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{
            marginBottom: 10,
            color: Colors.themeColor(state.theme).textColor
          }}
          >Dont have acc?
          </Text>
          <Pressable style={{ marginBottom: 10 }} onPress={() => navigation.navigate("Register")}>
            <Text style={[SharedStyles.typography.titleNormal, {
              fontWeight: "bold",
              color: Colors.themeColor(state.theme).textColor
            }]}>
              Sign createUserWithEmailAndPassword
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
      </View> */}

    </View>
  );
};

export default Register;

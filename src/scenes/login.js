import React, { useState, useContext } from "react";
import { Pressable, Text, TextInput, View, KeyboardAvoidingView, ActivityIndicator, Alert } from "react-native";

// Constants
import Constants from "expo-constants";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Sharedstyles
import { SharedStyles, Colors, Typography } from "../styles";

// Components
import { CircleBtn } from "../components/atoms";

// Store
import { StoreContext } from "../store/reducer";
import { actions, createAction } from "../store/actions";

// Firebase
import { getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";

// Localization
import { localization } from "../localization";
import { getStoredLocalNotes, storeLocalNotes, storeUser } from "../helpers/async-storage-helper";
import { getUserNotes } from "../endpoint/firestore";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const store = useContext(StoreContext);
  const state = store.state;
  const dispatch = store.dispatch;

  // Errors
  const [loginError, setLoginError] = useState(null);

  const auth = getAuth();

  const onHandleLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        setIsLoading(true);

        await signInWithEmailAndPassword(auth, email, password)
          .then(async (resp) => {
            if (resp.user.emailVerified) {
              const userNotes = await getUserNotes(resp.user.uid, dispatch);
              console.log(resp);
              setIsLoading(false);
              setLoginError(false);

              console.log(userNotes);

              dispatch(createAction(actions.USER_LOGIN, resp.user));

              storeUser(resp.user);
            } else {
              Alert.alert("Potvrda emaila nije dovršena", "Niste potvrdili vašu email adresu. Želite li da vam ponovno pošaljemo email za potvrdu?", [
                {
                  text: "Pošalji",
                  onPress: () => {
                    sendEmailVerification(resp.user);
                  }
                },
                {
                  text: "Odustani",
                  style: "destructive",
                  onPress: () => {}
                }
              ]);
              setIsLoading(false);
            }
          });
      }
    } catch (error) {
      setLoginError(true);
      console.log(error);
      setIsLoading(false);
    }
  };

  const loginAsGuest = async () => {
    const localNotes = await getStoredLocalNotes();

    dispatch(createAction(actions.USER_LOGIN, { email: "Guest" }));
    dispatch(createAction(actions.ADD_NOTE, localNotes));
    dispatch(createAction(actions.ADD_LOCAL_NOTES, localNotes));
    storeUser({ email: "Guest" });
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
              fontWeight: "normal",
              textTransform: "none"
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
              fontWeight: "normal",
              textTransform: "none"
            }]} />

          <Pressable onPress={() => navigation.navigate("forgotPassword")} style={{ marginTop: 4 }} >
            <Text style={[SharedStyles.typography.bodySmall]}>Zaboravili ste lozinku?</Text>
          </Pressable>

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
          <Pressable onPress={() => {
            loginAsGuest();
          }}>
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

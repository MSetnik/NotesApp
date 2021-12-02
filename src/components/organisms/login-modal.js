import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, TextInput, Button, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { Typography, Colors } from "../../styles";

const LoginModal = ({
  isModalVisible,
  isTransparent = true,
  iconBackgroundColor,
  requestClosePress,
  modalTitle = null,
  modalMessage = null,
  icon,
  modalContainerStyle = null,
  modalWrapperStyle = null,
  children,
  showClose = true,
  messageTextStyle = null,
  modalBottom = false
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={isTransparent}
      onRequestClose={requestClosePress}
    >

      {
        !register ? <KeyboardAvoidingView
          behavior={"padding"}
          style={[styles.content, modalContainerStyle]}>
          <View style={[styles.modalWrapper, modalContainerStyle]}>
            <Pressable style={{ marginTop: 10, width: 50, height: 50, alignSelf: "flex-end", justifyContent: "center", alignItems: "center" }} onPress={() => requestClosePress() }>
              <Text>X</Text>
            </Pressable>

            <Text style={{ alignSelf: "center", justifyContent: "center", alignItems: "center" }}>
              LoginModal
            </Text>

            <View style={{ width: "80%", marginTop: 20 }}>
              <Text style={{ textAlign: "center", marginBottom: 10 }}>
                Email
              </Text>

              <TextInput
                keyboardType="ascii-capable"
                value={email}
                onChangeText={setEmail}
                maxLength={16}
                placeholder={"email"}
                selectionColor={Colors.themeColor().yellow}
                style={[
                  {
                    paddingVertical: Typography.FONT_SIZE_SMALL - 2,
                    borderRadius: Typography.FONT_SIZE_TITLE_LG,
                    borderWidth: 1,
                    paddingHorizontal: Typography.FONT_SIZE_NORMAL,
                    opacity: 0.6,
                    textTransform: "none"
                  }]
                }
                placeholderTextColor={Colors.themeColor().greyMedium}
              />
            </View>

            <View style={{ width: "80%", marginTop: 20 }}>
              <Text style={{ textAlign: "center", marginBottom: 10 }}>
                Password
              </Text>

              <TextInput
                keyboardType="ascii-capable"
                value={password}
                onChangeText={setPassword}
                maxLength={16}
                placeholder={"Password"}
                secureTextEntry={true}
                selectionColor={Colors.themeColor().yellow}
                style={[
                  {
                    paddingVertical: Typography.FONT_SIZE_SMALL - 2,
                    borderRadius: Typography.FONT_SIZE_TITLE_LG,
                    borderWidth: 1,
                    paddingHorizontal: Typography.FONT_SIZE_NORMAL,
                    opacity: 0.6,
                    textTransform: "none"
                  }]
                }
                placeholderTextColor={Colors.themeColor().greyMedium}
              />
            </View>

            <View style={{ justifyContent: "center", marginVertical: 20 }}>
              <Button title="Login" onPress={() => alert("Login")}/>
              <Button title="Register" onPress={() => {
                setEmail("");
                setPassword("");
                setRegister(!register);
              }}/>
            </View>
          </View>
        </KeyboardAvoidingView> : <KeyboardAvoidingView
          behavior={"padding"}
          style={[styles.content, modalContainerStyle]}
        >

          <View style={[styles.modalWrapper, modalContainerStyle]}>
            <Pressable style={{ marginTop: 10, width: 50, height: 50, alignSelf: "flex-end", justifyContent: "center", alignItems: "center" }} onPress={() => requestClosePress() }>
              <Text>X</Text>
            </Pressable>

            <Text style={{ alignSelf: "center", zIndex: 99, justifyContent: "center", alignItems: "center" }}>
                Register
            </Text>
            {/*
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}

              style={{ width: "100%", alignItems: "center" }}
            > */}

            <View style={{ width: "80%", marginTop: 20 }}>
              <Text style={{ textAlign: "center", marginBottom: 10 }}>
                Email
              </Text>

              <TextInput
                keyboardType="ascii-capable"
                value={email}
                onChangeText={setEmail}
                maxLength={16}
                placeholder={"email"}
                selectionColor={Colors.themeColor().yellow}
                style={[
                  {
                    paddingVertical: Typography.FONT_SIZE_SMALL - 2,
                    borderRadius: Typography.FONT_SIZE_TITLE_LG,
                    borderWidth: 1,
                    paddingHorizontal: Typography.FONT_SIZE_NORMAL,
                    opacity: 0.6,
                    textTransform: "none"
                  }]
                }
                placeholderTextColor={Colors.themeColor().greyMedium}
              />
            </View>

            <View style={{ width: "80%", marginTop: 20 }}>
              <Text style={{ textAlign: "center", marginBottom: 10 }}>
                Password
              </Text>

              <TextInput
                keyboardType="ascii-capable"
                value={password}
                onChangeText={setPassword}
                maxLength={16}
                placeholder={"Password"}
                secureTextEntry={true}
                selectionColor={Colors.themeColor().yellow}
                style={[
                  {
                    paddingVertical: Typography.FONT_SIZE_SMALL - 2,
                    borderRadius: Typography.FONT_SIZE_TITLE_LG,
                    borderWidth: 1,
                    paddingHorizontal: Typography.FONT_SIZE_NORMAL,
                    opacity: 0.6,
                    textTransform: "none"
                  }]
                }
                placeholderTextColor={Colors.themeColor().greyMedium}
              />
            </View>

            <View style={{ width: "80%", marginTop: 20 }}>
              <Text style={{ textAlign: "center", marginBottom: 10 }}>
                Confirm Password
              </Text>

              <TextInput
                keyboardType="ascii-capable"
                value={password}
                onChangeText={setPassword}
                maxLength={16}
                placeholder={"Password"}
                secureTextEntry={true}
                selectionColor={Colors.themeColor().yellow}
                style={[
                  {
                    paddingVertical: Typography.FONT_SIZE_SMALL - 2,
                    borderRadius: Typography.FONT_SIZE_TITLE_LG,
                    borderWidth: 1,
                    paddingHorizontal: Typography.FONT_SIZE_NORMAL,
                    opacity: 0.6,
                    textTransform: "none"
                  }]
                }
                placeholderTextColor={Colors.themeColor().greyMedium}
              />
            </View>

            <View style={{ justifyContent: "center", marginVertical: 20 }}>
              <Button title="Register" onPress={() => alert("register")}/>

              <Button title="Back" onPress={() => {
                setEmail("");
                setPassword("");
                setRegister(!register);
              }}/>
            </View>
          </View>
        </KeyboardAvoidingView>
      }

    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: Typography.FONT_SIZE_NORMAL * 2,
    justifyContent: "center"
  },
  modalWrapper: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20

  },
  modalContainer: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "red"
    // borderTopLeftRadius: Typography.FONT_SIZE_TITLE_LG,
    // borderTopRightRadius: Typography.FONT_SIZE_TITLE_LG,
    // padding: Typography.FONT_SIZE_NORMAL,
    // alignSelf: "center",
    // // backgroundColor: Colors.themeColor().background,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5
  }
});

export default LoginModal;

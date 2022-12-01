import { HStack, Pressable, Text, View } from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import CustomInput from "../components/CustomInput";
import AppHeader from "../components/headers/AppHeader";
import Layout from "../components/Layout";
import PasswordInput from "../components/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { Screens } from "../helper/ScreenConstant";
import { Colors } from "../utils/color";
import { width } from "../utils/responsivness";
import Apple from "../components/svg/Apple";
import Google from "../components/svg/Google";
import Email from "../components/svg/Email";
import Facebook from "../components/svg/Facebook";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  return (
    <Layout
      header={
        <AppHeader
          title="Login"
          bg="white"
          goBack={() => {
            props.navigation.goBack();
          }}
          {...props}
        />
      }
      skeleton={null}
      hideHeaderOnLoad
    >
      <View style={styles.mainView}>
        <Text style={styles.mainHeading}>Sign In to Pakwaan</Text>
        <Text style={styles.secondaryHeading}>Don’t have an account?</Text>
        <SecondaryButton
          onPress={() => props.navigation.navigate(Screens.signUp)}
          title={"Sign Up"}
          width={width * 0.25}
          marginTop={5}
          height={45}
        />
        <View mt={20}>
          <CustomInput
            value={email}
            onChange={(text) => {
              setEmail(text);
            }}
            width={width * 0.85}
            keyboardType={"email-address"}
            placeHolder={"Enter Email"}
            icon={<Email width={width * 0.1} height={width * 0.07} />}
          />
          <PasswordInput
            value={password}
            onChange={(text) => {
              setPassword(text);
            }}
            marginTop={10}
            secureText={securePassword}
            onPressUnsecure={() => {
              setSecurePassword(!securePassword);
            }}
            placeHolder={"Password"}
          />
          <PrimaryButton
            height={52}
            // onPress={() => navigate(Screens.bottomTab)}
            onPress={() => {}}
            title={"Login"}
            width={width * 0.85}
            marginTop={10}
            textFontSize={16}
          />
          <HStack justifyContent={"space-around"} alignItems={"center"} mt={10}>
            <Pressable>
              <Apple width={width * 0.08} height={width * 0.08} />
            </Pressable>
            <Pressable>
              <Facebook width={width * 0.08} height={width * 0.08} />
            </Pressable>
            <Pressable>
              <Google width={width * 0.08} height={width * 0.08} />
            </Pressable>
          </HStack>
        </View>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  mainHeading: {
    // fontFamily: Fonts.PoppinsRegular,
    fontSize: 26,
    lineHeight: 38,
    fontWeight: "500",
    color: Colors.textColor,
  },
  secondaryHeading: {
    // fontFamily: Fonts.PoppinsRegular,
    fontSize: 16,
    lineHeight: 27,
    fontWeight: "400",
    color: Colors.textColor,
  },
  mainView: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  forgetText: {
    // fontFamily: Fonts.PoppinsRegular,
    fontSize: 14,
    fontWeight: "400",
    marginTop: 20,
    color: Colors.primary,
  },
});
export default Login;

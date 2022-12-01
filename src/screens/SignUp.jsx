import { HStack, Pressable, Text, View } from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import CustomInput from "../components/CustomInput";
import AppHeader from "../components/headers/AppHeader";
import Layout from "../components/Layout";
import PasswordInput from "../components/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";
import Apple from "../components/svg/Apple";
import Google from "../components/svg/Google";
import { Colors } from "../utils/color";
import { width } from "../utils/responsivness";
import Email from "../components/svg/Email";
import Facebook from "../components/svg/Facebook";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const [secureRePassword, setSecureRePassword] = useState(true);
  const [rePassword, setRePassword] = useState("");
  return (
    <Layout
      header={
        <AppHeader
          title="Register"
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
        <Text style={styles.mainHeading}>Welcome! Create your Profile</Text>
        <Text style={styles.secondaryHeading}>
          Enter detail below to create your account
        </Text>

        <View mt={20}>
          <HStack width={width * 0.85} justifyContent={"space-between"}>
            <CustomInput
              value={firstName}
              onChange={(text) => {
                setFirstName(text);
              }}
              width={width * 0.4}
              placeHolder={"First Name"}
              keyboardType={"email-address"}
              icon={
                <View mx={2}>
                  <MaterialIcons
                    name="perm-identity"
                    size={width * 0.06}
                    color={Colors.borderColor}
                  />
                </View>
              }
            />
            <CustomInput
              value={lastName}
              onChange={(text) => {
                setLastName(text);
              }}
              width={width * 0.4}
              placeHolder={"Last Name"}
              keyboardType={"email-address"}
              icon={
                <View mx={2}>
                  <MaterialIcons
                    name="perm-identity"
                    size={width * 0.06}
                    color={Colors.borderColor}
                  />
                </View>
              }
            />
          </HStack>
          <CustomInput
            value={email}
            onChange={(text) => {
              setEmail(text);
            }}
            marginTop={5}
            width={width * 0.85}
            placeHolder={"Enter Email"}
            keyboardType={"email-address"}
            icon={<Email width={width * 0.1} height={width * 0.07} />}
          />
          <CustomInput
            value={phoneNo}
            onChange={(text) => {
              setPhoneNo(text);
            }}
            width={width * 0.85}
            marginTop={5}
            placeHolder={"Enter Phone Number"}
            keyboardType={"phone-pad"}
            icon={
              <View mx={2}>
                <Feather
                  name="phone"
                  size={width * 0.06}
                  color={Colors.borderColor}
                />
              </View>
            }
          />
          <CustomInput
            value={address}
            onChange={(text) => {
              setAddress(text);
            }}
            width={width * 0.85}
            marginTop={5}
            placeHolder={"Enter Address"}
            keyboardType={"postal-address"}
            icon={
              <View mx={2}>
                <FontAwesome
                  name="address-card-o"
                  size={width * 0.06}
                  color={Colors.borderColor}
                />
              </View>
            }
          />
          <PasswordInput
            value={password}
            onChange={(text) => {
              setPassword(text);
            }}
            marginTop={5}
            secureText={securePassword}
            onPressUnsecure={() => {
              setSecurePassword(!securePassword);
            }}
            placeHolder={"Password"}
          />
          <PasswordInput
            value={rePassword}
            onChange={(text) => {
              setRePassword(text);
            }}
            marginTop={5}
            secureText={secureRePassword}
            onPressUnsecure={() => {
              setSecureRePassword(!secureRePassword);
            }}
            placeHolder={"Confirm Password"}
          />
          <PrimaryButton
            height={52}
            // onPress={() => navigate(Screens.bottomTab)}
            onPress={() => {}}
            title={"SignUp"}
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
    width: width * 0.7,
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
export default SignUp;

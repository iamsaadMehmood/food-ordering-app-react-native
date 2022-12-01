import { Input } from "native-base";
import React from "react";
import { Colors } from "../utils/color";
import Key from "./svg/Key";

import { Pressable } from "react-native";
import { width } from "../utils/responsivness";
import Eye from "./svg/Eye";
// interface Props {
//   value: string;
//   onChange: Function;
//   marginTop: number;
//   secureText: boolean;
//   onPressUnsecure: Function;
//   placeHolder: string;
// }
const PasswordInput = (props) => {
  return (
    <Input
      mt={props.marginTop}
      leftElement={<Key width={width * 0.1} height={width * 0.06} />}
      height={52}
      width={width * 0.85}
      borderRadius={8}
      borderColor={Colors.borderColor}
      placeholder={props.placeHolder}
      //   fontFamily={Fonts.PoppinsRegular}
      fontWeight={"400"}
      fontSize={14}
      value={props.value}
      onChangeText={(text) => {
        props.onChange(text.toString());
      }}
      color={Colors.primaryText}
      placeholderTextColor={Colors.borderColor}
      secureTextEntry={props.secureText}
      rightElement={
        <Pressable onPress={() => props.onPressUnsecure()}>
          <Eye width={width * 0.1} height={width * 0.06} />
        </Pressable>
      }
    />
  );
};
export default PasswordInput;

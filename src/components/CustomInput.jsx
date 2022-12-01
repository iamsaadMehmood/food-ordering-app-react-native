import { Input } from "native-base";
import React from "react";
import { Colors } from "../utils/color";

// interface Props {
//   value: string;
//   onChange: Function;
// }
const CustomInput = (props) => {
  return (
    <Input
      mt={props.marginTop || 0}
      leftElement={props.icon}
      height={52}
      width={props.width}
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
      keyboardType={props.keyboardType}
      autoCapitalize={"none"}
      color={Colors.textColor}
      placeholderTextColor={Colors.borderColor}
    />
  );
};

export default CustomInput;

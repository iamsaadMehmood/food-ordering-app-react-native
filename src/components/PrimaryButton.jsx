import { Button, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../utils/color";
// interface IProps {
//   onPress: Function;
//   title: string;
//   width: number;
//   marginTop?: number;
//   height: number;
//   textFontSize: number;
// }
const PrimaryButton = (props) => {
  return (
    <Button
      mt={props.marginTop}
      style={styles.btn}
      width={props.width}
      height={props.height}
      onPress={() => props.onPress()}
    >
      <Text fontSize={props.textFontSize} style={styles.text}>
        {props.title}
      </Text>
    </Button>
  );
};
const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,

    borderRadius: 8,
  },
  text: {
    color: Colors.background,
    // fontFamily: Fonts.PoppinsRegular,
    fontWeight: "400",

    // textAlign: 'center',
  },
});
export default PrimaryButton;

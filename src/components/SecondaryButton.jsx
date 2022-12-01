import { Button, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../utils/color";
// interface IProps {
//   onPress: Function;
//   title: string;
//   width: number;
//   height: number;
//   marginTop?: number;
// }
const SecondaryButton = (props) => {
  return (
    <Button
      mt={props.marginTop}
      style={styles.btn}
      width={props.width}
      height={props.height}
      onPress={() => props.onPress()}
    >
      <Text style={styles.text}>{props.title}</Text>
    </Button>
  );
};
const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,

    borderRadius: 8,
  },
  text: {
    color: Colors.primary,
    // fontFamily: Fonts.PoppinsRegular,
    fontWeight: "400",
    fontSize: 16,
    // textAlign: 'center',
  },
});
export default SecondaryButton;

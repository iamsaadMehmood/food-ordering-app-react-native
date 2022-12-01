import React, { useState, useRef } from 'react';
import { VStack, View, Heading, Text, Button, HStack, Image, FlatList, Pressable, Modal } from 'native-base';
import AppHeader from '../components/headers/AppHeader';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Colors } from '../utils/color';
import { AntDesign } from '@expo/vector-icons';
import { height, width } from '../utils/responsivness';

import { removeSpecificItem } from "../features/cartSlice";
import { getCartSum } from '../helper/getCartSum';
const Cart = (props) => {
  const cartData = useSelector((state) => state.cart.value)
  const [modalVisible, setModalVisible] = useState(false);
  const toDelete = useRef(null);
  const dispatch = useDispatch();
  const renderItem = (item) => {
    return (
      <HStack style={styles.row}>
        <Image alt='' source={{ uri: item.cover }} style={{ height: 40, width: 40, borderRadius: 6, }} />
        <Text style={{ ...styles.text, fontWeight: "400", width: width * 0.3 }} noOfLines={2}  >{item.title}</Text>
        <Text style={{ ...styles.text, fontWeight: "400", width: width * 0.2 }}>{item.quantity}</Text>
        <Text style={{ ...styles.text, fontWeight: "400", width: width * 0.2 }}>${item.quantity * item.price}</Text>
        <Pressable onPress={() => {
          toDelete.current = item;
          setModalVisible(true);
        }}>
          <AntDesign name="delete" size={20} color={Colors.danger} />
        </Pressable>
      </HStack>
    );
  }
  return (
    <SafeAreaView style={{
      height: "100%",
    }}>
      <AppHeader bg="white" close {...props} goBack={() => props.navigation.goBack()} />
      {cartData.length > 0 ? (
        <View mx={5} mt={5}>
          <HStack style={styles.row}>
            <View style={{ height: 30, width: 30 }}></View>
            <Text style={{ ...styles.text, fontWeight: "500", width: width * 0.3 }}>Title</Text>
            <Text style={{ ...styles.text, fontWeight: "500", width: width * 0.2 }}>Quantity</Text>
            <Text style={{ ...styles.text, fontWeight: "500", width: width * 0.2 }}>Price</Text>
            <View style={{ height: 20, width: 20 }}></View>
          </HStack>
          <FlatList data={cartData} renderItem={(item) => renderItem(item.item)} height={height * 0.4} />
          <View style={{ justifyContent: "space-between", height: height * 0.25 }}>
            <View>
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Text style={styles.subTotal}>SubTotal</Text>
                <Text style={styles.subTotal}>$ {getCartSum(cartData)}</Text>
              </HStack>
              <HStack mt={5} justifyContent={"space-between"} alignItems={"center"}>
                <Text style={styles.subTotal}>Delivery Fee</Text>
                <Text style={styles.subTotal}>$ 100</Text>
              </HStack>
            </View>
            <HStack justifyContent={"space-between"} alignItems={"center"}>
              <Text style={styles.subTotal}>Total</Text>
              <Text style={styles.subTotal}>$ {getCartSum(cartData) + 100}</Text>
            </HStack>
          </View>
          <Button
            mt={5}
            p="3" px="2.5"
            borderRadius="md"
            onPress={() => props.navigation.goBack()}
          >
            <Text color="white" bold>Checkout</Text>
          </Button>
        </View>
      ) : (
        <View flex={1} justifyContent="center" alignItems="center" _light={{ bg: 'white' }}>
          <VStack space="2" alignItems="center">
            <Heading>Hungry?</Heading>
            <Text color="gray.500">You haven't added anything to your cart!</Text>
            <Button
              mt="1"
              p="1" px="2.5"
              borderRadius="md"
              onPress={() => props.navigation.goBack()}
            >
              <Text color="white" bold>Browse</Text>
            </Button>
          </VStack>
        </View>
      )}
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        justifyContent="center"
        bottom="4"
        size="lg">
        <Modal.Content style={styles.modalBodyContainer}>
          <Text style={{ ...styles.text, fontWeight: "500" }}>Are you sure you want to remove this item?</Text>
          <HStack mt={5} alignItems={"center"} justifyContent={"space-between"} width={width * 0.6}>
            <Pressable

              style={styles.modalBtnCancel}
              onPress={() => {

                setModalVisible(false);

              }}>
              <Text style={styles.modalBtnTxtCancel}>Cancel</Text>
            </Pressable>
            <Pressable

              style={styles.modalBtnRemove}
              onPress={() => {
                dispatch(removeSpecificItem(toDelete.current))
                toDelete.current = null;
                setModalVisible(false);

              }}>
              <Text style={styles.modalBtnTxtDel}>Remove</Text>
            </Pressable>
          </HStack>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: Colors.textColor,
    textAlign: "center",


  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  subTotal: {
    fontSize: 18,
    color: Colors.textColor,
    fontWeight: "bold"
  },
  modalBtnRemove: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: width * 0.2,
    backgroundColor: Colors.danger,
    borderRadius: 8,
  },
  modalBtnCancel: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: width * 0.2,
    backgroundColor: Colors.grey,
    borderRadius: 8,
  },
  modalBtnTxtDel: {
    color: Colors.background,
    fontWeight: "400", fontSize: 15,
  },
  modalBtnTxtCancel: {
    color: Colors.textColor,
    fontWeight: "400", fontSize: 15,
  },
  modalBodyContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  }
})
export default Cart;

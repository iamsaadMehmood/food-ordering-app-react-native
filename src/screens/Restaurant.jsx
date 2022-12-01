import { AntDesign } from '@expo/vector-icons';
import {
  AspectRatio, Box, Heading, HStack, Icon, Image, Pressable, Stack, Text, VStack, Modal
} from 'native-base';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../components/headers/AppHeader';
import Layout from '../components/Layout';
import PopularOrderCard from '../components/PopularOrderCard';
import RestaurantSkeleton from '../components/skeletons/RestaurantSkeleton';
import * as Data from '../data';
import { getCartSum } from '../helper/getCartSum';
import { Colors } from '../utils/color';
import { width } from '../utils/responsivness';
import { emptyCart } from "../features/cartSlice";
const DishCategorySection = (props) => {
  return (
    <Box bg="white" mb="4">
      <VStack mb="4" px="4" pt="4">
        <HStack space="2" alignItems="center">
          {props.icon}
          <Heading fontSize="xl">{props?.data?.title || props.title}</Heading>
        </HStack>
        {props?.data?.description && <Text>{props.data.description}</Text>}
        {props.description && <Text>{props.description}</Text>}
      </VStack>
      {props.children}
    </Box>
  );
}

const Dish = (props) => {
  return (
    <Pressable
      py="2"
      mx="4"
      borderBottomWidth={props.separator ? "1" : "0"}
      borderBottomColor="gray.200"
      onPress={() => props.navigation.navigate("ItemDetail", {
        data: props.data,
        addOns: props.addOns,
        beverages: props.beverages
      })}
    >
      <HStack space="4" pr="4">
        <VStack w="3/4" overflow="hidden">
          <Text bold isTruncated>{props.data.title}</Text>
          <HStack space="2">
            <Text>{props.data.price}</Text>
            {props.data.popular &&
              <HStack alignItems="center" borderRadius="full" bg="orange.100" px="1.5">
                <Icon as={FontAwesome5} name="fire" color="orange.400" />
                <Text fontSize="xs" bold>Popular</Text>
              </HStack>
            }
          </HStack>
        </VStack>
        <AspectRatio w="1/4" ratio={1}>
          <Image
            source={{ uri: props.data.cover }}
            alt="cover" size="full"
          />
        </AspectRatio>
      </HStack>
    </Pressable>
  );
}

const Restaurant = (props) => {
  const { index } = props.route.params;
  const data = Data.restaurants[index];
  const cartData = useSelector((state) => state.cart.value);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <Layout
        header={<AppHeader title="Delivery" bg="white" goBack={() => {
          if (cartData.length > 0) {
            setModalVisible(true);
          } else {
            props.navigation.goBack();
          }
        }} {...props} />}
        skeleton={<RestaurantSkeleton />}
        hideHeaderOnLoad
      >
        {data.dishes && <>

          {/* Popular */}
          <DishCategorySection
            title="Popular"
            description="Most ordered right now."
            icon={
              <Icon as={FontAwesome5} name="fire" color="orange.400" size="sm" />
            }
          >
            <Stack space="4" pb="6" px="2" flexDirection="row" flexWrap="wrap">
              {data?.dishes?.map((category, i) => {
                return category.data.map((dish, j) => {
                  if (dish.popular) {
                    return <Box key={'popular' + dish.title + j} w="1/2" p="2">
                      <PopularOrderCard data={dish}
                        navigation={props.navigation}
                        addOns={Data.restaurants[index].addOns}
                        beverages={Data.restaurants[index].beverages} />
                    </Box>
                  }
                })
              })}
            </Stack>
          </DishCategorySection>
          {/* Dishes by category */}
          {data?.dishes?.map((category, i) => {
            return (
              <DishCategorySection key={category.title + i} data={category}>
                {category.data.map((dish, j) => {
                  let isLast = j === category.data.length - 1;
                  return (
                    <Dish key={dish.title + j}
                      data={dish} separator={!isLast}
                      navigation={props.navigation}
                      addOns={Data.restaurants[index].addOns}
                      beverages={Data.restaurants[index].beverages} />
                  );
                })}
              </DishCategorySection>
            );
          })}

        </>}
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          avoidKeyboard
          justifyContent="center"
          bottom="4"
          size="lg">
          <Modal.Content style={styles.modalBodyContainer}>
            <Text style={{ ...styles.text, fontWeight: "500" }}>You have product added in your cart if you want to go back you have to start over again.</Text>
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
                  dispatch(emptyCart())
                  setModalVisible(false);
                  props.navigation.goBack();
                }}>
                <Text style={styles.modalBtnTxtDel}>Remove</Text>
              </Pressable>
            </HStack>
          </Modal.Content>
        </Modal>
      </Layout>
      {getCartSum(cartData) > 0 ? <Pressable style={{
        position: "absolute",
        bottom: 20,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        flexDirection: "row",
        backgroundColor: Colors.grey, height: 50, width: width
      }}
        onPress={() => props.navigation.navigate("Cart")}
      >
        <HStack>
          <AntDesign name="shoppingcart" size={24} color={Colors.primary} />
          <Text ml={2} fontSize={16} color={Colors.primary} fontWeight={"medium"}>View Your Cart</Text>
        </HStack>
        <Text fontSize={16} color={Colors.primary} fontWeight={"bold"}>$ {getCartSum(cartData)}</Text>

      </Pressable> : null
      }</>
  );
}
const styles = StyleSheet.create({
  modalBtnRemove: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: width * 0.2,
    backgroundColor: Colors.primary,
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
export default Restaurant;

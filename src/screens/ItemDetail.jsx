import { AntDesign } from '@expo/vector-icons';
import { HStack, Image, Text, View, Radio } from "native-base";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';
import { addData } from "../features/cartSlice";
import { Colors } from "../utils/color";
import { height, width } from "../utils/responsivness";
const ItemDetail = (props) => {

    const dispatch = useDispatch()
    const { data, addOns, beverages } = props.route.params;

    const [selectedAddOn, setSelectedAddon] = useState(null);
    const [selectedBev, setSelectedBev] = useState(null);
    const [quantity, setQuantity] = useState(0);
    return <View style={styles.fullScreen}>
        <Image style={styles.image} source={{ uri: data.cover }} alt={"cover"} />
        <View mx={5} justifyContent={"space-between"} height={height * 0.65}>
            <View>
                <HStack justifyContent={"space-between"} alignItems={"center"}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.price}>{data.price}$</Text>
                </HStack>
                <Text style={styles.description}>Enjoy the crispy chicken burger </Text>
                <View mt={7}>
                    <Text style={styles.selectText} mb={2}>Select Add Ons (Optional)</Text>
                    <View style={styles.radioButtonContainer}>
                        <Radio.Group defaultValue="none" name="addons" accessibilityLabel="select Add Ons" onChange={(val) => {
                            console.log(val)
                            if (val === "none") {
                                setSelectedAddon(null);
                            } else {
                                setSelectedAddon(val);
                            }
                        }}>
                            <Radio value={"none"} my={1}>
                                <HStack width={"70%"} justifyContent={"space-between"} alignItems={"center"}>
                                    <Text>None</Text>
                                </HStack>
                            </Radio>
                            {addOns.map((item) => <Radio value={item} my={1}>
                                <HStack width={"70%"} justifyContent={"space-between"} alignItems={"center"}>
                                    <Text>{item.title}</Text>
                                    <Text>{item.price}$</Text>
                                </HStack>
                            </Radio>)}
                        </Radio.Group>
                    </View>
                </View>
                <View mt={7}>
                    <Text style={styles.selectText} mb={2}>Select Beverages (Optional)</Text>
                    <View style={styles.radioButtonContainer}>
                        <Radio.Group defaultValue="none" name="beverages" accessibilityLabel="select beverages" onChange={(val) => {
                            console.log(val)
                            if (val === "none") {
                                setSelectedBev(null);
                            } else {
                                setSelectedBev(val);
                            }
                        }}>
                            <Radio value={"none"} my={1}>
                                <HStack width={"70%"} justifyContent={"space-between"} alignItems={"center"}>
                                    <Text>None</Text>
                                </HStack>
                            </Radio>
                            {beverages.map((item) => <Radio value={item} my={1}>
                                <HStack width={"70%"} justifyContent={"space-between"} alignItems={"center"}>
                                    <Text>{item.title}</Text>
                                    <Text>{item.price}$</Text>
                                </HStack>
                            </Radio>)}
                        </Radio.Group>
                    </View>
                </View>
            </View>
            <View>
                <HStack px={5} my={5} justifyContent={"space-between"} alignItems={"center"}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text style={styles.priceText}>{quantity * ((selectedAddOn ? selectedAddOn.price : 0) + (selectedBev ? selectedBev.price : 0) + data.price)}$</Text>
                </HStack>
                <HStack justifyContent={"space-between"} alignItems={"center"}>
                    <HStack style={{ width: width * 0.3 }} justifyContent={"space-between"}>
                        <Pressable onPress={() => quantity !== 0 ? setQuantity(quantity - 1) : null}>
                            <AntDesign name="caretleft" size={24} color="#ED7014" />
                        </Pressable>
                        <Text style={{ fontSize: 16, color: quantity !== 0 ? Colors.textColor : Colors.danger }}>{quantity}</Text>
                        <Pressable onPress={() => setQuantity(quantity + 1)}>
                            <AntDesign name="caretright" size={24} color="#ED7014" />
                        </Pressable>
                    </HStack>

                    <Pressable style={styles.button} onPress={() => {
                        if (quantity > 0) {
                            const obj = { cover: data.cover, title: data.title, price: data.price, quantity };
                            dispatch(addData(obj))
                            if (selectedAddOn) {
                                const addOn = { cover: selectedAddOn.cover, title: selectedAddOn.title, price: selectedAddOn.price, quantity };
                                dispatch(addData(addOn))
                            }
                            if (selectedBev) {
                                const bev = { cover: selectedBev.cover, title: selectedBev.title, price: selectedBev.price, quantity };
                                dispatch(addData(bev))
                            }
                            // dispatch(addData(obj))
                            props.navigation.goBack();
                        } else {
                            console.log("Quantity is 0")
                        }
                    }}>
                        <Text style={styles.buttonText}> Add to Cart</Text>
                    </Pressable>

                </HStack>
            </View>
        </View>
    </View>
}
const styles = StyleSheet.create({
    fullScreen: {
        height: "100%", width: "100%", backgroundColor: "white"
    },
    image: {
        width: width,
        height: height * 0.3
        , borderBottomLeftRadius: height * 0.07,
        borderBottomRightRadius: height * 0.07,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        lineHeight: 25,
        color: Colors.textColor,
    },
    price: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.textColor,
    },
    description: {
        fontSize: 14,
        fontWeight: "400",
        textAlign: "justify",
        color: Colors.textColor,
    },
    button: {
        backgroundColor: Colors.primary,
        width: 160,
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        borderRadius: 8
    },
    buttonText: {
        color: Colors.background,
        fontSize: 14,
        fontWeight: "500"
    },
    radioButtonContainer: {
        borderWidth: 1,
        borderColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: width * 0.9,
        borderRadius: 8,

    }, selectText: {
        fontSize: 16,
        color: Colors.primary,
        fontWeight: "600"
    },
    totalText: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.textColor,
    },
    priceText: {
        fontSize: 15,
        fontWeight: "500",
        color: Colors.primary,
    }
});
export default ItemDetail;
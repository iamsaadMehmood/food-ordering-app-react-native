import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Cart from "../screens/Cart";
import Restaurants from "../screens/Restaurants";
import Restaurant from "../screens/Restaurant";
import JuanMart from "../screens/JuanMart";
import Shops from "../screens/Shops";
import DineIn from "../screens/DineIn";
import Pickup from "../screens/Pickup";
import Cuisine from "../screens/Cuisine";
import Campaign from "../screens/Campaign";
import RateOrder from "../screens/RateOrder";
import ItemDetail from "../screens/ItemDetail";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import { Screens } from "../helper/ScreenConstant";
const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Screens.home}
    >
      <Stack.Screen name={Screens.login} component={Login} />
      <Stack.Screen name={Screens.signUp} component={SignUp} />
      <Stack.Screen name={Screens.home} component={Home} />
      <Stack.Screen name={Screens.cart} component={Cart} />
      <Stack.Screen name={Screens.restaurants} component={Restaurants} />
      <Stack.Screen name={Screens.restaurant} component={Restaurant} />
      <Stack.Screen name={Screens.juanMart} component={JuanMart} />
      <Stack.Screen name={Screens.shops} component={Shops} />
      <Stack.Screen name={Screens.dineIn} component={DineIn} />
      <Stack.Screen name={Screens.pickup} component={Pickup} />
      <Stack.Screen name={Screens.cuisine} component={Cuisine} />
      <Stack.Screen name={Screens.campaign} component={Campaign} />
      <Stack.Screen name={Screens.rateOrder} component={RateOrder} />
      <Stack.Screen name={Screens.itemDetail} component={ItemDetail} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

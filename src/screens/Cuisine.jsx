import React from 'react';
import { VStack } from 'native-base';
import AppHeader from '../components/headers/AppHeader';
import Layout from '../components/Layout';
import CuisineSkeleton from '../components/skeletons/CuisineSkeleton';
import RestaurantCard from '../components/RestaurantCard';
import * as Data from '../data';

const Cuisine = (props) => {
  const { title } = props.route.params;
  return (
    <Layout
      p="2"
      bg="white"
      header={<AppHeader title={title} bg="white" goBack={() => props.navigation.goBack()} {...props} />}
      skeleton={<CuisineSkeleton />}
      hideHeaderOnLoad
    >
      <VStack space="2">
        {Data.restaurants.map((item, index) => {
          return (
            <RestaurantCard
              key={'restaurant'+index}
              title={item.title}
              description={item.description}
              promo1={item.promo1}
              promo2={item.promo2}
              deliveryFee={item.deliveryFee}
              deliveryTime={item.deliveryTime}
              cover={item.cover}
              maxW="full"
              onPress={() => {
                props.navigation.navigate('Restaurant', { index });
              }}
            />
          );
        })}
      </VStack>
    </Layout>
  );
}

export default Cuisine;

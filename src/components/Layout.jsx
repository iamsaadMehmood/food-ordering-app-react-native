import React from 'react';
import { SafeAreaView } from 'react-native';
import { HStack, ScrollView } from 'native-base';

const Layout = (props) => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, [])

  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      {props.hideHeaderOnLoad && (loaded && props.header || props.skeleton) || props.header}
      <HStack flex={1}>
        {(!props.hideHeaderOnLoad && !loaded) && props.skeleton}
        <ScrollView
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ p: props.p }}
          {...props}
        >
          {props.children}
        </ScrollView>
      </HStack>
    </SafeAreaView>
  );
}

export default Layout;

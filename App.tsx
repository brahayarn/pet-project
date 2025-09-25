import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ms } from "react-native-size-matters";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./src/redux/store";
import { Product } from "./src/redux/types";
import DetailScreen from "./src/screens/DetailScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LikedScreen from "./src/screens/LikedScreen";

const Tab = createBottomTabNavigator();
export type RootStackParamList = {
  Tabs: undefined;
  DetailScreen: { item: Product };
};

const Stack = createStackNavigator<RootStackParamList>();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        headerShown: false, tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={focused ? "black" : "grey"} />
        )
      }} />
      <Tab.Screen name="Liked" component={LikedScreen} options={{
        headerShown: false, tabBarIcon: ({ focused }) => (
          <MaterialIcons name={focused ? 'favorite' : 'favorite-outline'} size={24} color={focused ? "red" : "grey"} />
        )
      }} />
    </Tab.Navigator>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
              <Stack.Screen
                name="DetailScreen"
                component={DetailScreen}
                options={({ route, navigation }) => ({
                  title: route.params.item.title,
                  presentation: 'modal',
                  headerLeft: () => (
                    <Ionicons
                      name="close"
                      size={24}
                      color="black"
                      onPress={() => navigation.goBack()}
                      style={styles.icon}
                    />
                  ),
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </SafeAreaProvider>
    </Provider>
  );
}

export const styles = StyleSheet.create({
    icon: {
      marginLeft: ms(15),
    },
});
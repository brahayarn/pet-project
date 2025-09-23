import { persistor, store } from "@/src/redux/store";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { Product } from "../redux/types";
import DetailScreen from "../screens/DetailScreen";
import HomeScreen from "../screens/HomeScreen";
import LikedScreen from "../screens/LikedScreen";

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
          <Stack.Navigator>
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} />
          </Stack.Navigator>
        </PersistGate>
      </SafeAreaProvider>
    </Provider>
  );
}
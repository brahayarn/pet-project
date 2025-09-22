import { persistor, store } from "@/redux/store";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import Index from "./index";
import Liked from "./Liked";

const Tab = createBottomTabNavigator();
export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Index} options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={focused ? "black" : "grey"} />
          )
        }} />
        <Tab.Screen name="Liked" component={Liked} options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <MaterialIcons name={focused ? 'favorite' : 'favorite-outline'} size={24} color={focused ? "red" : "grey"} />
          )
        }} />
      </Tab.Navigator>
      </PersistGate>
    </Provider>
  );
}

import { persistor, store } from "@/src/redux/store";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import HomeScreen from "../screens/HomeScreen";
import LikedScreen from "../screens/LikedScreen";

const Tab = createBottomTabNavigator();
export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </SafeAreaProvider>
    </Provider>
  );
}

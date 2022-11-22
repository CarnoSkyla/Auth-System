import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='LoginScreen'
                    component={LoginScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name='RegisterScreen'
                    component={RegisterScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name='HomeScreen'
                    component={HomeScreen}
                    options={{headerLeft: null}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './screens/MenuScreen';
import TicTacToeScreen from './screens/TicTacToeScreen';
import DifficultySelectionScreen from "./screens/DifficultySelectionScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Menu">
                <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Moeilijkheid" component={DifficultySelectionScreen} />
                <Stack.Screen name="Spel" component={TicTacToeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

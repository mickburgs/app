import React from 'react';
import { Text, View } from 'react-native';
import {GameMode} from "../types/GameMode";
import Button from "../components/Button";
import { globalStyles } from '../components/globalStyles';

const MenuScreen = ({ navigation }) => {
    const handleModeSelection = (mode) => {
        if (mode === GameMode.Single) {
            navigation.navigate('Moeilijkheid');
        } else {
            navigation.navigate('Spel', { mode: GameMode.Multi });
        }
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Boter kaas en eieren</Text>
            <Text style={globalStyles.subtitle}>Voor Nolan en Lola</Text>
            <Button
                onPress={() => handleModeSelection(GameMode.Single)}
                title={"Alleen spelen"}
            />
            <Button
                onPress={() => handleModeSelection(GameMode.Multi)}
                title={"Samen spelen"}
            />
        </View>
    );
};


export default MenuScreen;

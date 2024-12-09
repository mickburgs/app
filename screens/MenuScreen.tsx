import React from 'react';
import {Text} from 'react-native';
import {GameMode} from "../types/GameMode";
import Button from "../components/Button";
import {globalStyles} from '../components/globalStyles';
import ScreenWrapper from "../components/ScreenWrapper";

const MenuScreen = ({navigation}) => {
    const handleModeSelection = (mode) => {
        navigation.navigate('Instellingen', {mode});
    };

    return (
        <ScreenWrapper>
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
        </ScreenWrapper>
    );
};


export default MenuScreen;

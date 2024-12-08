import React from 'react';
import {View, Text} from 'react-native';
import Button from "../components/Button";
import { globalStyles } from '../components/globalStyles';
import {GameMode} from "../types/GameMode";
import {Difficulty} from "../types/Difficulty";

const DifficultySelectionScreen = ({navigation}) => {
    const handleDifficultySelection = (difficulty) => {
        navigation.navigate('Spel', {
            mode: GameMode.Single,
            difficulty,
        });
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Hoe moeilijk?</Text>
            <Button
                onPress={() => handleDifficultySelection(Difficulty.Easy)}
                title={"Makkelijk"}
            />
            <Button
                onPress={() => handleDifficultySelection(Difficulty.Hard)}
                title={"Moeilijk"}
            />
        </View>
    );
};

export default DifficultySelectionScreen;

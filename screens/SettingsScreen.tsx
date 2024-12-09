import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {GameMode} from '../types/GameMode';
import {Difficulty} from '../types/Difficulty';
import Button from "../components/Button";
import ScreenWrapper from "../components/ScreenWrapper";

const MIN_BOARD_SIZE = 3;
const MAX_BOARD_SIZE = 6;

const SettingsScreen = ({navigation, route}) => {
    const {mode} = route.params;
    const [boardSize, setBoardSize] = useState(MIN_BOARD_SIZE);
    const [difficulty, setDifficulty] = useState(Difficulty.Easy);

    const handleStartGame = () => {
        navigation.navigate('Spel', {mode, boardSize, difficulty});
    };

    return (
        <ScreenWrapper>
            <View style={styles.settingsBlock}>
                <Text style={styles.label}>Aantal vakjes</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={boardSize}
                        style={styles.picker}
                        onValueChange={(value) => setBoardSize(Number(value))}
                    >
                        {Array.from({length: MAX_BOARD_SIZE - MIN_BOARD_SIZE + 1}, (_, i) => i + MIN_BOARD_SIZE).map(
                            (size) => (
                                <Picker.Item key={size} label={`${size}x${size}`} value={size}/>
                            )
                        )}
                    </Picker>
                </View>
            </View>

            {mode === GameMode.Single && (
                <View style={styles.settingsBlock}>
                    <Text style={styles.label}>Hoe moeilijk</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={difficulty}
                            style={styles.picker}
                            onValueChange={(value) => setDifficulty(value)}
                        >
                            <Picker.Item label="Makkelijk" value={Difficulty.Easy}/>
                            <Picker.Item label="Moeilijk" value={Difficulty.Hard}/>
                        </Picker>
                    </View>
                </View>
            )}

            <Button
                onPress={handleStartGame}
                title={"Spelen"}
            />
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    settingsBlock: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: 200,
    },
});

export default SettingsScreen;
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Menu, Button as PaperButton} from 'react-native-paper';
import {GameMode} from '../types/GameMode';
import {Difficulty} from '../types/Difficulty';
import ScreenWrapper from "../components/ScreenWrapper";
import Button from "../components/Button";

const MIN_BOARD_SIZE = 3;
const MAX_BOARD_SIZE = 6;

const SettingsScreen = ({navigation, route}) => {
    const {mode} = route.params;
    const [boardSize, setBoardSize] = useState(MIN_BOARD_SIZE);
    const [difficulty, setDifficulty] = useState(Difficulty.Easy);

    const [boardMenuVisible, setBoardMenuVisible] = useState(false);
    const [difficultyMenuVisible, setDifficultyMenuVisible] = useState(false);

    const handleStartGame = () => {
        navigation.navigate('Spel', {mode, boardSize, difficulty});
    };

    const boardSizeOptions = Array.from({length: MAX_BOARD_SIZE - MIN_BOARD_SIZE + 1}, (_, i) => i + MIN_BOARD_SIZE);
    const difficultyOptions = [
        {label: 'Makkelijk', value: Difficulty.Easy},
        {label: 'Moeilijk', value: Difficulty.Hard},
    ];

    return (
        <ScreenWrapper>
            <View style={styles.settingsBlock}>
                <Text style={styles.label}>Aantal vakjes</Text>
                <Menu
                    visible={boardMenuVisible}
                    onDismiss={() => setBoardMenuVisible(false)}
                    anchor={
                        <PaperButton
                            mode="outlined"
                            style={styles.selectButton}
                            theme={{
                                colors: {
                                    primary: '#4caf50',
                                },
                            }}
                            onPress={() => setBoardMenuVisible(true)}
                        >
                            {`${boardSize}x${boardSize}`}
                        </PaperButton>
                    }
                >
                    {boardSizeOptions.map((size) => (
                        <Menu.Item
                            key={size}
                            onPress={() => {
                                setBoardSize(size);
                                setBoardMenuVisible(false);
                            }}
                            title={`${size}x${size}`}
                        />
                    ))}
                </Menu>
            </View>

            {mode === GameMode.Single && (
                <View style={styles.settingsBlock}>
                    <Text style={styles.label}>Hoe moeilijk</Text>
                    <Menu
                        visible={difficultyMenuVisible}
                        onDismiss={() => setDifficultyMenuVisible(false)}
                        anchor={
                            <PaperButton
                                mode="outlined"
                                style={styles.selectButton}
                                theme={{
                                    colors: {
                                        primary: '#4caf50',
                                    },
                                }}
                                onPress={() => setDifficultyMenuVisible(true)}
                            >
                                {difficulty === Difficulty.Easy ? 'Makkelijk' : 'Moeilijk'}
                            </PaperButton>
                        }
                    >
                        {difficultyOptions.map((option) => (
                            <Menu.Item
                                key={option.value}
                                onPress={() => {
                                    setDifficulty(option.value);
                                    setDifficultyMenuVisible(false);
                                }}
                                title={option.label}
                            />
                        ))}
                    </Menu>
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
        color: 'white',
        fontSize: 18,
        marginBottom: 5,
    },
    selectButton: {
        borderColor: '#4caf50',
        borderRadius: 4,
        marginVertical: 10,
    }
});

export default SettingsScreen;

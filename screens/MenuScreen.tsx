import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const MenuScreen = ({ navigation }) => {
    const handleModeSelection = (mode) => {
        navigation.navigate('Game', { mode });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Boter kaas en eieren</Text>
            <Text style={styles.subtitle}>Voor Nolan en Lola</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleModeSelection('single')}
            >
                <Text style={styles.buttonText}>Alleen spelen</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleModeSelection('multi')}
            >
                <Text style={styles.buttonText}>Samen spelen</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        padding: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        color: '#555',
        marginBottom: 30,
    },
    button: {
        width: '80%',
        paddingVertical: 15,
        marginVertical: 10,
        backgroundColor: '#4caf50',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default MenuScreen;

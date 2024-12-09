import {StyleSheet} from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    subtitle: {
        fontSize: 20,
        color: '#555',
        marginBottom: 30,
    },
});

export type GlobalStyles = typeof globalStyles;

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
        color: 'white',
    },
    subtitle: {
        fontSize: 20,
        color: 'white',
        marginBottom: 30,
    },
});

export type GlobalStyles = typeof globalStyles;

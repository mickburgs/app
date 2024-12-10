import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {globalStyles} from './globalStyles';

const ScreenWrapper = ({children}) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={[styles.scrollContent, globalStyles.container]}
                style={styles.scrollView}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={true}
            >
                <LinearGradient
                    colors={['#101828', '#292f3d']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientBackground}
                />
                {children}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    scrollView: {
        flex: 1,
        overflow: 'scroll',
    },
    gradientBackground: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default ScreenWrapper;

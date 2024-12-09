import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {globalStyles} from './globalStyles';

const ScreenWrapper = ({children}) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={[styles.scrollContent, globalStyles.container]}
                style={styles.scrollView}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={true} // Enable scroll indicator
            >
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
});

export default ScreenWrapper;

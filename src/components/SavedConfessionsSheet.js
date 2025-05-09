import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SavedConfessionsSheet = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Saved Confessions</Text>
        <Text style={styles.content}>Here are your saved confessions...</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { padding: 16 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    content: { fontSize: 16 },
});

export default SavedConfessionsSheet;

import React from 'react';
import { TextInput, View } from 'react-native';
import { styles } from './styles';

export default function Search({ search, setSearch}: {search: string, setSearch: (text: string) => void}) {
    return (
        <View style={styles.container}>
            <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search products..."
                style={styles.textInput}
            />
        </View>
    );
}
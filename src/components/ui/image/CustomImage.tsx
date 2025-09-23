import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';
import { styles } from './style';

export default function CustomImage(uri: { uri: string }) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={uri}
                contentFit="cover"
            />
        </View>
    );
};
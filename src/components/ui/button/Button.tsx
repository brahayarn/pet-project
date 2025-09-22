import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Props } from '../../card/types';
import { styles } from './style';

export default function HomeScreen({ item, liked, dispatch, toggleLiked }: Props) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(toggleLiked(item))}
        >
            <Text style={styles.buttonText}>
                {liked.some((p) => p.id === item.id) ? 'Unlike' : 'Like'}
            </Text>
        </TouchableOpacity>
    );
};
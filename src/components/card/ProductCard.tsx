import React from 'react';
import { Text, View } from 'react-native';
import Button from '../ui/button/Button';
import CustomImage from '../ui/image/CustomImage';
import { styles } from './styles';
import { Props } from './types';

export default function HomeScreen({ item, liked, dispatch, toggleLiked}: Props) {
    return (
        <View>
            <Text style={styles.textTitle}>{item.title}</Text>
            <Text style={styles.textTitle}>${item.price}</Text>
            <CustomImage uri={item.imageUrl} />
            <Button item={item} liked={liked} dispatch={dispatch} toggleLiked={toggleLiked} />
        </View>
    );
};
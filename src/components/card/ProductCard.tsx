import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Pressable, Text } from 'react-native';
import Button from '../ui/button/Button';
import CustomImage from '../ui/image/CustomImage';
import { styles } from './styles';
import { Props } from './types';

type RootStackParamList = {
    DetailScreen: { item: Props['item'] };
};

export default function ProductCard({ item, liked, dispatch, toggleLiked }: Props) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'DetailScreen'>>();

    return (
        <Pressable onPress={() => navigation.navigate('DetailScreen', { item })}>
            <Text style={styles.textTitle}>{item.title}</Text>
            <Text style={styles.textTitle}>${item.price}</Text>
            <CustomImage uri={item.imageUrl} />
            <Button item={item} liked={liked} dispatch={dispatch} toggleLiked={toggleLiked} />
        </Pressable>
    );
}
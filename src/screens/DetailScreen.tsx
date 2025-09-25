import { RootStackParamList } from "@/App";
import { toggleLiked } from "@/src/redux/slice";
import { StackScreenProps } from '@react-navigation/stack';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import Button from '../components/ui/button/Button';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { RootState } from '../redux/store';

type Props = StackScreenProps<RootStackParamList, 'DetailScreen'>;

export const DetailScreen = ({ route }: Props) => {
    const { item } = route.params;
    const dispatch = useAppDispatch();
    const { liked } = useAppSelector((state: RootState) => state.products);

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>{item.title}</Text>
            <Text style={styles.textTitle}>${item.price}</Text>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
             <Button item={item} liked={liked} dispatch={dispatch} toggleLiked={toggleLiked} />
        </View>
    );
};

export default DetailScreen;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: ms(20),
        backgroundColor: '#fff',
    },
    textTitle: {
        fontSize: ms(28),
        fontWeight: 'bold',
        color: '#333',
    },
    textPrice: {
        fontSize: ms(16),
        color: 'black'
    },
    image: {
        width: '100%',
        height: ms(300),
        borderRadius: ms(10),
        marginVertical: ms(20),
    }
});
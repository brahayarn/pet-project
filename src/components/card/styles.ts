import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
export const styles = StyleSheet.create({
    textTitle: {
        fontSize: ms(28),
        fontWeight: 'bold',
        color: '#333',
    },
    textPrice: {
        fontSize: ms(16),
        color: 'black'
    },
    footer: {
        paddingVertical: ms(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
});
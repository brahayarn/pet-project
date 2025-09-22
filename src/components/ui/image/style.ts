import { StyleSheet } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: "100%",
        height: ms(200),
        backgroundColor: '#0553',
    },
});
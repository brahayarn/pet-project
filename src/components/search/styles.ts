import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        margin: ms(16),
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: ms(8),
        padding: ms(8),
        marginBottom: ms(16),
        fontSize: ms(16),
    },
});
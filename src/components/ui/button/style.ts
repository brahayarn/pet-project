import { StyleSheet } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  button: {
    width: ms(100), 
    height: ms(40), 
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(5), 
  },
  buttonText: {
    fontSize: ms(16), 
    color: 'white',
  },
});
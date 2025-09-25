import { ReactNode } from 'react';
import { Text } from 'react-native';

type CustomTextProps = {
  children: ReactNode;
  styles: {
    text: object;
  };
};
export const Custom = ({children, styles}: CustomTextProps) => {
  return (
    <Text style={styles.text}>
      {children}
    </Text>
  );
};
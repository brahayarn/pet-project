import { ReactNode } from 'react';
import { Text } from 'react-native';

export const Custom = ({children, styles}: {children: ReactNode, styles: any}) => {
  return (
    <Text style={styles.text}>
      {children}
    </Text>
  );
};

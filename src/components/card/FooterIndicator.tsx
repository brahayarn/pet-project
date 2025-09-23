import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";

export const FooterIndicator = () => {
    return (
        <View style={styles.footer}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
}
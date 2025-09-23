import { Text } from 'react-native';
import Search from '../search/Search';
import Container from '../ui/Container';
import { styles } from './style';

export default function Empty({search, setSearch}: {search: string, setSearch: (text: string) => void}) {
    return (
        <Container>
            <Search search={search} setSearch={setSearch} />
            <Text style={styles.textTitle}>
                No products found with this name.
            </Text>
        </Container>
    );
}
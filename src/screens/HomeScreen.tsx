import { fetchProducts } from "@/src/api/products";
import ProductCard from "@/src/components/card/ProductCard";
import Container from "@/src/components/ui/Container";
import { toggleLiked } from "@/src/redux/slice";
import { AppDispatch, RootState } from "@/src/redux/store";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from "./styles";

export default function HomeScreen() {
    const dispatch = useDispatch<AppDispatch>();
    const { products, liked, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;

    return (
        <Container>
            <FlashList
                data={products}
                style={styles.cardContainer}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard
                        item={item}
                        liked={liked}
                        dispatch={dispatch}
                        toggleLiked={toggleLiked}
                    />
                )}
            />
        </Container>
    );
}


import { fetchProducts } from "@/src/api/products";
import ProductCard from "@/src/components/card/ProductCard";
import Container from "@/src/components/ui/Container";
import { toggleLiked } from "@/src/redux/slice";
import { RootState } from "@/src/redux/store";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useSelector } from "react-redux";
import Empty from "../components/empty/Empy";
import Search from "../components/search/Search";
import useDebounce from "../hooks/useDebounce";
import { useAppDispatch } from "../redux/hooks/hooks";
import { styles } from "./styles";

export default function HomeScreen() {
    const dispatch = useAppDispatch();
    const { products, liked, loading, error } = useSelector((state: RootState) => state.products);
    const [search, setSearch] = useState('')

    const debouncedSearch = useDebounce({ value: search, delay: 1000 })

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchProducts(String(debouncedSearch))).unwrap();
            } catch (err) {
                console.warn("Search error:", err);
            }
        };
        fetchData();
    }, [debouncedSearch, dispatch]);

    if (loading) return <Text>Loading...</Text>;
    if (error) return (
        <Empty search={search} setSearch={setSearch} />
    );

    return (
        <Container>
            <Search search={search} setSearch={setSearch} />
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
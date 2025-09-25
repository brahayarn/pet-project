import { fetchProducts } from "@/src/api/products";
import ProductCard from "@/src/components/card/ProductCard";
import Container from "@/src/components/ui/Container";
import { toggleLiked } from "@/src/redux/slice";
import { RootState } from "@/src/redux/store";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { FooterIndicator } from "../components/card/FooterIndicator";
import Empty from "../components/empty/Empy";
import Search from "../components/search/Search";
import useDebounce from "../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { Product } from "../redux/types";
import { styles } from "./styles";

export default function HomeScreen() {
    const dispatch = useAppDispatch();
    const { liked, error } = useAppSelector((state: RootState) => state.products);
    const [search, setSearch] = useState('');

    const [data, setData] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [localLoading, setLocalLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const debouncedSearch = useDebounce({ value: search, delay: 500 });

    const fetchInitialData = useCallback(async () => {
        setLocalLoading(true);
        try {
            await new Promise(res => setTimeout(res, 1000));
            const products = await dispatch(
                fetchProducts({ search: typeof debouncedSearch === 'string' ? debouncedSearch : '', page: 1 })
            ).unwrap();
            setData(products ?? []);
            setPage(2);
            setHasMore(Array.isArray(products) && products.length === 10);
        } catch (err) {
            setData([]);
            setHasMore(false);
        }
        setLocalLoading(false);
    }, [debouncedSearch, dispatch]);

    useEffect(() => {
        fetchInitialData();
    }, [debouncedSearch]);

    const onRefresh = useCallback(async () => {
        setPage(1);
        await fetchInitialData();
        setRefreshing(false);
    }, [fetchInitialData]);

    const loadMoreData = useCallback(async () => {
        if (localLoading || !hasMore || refreshing) return;
        setLocalLoading(true);
        try {
            const products = await dispatch(
                fetchProducts({ search: typeof debouncedSearch === 'string' ? debouncedSearch : '', page })
            ).unwrap();
            if (products && products.length > 0) {
                setData((prev) => [...prev, ...(products ?? [])]);
                setPage((prev) => prev + 1);
                setHasMore(products.length === 10);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            setHasMore(false);
        }
        setLocalLoading(false);
    }, [debouncedSearch, page, hasMore, localLoading, dispatch, refreshing]);

    if (error) return <Empty search={search} setSearch={setSearch} />;
    if (!data.length && !localLoading) return <Empty search={search} setSearch={setSearch} />;

    return (
        <Container>
            <Search search={search} setSearch={setSearch} />
            <FlashList
                data={data}
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
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={FooterIndicator}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </Container>
    );
}
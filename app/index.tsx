import { FlashList } from "@shopify/flash-list";
import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, toggleLiked } from '../redux/slice';
import { AppDispatch, RootState } from '../redux/store';

export default function Index() {
   const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const { products, liked, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
     <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
    <FlashList
      data={products}
      style={styles.cardContainer}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ margin: 10 }}>
          <Text style={styles.textTitle}>{item.title}</Text>
          <Text style={styles.textTitle}>${item.price}</Text>
           <View style={styles.container}>
          <Image
            style={styles.image}
            source={item.imageUrl}
            contentFit="cover"
            transition={1000}
          />
          </View>
          <Button
            title={liked.some((p) => p.id === item.id) ? 'Unlike' : 'Like'}
            onPress={() => dispatch(toggleLiked(item))}
          />
        </View>
      )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: 200,
    backgroundColor: '#0553',
  },
  textTitle:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  textPrice: {
    fontSize: 16,
    color: 'black'
  },
  cardContainer: {
    padding: 10,
    gap: 10
  }
});

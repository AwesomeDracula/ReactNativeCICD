import * as React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from 'common/constants';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {useEffect} from 'react';
import {fetchProducts, productsSelectors} from './productSlice';
import ProductItem from './components/ProductItem';

const ProductList = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const listProductIds = useAppSelector(productsSelectors.selectIds);

  console.log('listProductIds', listProductIds);
  useEffect(() => {
    const params = {limit: 5};
    dispatch(fetchProducts(params));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate(RouteName.ProductDetail)}>
        <Text>ProductList</Text>
        <Text>{listProductIds.length}</Text>
      </TouchableOpacity> */}

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        data={listProductIds}
        renderItem={({item}) => <ProductItem idProduct={item} />}
        keyExtractor={item => item.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  separator: {
    height: 10,
  },
});

export default ProductList;

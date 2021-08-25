import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from 'common/constants';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {useEffect} from 'react';
import {fetchProducts, IProduct, productsSelectors} from '../productSlice';
import {EntityId} from '@reduxjs/toolkit';

type IProps = {
  idProduct: EntityId;
};

const ProductItem = ({idProduct}: IProps) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const product = useAppSelector(state =>
    productsSelectors.selectById(state, idProduct),
  );

  if (!product) {
    return <View />;
  }

  const goProductDetail = () => {
    navigation.navigate(RouteName.ProductDetail, {
      idProduct,
    });
  };

  return (
    <TouchableOpacity onPress={goProductDetail}>
      <View style={styles.container}>
        <Image source={{uri: product.image}} style={styles.image} />

        <View style={styles.rightContainer}>
          <Text style={styles.category} numberOfLines={1}>
            {product.category}
          </Text>

          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>

          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>

          <Text style={styles.price} numberOfLines={1}>
            {`${product.price}$`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    marginHorizontal: 8,
    paddingVertical: 15,
    paddingHorizontal: 8,
    backgroundColor: 'lightgrey',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 4,
  },
  category: {
    fontSize: 12,
    color: 'grey',
    marginBottom: 3,
  },
  title: {
    // flexShrink: 1,
    fontSize: 14,
    marginBottom: 3,
  },
  description: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 15,
  },
  price: {
    fontSize: 16,
    color: 'black',
    opacity: 0.7,
  },
  rightContainer: {
    flex: 1,
    // paddingRight: 100,
  },
});

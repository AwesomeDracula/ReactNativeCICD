import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { EntityId } from "@reduxjs/toolkit";
import { RouteName } from "common/constants";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import { fetchProducts, IProduct, productsSelectors } from "./productSlice";
import Crashes from "appcenter-crashes";
import Analytics from "appcenter-analytics";

const { width, height } = Dimensions.get("window");
const ProductDetail = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const { idProduct }: any = route.params;
  const product = useAppSelector((state) =>
    productsSelectors.selectById(state, idProduct)
  );

  useEffect(() => {
    checkPreviousSession();
  }, []);

  const checkPreviousSession = async () => {
    const didCrash = await Crashes.hasCrashedInLastSession();
    if (didCrash) {
      Alert.alert("Sorry about that crash, we're working on a solution");
    }
  };

  if (!product) {
    return <View />;
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }} bounces={false}>
      <View style={styles.container}>
        <Button title="Crash" onPress={() => Crashes.generateTestCrash()} />

        <Button
          title="Track Event"
          onPress={() => {
            Analytics.trackEvent("button_clicked");
            console.log("button_clicked");
          }}
        />
        <Image source={{ uri: product.image }} style={styles.image} />

        <View style={styles.rightContainer}>
          <Text style={styles.category} numberOfLines={1}>
            {product.category}
          </Text>

          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>

          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.price} numberOfLines={1}>
            {`${product.price}$`}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // marginHorizontal: 8,
    // paddingVertical: 15,
    // paddingHorizontal: 8,
    paddingTop: 8,
    backgroundColor: "lightgrey",
  },
  image: {
    alignSelf: "center",
    width: "98%",
    height: height / 2.5,
    // marginRight: 8,
    borderRadius: 4,
  },
  category: {
    fontSize: 14,
    color: "grey",
    marginBottom: 3,
  },
  title: {
    // flexShrink: 1,
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "grey",
    marginBottom: 15,
  },
  price: {
    fontSize: 16,
    color: "black",
    opacity: 0.7,
  },
  rightContainer: {
    flex: 1,
    paddingHorizontal: 8,
    marginTop: 15,
    // paddingRight: 100,
  },
});

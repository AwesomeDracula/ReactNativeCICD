import counterReducer from '@features/counter/counterSlice';
import productReducer from '@features/product/productSlice';

const rootReducer = {
  counter: counterReducer,
  products: productReducer,
};

export default rootReducer;

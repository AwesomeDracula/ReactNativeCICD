import {
  createSlice,
  createEntityAdapter,
  configureStore,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {RootState, store} from '@app/store';
import {getProducts} from './productService';
import {normalize, schema} from 'normalizr';

export type IProduct = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

type IParamsProduct = {
  limit?: number;
};

type NormalizedObjects<T> = {
  [key: string]: T;
};

type INormalizeState = {
  products: NormalizedObjects<IProduct>;
};

// https://github.com/paularmstrong/normalizr
const productsEntity = new schema.Entity('products');
// const device = new schema.Entity('devices', {}, { idAttribute: 'custom_id_field' });
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: IParamsProduct, {rejectWithValue}) => {
    const {ok, data, problem, originalError} = await getProducts(params);
    if (ok && data) {
      const normalized = normalize<Array<IProduct>, INormalizeState>(data, [
        productsEntity,
      ]);

      // console.log('object', normalized);
      return normalized.entities;
    } else {
      return rejectWithValue('');
    }
  },
);

const productsAdapter = createEntityAdapter<IProduct>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: product => product.id,
  // Keep the "all IDs" array sorted based on book titles
  // sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState(),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    productAdded: productsAdapter.addOne,
    productsReceived(state, action: PayloadAction<{products: IProduct[]}>) {
      // Or, call them as "mutating" helpers in a case reducer
      productsAdapter.setAll(state, action.payload.products);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      productsAdapter.upsertMany(state, action.payload.products);
      // both `state` and `action` are now correctly typed
    });
  },
});

export const {productAdded, productsReceived} = productsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const productsSelectors = productsAdapter.getSelectors<RootState>(
  state => state.products,
);

// const allProducts = productsSelectors.selectAll(store.getState());
export default productsSlice.reducer;

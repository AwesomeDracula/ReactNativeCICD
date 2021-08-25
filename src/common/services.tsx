import {create} from 'apisauce';

export const BASE_URL = 'https://fakestoreapi.com/';
export const apiGlobal = create({
  baseURL: BASE_URL,
  timeout: 50000,
  // headers: baseHeader,
});

// Use this to add token ...
// apiGlobal.addAsyncRequestTransform(request => async () => {
//   await AsyncStorage.load('something');
// });

import {apiGlobal} from '@common/services';

const productUrl = 'products';

export const getProducts = (params: any) => {
  return apiGlobal.get(productUrl, params);
};

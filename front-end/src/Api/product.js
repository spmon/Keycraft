import axios from 'axios';
import { BACKEND_API as root } from './config'; 

class ProductApi {
  async getProductById(id) {
    return axios.get(root + `product/details/${id}`);
  }
  async getProductsByCategory(category) {
    return axios.get(root + `product/index/${category}`);
  }
}

export {
  ProductApi,
}
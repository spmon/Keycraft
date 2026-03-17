import axios from 'axios';
import { BACKEND_API as root } from './config.js';

class OrderApi {
  async createOrder(shipping_address, phone_number, products) {
    // products: [{
    //   id: String,
    //   quantity: Number,
    // }]
    return axios.post(root + 'order/create', {
      shipping_address: shipping_address,
      phone_number: phone_number,
      products: products
    });
  }
  
  async getOrders() {
    return axios.get(root + 'order/index');
  }
  
  async deleteOrder(id) {
    //delete order theo id
    return axios.delete(root + `order/delete/${id}`);
  }
}

export {
  OrderApi
}
import axios from 'axios';
import { BACKEND_API as root } from './config';

class UserApi {
  async update(phone_number, address) {
    let payload = {};
    if (phone_number) {
      payload.phone_number = phone_number;
    }
    if (address) {
      payload.address = address;
    }
    return axios.patch(root + 'user/update', payload);
  } 
  async updatePassword(newPassword, oldPassword) {
    return axios.patch(root + 'user/updatePassword', {
      old_password: oldPassword,
      new_password: newPassword
    });
  }
  
  async getUser() {
    const jwt  = localStorage.getItem("jwt")
    return axios.get(root + 'user/retrieve', {
        headers: {
          Token: jwt
        }      
    });
  }
}

export {
  UserApi
}
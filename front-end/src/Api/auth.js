import axios from 'axios';
import { BACKEND_API as root } from "./config.js";

class AuthApi {
  async register(email, username, password) {
    return axios
    .post(root + "auth/register", {
      email: email,
      username: username,
      password: password
    })
    .catch(function(error){
      console.log(error.toJSON());
    });
  }
  
  async login(username, password) {
    return axios.post(root + "auth/login", {
      username: username,
      password: password    
    }).catch(function(error){
      console.log(error.toJSON());
    });
  }
  
  async logout() {
    return axios.get(root + "auth/logout");
  }
}

export {
  AuthApi
}
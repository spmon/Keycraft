import axios from 'axios';
import { BACKEND_API as root } from "./config.js";

class ChatAPI {
    async sendMessage(message){
        return axios.post(
            root + 'chat/getResponse', {
                message: message
            }
        ).catch(function(error){
            console.log(error.toJSON());
        });
    }
}

export { ChatAPI };
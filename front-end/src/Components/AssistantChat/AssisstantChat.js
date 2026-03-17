import AssisstantIcon from "../Assets/ic_assistant.png";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChatAPI } from "../../Api/chat.js";
import { useAuth } from "../../Context/auth.js";
import './AsssisstantChat.css';

export const AssisstantChat = () => {
  const [action, setAction] = useState("Closed");
  const [displayMessages, setDisplayMessages] = useState([{user: "Bot", message:"Chào bạn, tôi có thể giúp gì?"}]);
  const [ auth, setAuth ] = useAuth();
  const [loading, setLoading] = useState(false);
  const chatAPI = new ChatAPI();
  const _buildMessages = []
  const chatScreen = useRef(null);

  useEffect(() => {
    if (chatScreen.current) {
      chatScreen.current.scrollTop = chatScreen.current.scrollHeight;
    }
  }, [displayMessages])

  function handleSendMessage(event){
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    if(data.message === "") return;
    setDisplayMessages(prevMessages => [
      ...prevMessages,
      {
        user: "User",
        message: data.message
      }
    ]);
    handleResponse(data.message)
    setLoading(true);
    event.target.reset();
  }
  
  async function handleResponse(message){
    try{
      const res = await chatAPI.sendMessage(message).then(res => {
        setLoading(false);
        setDisplayMessages(prevMessages => [
          ...prevMessages,
          {
            user: "Bot",
            message: res.data.response
          }
        ]);
      })
    }catch(error){
      setLoading(false);
      setDisplayMessages([...displayMessages, {
        user: "Bot",
        message: "Đã có lỗi. Xin vui lòng thử lại sau."
      }]);
    }
  }
  
  for(let i = 0; i < displayMessages.length; i++){
    if(displayMessages[i].user == "Bot"){
      _buildMessages.push(
        <div style={{marginLeft: "10px"}} className="message-item">
          <p className="sender-name">Trợ lý AI Keycraft</p>
          <div style={{backgroundColor:"#6d7dda"}} className="message-bubble">
            <p>{displayMessages[i].message}</p>
          </div>
        </div>)
    }
    else{
      _buildMessages.push(
        <div style={{
          alignItems:"end",
          marginRight:"10px"
        }} className="message-item">
          <p className="sender-name">{auth.user === null ? "Người dùng" : auth.user.name}</p>
          <div style={{backgroundColor:"#db6d63"}} className="message-bubble">
            <p>{displayMessages[i].message}</p>
          </div>
        </div>)
    }
  }
  
  return (
    <div className="assisstant-area">
        {
          (action === "Open") ? 
          <motion.div className="chat-window">
            <div className="upper-bar">
                <p>Chatbox trợ lý ảo</p>
                <a onClick={()=>{setAction("Closed")}}>x</a>
            </div>
            <div className="chat-screen" ref={chatScreen} >
              {_buildMessages}
              { loading && 
                <div style={{marginLeft: "10px"}} className="message-item">
                  <p className="sender-name">Trợ lý AI Keycraft</p>
                  <div style={{backgroundColor:"#6d7dda", padding:"10px"}} className="message-bubble">
                    <div className="loader"></div>
                  </div>
                </div>
              }
            </div>
            <form onSubmit={handleSendMessage}>
                <div className="text-field">
                  <input name="message" datatype="text-field" /> 
                </div>
                <button disabled={loading}>Gửi</button>
            </form>
          </motion.div> :

          <motion.div whileHover={{scale: 1.2}} className="bubble">
              <a onClick={()=>{setAction("Open")}}>
                <motion.div className="bubble-icon-bg"> 
                  <motion.img whileHover={{scale: 1.2}}
                    src={AssisstantIcon} /> 
                </motion.div>
              </a>
          </motion.div>
        }
    </div>
  )
}

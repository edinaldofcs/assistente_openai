import React from "react";
import "./ChatMessage.css";
import { Avatar } from "../../assets/Avatar";
import { MarkdownRenderer} from "../../assets/MarkdownRenderer";

export const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === 'gpt' ? 'chatgpt': 'user'}`}>
      <div className="chat-message-center">
        <div className={`avatar${message.user === 'gpt' && '-chatgpt'}`}>

          {message.user === 'gpt' && (
            <Avatar size="3rem"/>
          )}
        </div>
   
        {<MarkdownRenderer markdownText={message.message} className="message"/>}
        {/* <div className="message">{message.message}</div> */}
      </div>
    </div>
  );
};

import React, { useRef, useState } from "react";
import "./Chat.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Conversation, SearchSection, NavIcons, ChatBox } from "@/components";
import { userChats } from "@/apis/chat";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef<any>();
  const { user } = useSelector((state: any) => state.auth.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users: any) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("recieve-message", (data: any) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat: any) => {
    const chatMember = chat.members.find((member: any) => member !== user._id);
    const online = onlineUsers.find((user: any) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="chat">
      <div className="left-side-chat">
        <SearchSection />
        <div className="chat-container">
          <h2>Chats</h2>
          <div className="chat-list">
            {chats.map((chat, i) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
                key={i}
              >
                <Conversation data={chat} currentUser={user._id} online={checkOnlineStatus(chat)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;

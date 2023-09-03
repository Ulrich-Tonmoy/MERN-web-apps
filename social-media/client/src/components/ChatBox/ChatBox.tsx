/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRef } from "react";
import "./ChatBox.css";
import RelativeTime from "@yaireo/relative-time";
import InputEmoji from "react-input-emoji";
import { getUser } from "@/apis/user";
import { addMessage, getMessages } from "@/apis/message";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }: any) => {
  const [userData, setUserData] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>("");

  const relativeTime = new RelativeTime();

  const handleChange = (newMessage: any) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    const userId = chat?.members?.find((id: any) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: any) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id: any) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const scroll = useRef<any>();
  const imageRef = useRef<any>();
  return (
    <>
      <div className="chatbox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? import.meta.env.VITE_PUBLIC_FOLDER + userData.profilePicture
                        : "/profile-default.png"
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            <div className="chat-body">
              {messages.map((message: any, i: number) => (
                <div
                  ref={scroll}
                  className={message.senderId === currentUser ? "message own" : "message"}
                  key={i}
                >
                  <span>{message.text}</span>
                  <span>
                    {relativeTime.from(
                      message?.createdAt ? new Date(message.createdAt) : new Date(Date.now()),
                    )}
                  </span>
                </div>
              ))}
            </div>
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
              <input type="file" name="" id="" style={{ display: "none" }} ref={imageRef} />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">Tap on a chat to start conversation...</span>
        )}
      </div>
    </>
  );
};

export default ChatBox;

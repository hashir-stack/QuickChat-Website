import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]); // messages for the selected user
  const [users, setUsers] = useState([]); // list of users in sidebar
  const [selectedUser, setSelectedUser] = useState(null); // current chat target
  const [unseenMessages, setUnseenMessages] = useState({});

  const { axios, socket } = useContext(AuthContext);

  // get all users
  const getUsers = async () => {
    try {
      const { data } = await axios.get("api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages || {});
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // get messages from selected user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
        // clear unseen count for this user immediately
        setUnseenMessages((prev) => ({
          ...prev,
          [userId]: 0,
        }));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // send message to selected user
  const sendMessage = async (messageData) => {
    try {
      if (!selectedUser?._id) return;

      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );

      if (data.success) {
        setMessages((prev) => {
          const exists = prev.some((m) => m._id === data.newMessage._id);
          return exists ? prev : [...prev, data.newMessage];
        });

        // reset unseen count for this user
        setUnseenMessages((prev) => ({
          ...prev,
          [selectedUser._id]: 0,
        }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // subscribe to new messages
  const subscribeToMessages = () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      // if the message involves the selected user (either sender or receiver)
      if (
        selectedUser &&
        (newMessage.senderId === selectedUser._id ||
          newMessage.receiverId === selectedUser._id)
      ) {
        // mark as seen if it’s from the other user
        if (newMessage.senderId === selectedUser._id) {
          newMessage.seen = true;
          axios.put(`/api/messages/mark/${newMessage._id}`);
        }
        setMessages((prev) => [...prev, newMessage]);
        // clear unseen count if chat is open
        setUnseenMessages((prev) => ({
          ...prev,
          [selectedUser._id]: 0,
        }));
      } else {
        // otherwise increment unseen count
        setUnseenMessages((prev = {}) => ({
          ...prev,
          [newMessage.senderId]: (prev?.[newMessage.senderId] || 0) + 1,
        }));
      }
    });
  };

  // unsubscribe
  const unsubscribeFromMessage = () => {
    if (socket) socket.off("newMessage");
  };

  // subscribe once when socket is available
  useEffect(() => {
    if (socket) {
      unsubscribeFromMessage();
      subscribeToMessages();
    }
    return () => unsubscribeFromMessage();
  }, [socket]); // only depend on socket

  const value = {
    messages,
    users,
    selectedUser,
    setSelectedUser,
    getUsers,
    setMessages,
    sendMessage,
    unseenMessages,
    setUnseenMessages,
    getMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

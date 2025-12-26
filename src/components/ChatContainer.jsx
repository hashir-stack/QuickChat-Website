import { useContext, useEffect, useRef, useState } from "react";
import { LuBadgeInfo } from "react-icons/lu";
import { IoMdArrowBack } from "react-icons/io";
import { GrGallery } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
import LogoImg from "../assets/quickchatLogo.webp";
// import UserImage from "../assets/profileIcon.png";
import { formatMessageTime } from "../lib/utils";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const { authUser, onlineUsers, socket } = useContext(AuthContext);
  const {
    setMessages,
    messages,
    selectedUser,
    setSelectedUser,
    sendMessage,
    getMessages,
    unseenMessages,
    setUnseenMessages
  } = useContext(ChatContext);

  const [input, setInput] = useState("");
  const scrollEnd = useRef();

  // fetch messages when user changes
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);

      // clear unseen count for this user in local state
      // assuming you have setUnseenMessages in ChatContext
      if (unseenMessages && unseenMessages[selectedUser._id] > 0) {
        setUnseenMessages((prev) => ({
          ...prev,
          [selectedUser._id]: 0,
        }));
      }
    }
  }, [selectedUser]);

  // scroll to bottom when messages change
  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // only append if it's for the currently selected chat
      if (
        newMessage.senderId === selectedUser?._id ||
        newMessage.receiverId === selectedUser?._id
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser, setMessages]);

  // send text message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendMessage({ text: input.trim(), receiverId: selectedUser?._id });
    setInput("");
  };

  // send image message
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an Image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  return selectedUser ? (
    <div className="invisible-scrollbar h-full overflow-scroll relative backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <IoMdArrowBack
          onClick={() => setSelectedUser(null)}
          className="md:hidden max-w-7"
        />
        <img
          src={selectedUser?.profilePic || "/profileIcon.png"}
          alt="profilePic"
          className="w-8 rounded-full aspect-square object-cover"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser?.fullName}
          {onlineUsers?.includes(selectedUser?._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
          {/* {unseenMessages?.[selectedUser?._id] || 0} */}
        </p>
        <LuBadgeInfo className="max-md:hidden max-w-5" />
      </div>

      {/* Chat Area */}
      <div className="invisible-scrollbar flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messages?.map((msg) => (
          <div
            key={msg._id}
            className={`flex items-end gap-2 justify-end ${
              authUser && msg.senderId !== authUser._id
                ? "flex-row-reverse"
                : ""
            }`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                alt=""
                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                  msg.senderId === authUser?._id
                    ? "rounded-br-none"
                    : "rounded-bl-none"
                }`}
              >
                {msg.text}
              </p>
            )}

            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === authUser?._id
                    ? authUser?.profilePic || "/profileIcon.png"
                    : selectedUser?.profilePic || "/profileIcon.png"
                }
                alt=""
                className="w-4 aspect-square rounded-full object-cover"
              />
              <p className="text-gray-500">
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Bottom Input */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            type="text"
            placeholder="Send Message..."
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
          />
          <input
            onChange={handleSendImage}
            type="file"
            accept="image/png,image/jpeg"
            id="image"
            hidden
          />
          <label htmlFor="image">
            <GrGallery className="w-5 mr-2 cursor-pointer" />
          </label>
        </div>
        <IoIosSend
          className="w-7 cursor-pointer bg-violet-500 rounded-full p-1"
          fontSize={24}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={"/quickchatLogo.webp"} alt="Logo Icon" className="max-w-44 animate-bounce transition-all duration-300" />
      <p className="text-lg font-medium text-white">Chat AnyTime , Anywhere</p>
    </div>
  );
};

export default ChatContainer;

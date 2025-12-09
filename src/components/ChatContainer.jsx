import { useEffect, useRef } from 'react'
import { LuBadgeInfo } from "react-icons/lu";
import { IoMdArrowBack } from "react-icons/io";;
import { GrGallery } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
import LogoImg from "../assets/quickchatLogo.webp";
import { formatMessageTime } from '../lib/utils';

const dummyUser = [
  {
    id: 1,
    email: "alice.smith@example.com",
    fullname: "Alice Smith",
    profilepic: "https://randomuser.me/api/portraits/women/1.jpg",
    bio: "Frontend developer passionate about creating intuitive user interfaces.",
  },
  {
    id: 2,
    email: "john.doe@example.com",
    fullname: "John Doe",
    profilepic: "https://randomuser.me/api/portraits/men/2.jpg",
    bio: "Backend engineer specializing in Node.js and scalable APIs.",
  },
  {
    id: 3,
    email: "emma.jones@example.com",
    fullname: "Emma Jones",
    profilepic: "https://randomuser.me/api/portraits/women/3.jpg",
    bio: "UI/UX designer focused on accessibility and user-centered design.",
  },
  {
    id: 4,
    email: "michael.brown@example.com",
    fullname: "Michael Brown",
    profilepic: "https://randomuser.me/api/portraits/men/4.jpg",
    bio: "Full-stack developer with a love for solving complex problems.",
  },
  {
    id: 5,
    email: "sophia.wilson@example.com",
    fullname: "Sophia Wilson",
    profilepic: "https://randomuser.me/api/portraits/women/5.jpg",
    bio: "Digital marketer exploring the intersection of technology and storytelling.",
  },
];

const dummyMessages = [
  {
    _id: "msg1",
    senderId: "680f5116f10fc3cd28382ed02",
    receiverId: "680f5115f10fc3cd2937ed01",
    text: "Hey, how are you?",
    seen: true,
    createdAt: "2025-12-01T09:15:00Z"
  },
  {
    _id: "msg2",
    senderId: "680f5116f10fc3cd28382ed02",
    receiverId: "680f5115f10fc3cd2937ed01",
    text: "I'm working on the new project right now.",
    seen: false,
    createdAt: "2025-12-01T09:20:00Z"
  },
  {
    _id: "msg3",
    senderId: "680f5116f10fc3cd28382ed02",
    receiverId: "680f5115f10fc3cd2937ed01",
    text: "Did you check the latest updates?",
    seen: true,
    createdAt: "2025-12-01T09:25:00Z"
  },
  {
    _id: "msg4",
    senderId: "680f5116f10fc3cd28382ed02",
    receiverId: "680f5115f10fc3cd2937ed01",
    text: "Yes, everything looks good so far.",
    seen: true,
    createdAt: "2025-12-01T09:30:00Z"
  },
  {
    _id: "msg5",
    senderId: "680f5116f10fc3cd28382ed02",
    receiverId: "680f5115f10fc3cd2937ed01",
    text: "Let's schedule a call later today.",
    seen: false,
    createdAt: "2025-12-01T09:45:00Z"
  },
  {
    _id: "msg6",
    senderId: "680f5116f10fc3cd28382ed02",
    receiverId: "680f5115f10fc3cd2937ed01",
    text: "Sure, what time works best for you?",
    seen: true,
    createdAt: "2025-12-01T09:50:00Z"
  },
  {
    _id: "msg7",
    senderId: "680f5116f10fc3cd28382ed02",
    receiverId: "680f5115f10fc3cd2937ed01",
    text: "Around 3 PM should be fine.",
    seen: false,
    createdAt: "2025-12-01T10:00:00Z"
  },
  {
    _id: "msg8",
    senderId: "680f5116f10fc3cd28382ed02",
    receiverId: "680f5115f10fc3cd2937ed01",
    text: "Okay, I'll send you the meeting link.",
    seen: true,
    createdAt: "2025-12-01T10:05:00Z"
  },
  {
    _id: "msg9",
    senderId: "680f5116f10fc3cd28382ed02",
    receiverId: "680f5115f10fc3cd2937ed01",
    text: "Thanks, talk to you then!",
    seen: true,
    createdAt: "2025-12-01T10:10:00Z"
  },
  {
    _id: "msg10",
    senderId: "680f5116f10fc3cd28382ed02",
    receiverId: "680f5115f10fc3cd2937ed01",
    text: "Don't forget to review the document before the call.",
    seen: false,
    createdAt: "2025-12-01T10:15:00Z"
  }
];

const ChatContainer = ({ selectedUser, setSelectedUser }) => {

  const scrollEnd = useRef();

  useEffect(()=>{
    if(scrollEnd.current){
      scrollEnd.current.scrollIntoView({behavior: "smooth"});
    }
  },[]);

  return selectedUser ? (
    <div className='invisible-scrollbar h-full overflow-scroll relative backdrop-blur-lg'>
      {/* Header area */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <IoMdArrowBack 
        onClick={()=>setSelectedUser(null)}
        className='md:hidden max-w-7' />
        <img src={dummyUser[0].profilepic} alt="profilePic" className='w-8 rounded-full' />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>{dummyUser[0].fullname}
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </p>
        <LuBadgeInfo 
        className='max-md:hidden max-w-5' />
      </div>
      {/* Chat Area */}
      <div className='invisible-scrollbar flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {dummyMessages.map((msg,index)=>(
          <div 
          key={index} 
          className={`flex items-end gap-2 justify-end ${msg.senderId !== '680f5116f10fc3cd28382ed02' && 'flex-row-reverse'}`}>
            {msg.image ? (
              <img 
              src={msg.image} 
              alt=""
              className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8'
              />
            ) : (
              <p
              className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === '680f5116f10fc3cd28382ed02' ? 'rounded-br-none':'rounded-bl-none'}`}
              >{msg.text}</p>
            )}

            <div className='text-center text-xs'>
              <img 
              src={msg.senderId === '680f5116f10fc3cd28382ed02' ? `${dummyUser[0].profilepic}` : `${dummyUser[0].profilepic}`}
              alt="" 
              className='w-4 rounded-full'
              />
              <p className='text-gray-500'>{formatMessageTime(msg.createdAt) }</p>
            </div>
          </div>
        ))}

        <div ref={scrollEnd}></div>
      </div>

      {/* bottom Area */}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
          <input type="text" placeholder='Send Message...'
          className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400'/>
          <input type="file" accept='image/png,image/jpeg' id="image" hidden />
          <label htmlFor="image">
            <GrGallery className='w-5 mr-2 cursor-pointer' />
          </label>
        </div>
        <IoIosSend className='w-7 cursor-pointer bg-violet-500 rounded-full p-1' fontSize={24} />
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={LogoImg} alt="Logo Icon" className='max-w-44' />
      <p className='text-lg font-medium text-white'>Chat AnyTime , Anywhere</p>
    </div>
  )
}

export default ChatContainer;
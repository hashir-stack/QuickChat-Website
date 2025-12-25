import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import UserImage from "../assets/profileIcon.png"

const RightSideBar = () => {

  const{selectedUser,messages} = useContext(ChatContext);
  const{logout,onlineUsers} = useContext(AuthContext);
  const [msgImage,setMsgImage] = useState([]);

  // get all the images from the messages and set them to state
  useEffect(()=>{
    setMsgImage(
      messages.filter(msg=>msg.image).map(msg=>msg.image)
    )
  },[messages])

//   const dummyImages = [
//   {
//     _id: "img1",
//     imageUrl: "https://picsum.photos/id/101/400/400"
//   },
//   {
//     _id: "img2",
//     imageUrl: "https://picsum.photos/id/102/400/400"
//   },
//   {
//     _id: "img3",
//     imageUrl: "https://picsum.photos/id/103/400/400"
//   },
//   {
//     _id: "img4",
//     imageUrl: "https://picsum.photos/id/104/400/400"
//   },
//   {
//     _id: "img5",
//     imageUrl: "https://picsum.photos/id/105/400/400"
//   },
//   {
//     _id: "img6",
//     imageUrl: "https://picsum.photos/id/106/400/400"
//   },
//   {
//     _id: "img7",
//     imageUrl: "https://picsum.photos/id/107/400/400"
//   },
//   {
//     _id: "img8",
//     imageUrl: "https://picsum.photos/id/108/400/400"
//   },
//   {
//     _id: "img9",
//     imageUrl: "https://picsum.photos/id/109/400/400"
//   },
//   {
//     _id: "img10",
//     imageUrl: "https://picsum.photos/id/110/400/400"
//   }
// ];

  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white w-full relative invisible-scrollbar overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light    mx-auto'>
          <img src={selectedUser.profilePic || UserImage} alt="profile Pic" className='w-20 aspect-square rounded-full object-cover' />
          <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
          {onlineUsers.includes(selectedUser?._id) && <p className='w-2 h-2 rounded-full bg-green-500'></p>}
          {selectedUser.fullName}</h1>
          <p className='px-10 mx-auto'>{selectedUser.bio}</p>
      </div>

      <hr className='border-[#fffff50] my-4'/>

      <div className='px-5 text-xs'>
        <p>Media</p>
        <div className='invisible-scrollbar mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80 mb-2'>
          {
            msgImage.map((url,index)=>(
              <div key={index} className='cursor-pointer rounded p-2 ' onClick={()=>window.open(url)}>
                <img src={url} alt="" className='h-full rounded-md' />
              </div>
            ))
          }
        </div>
      </div>

      <button onClick={()=>logout()} className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default RightSideBar;
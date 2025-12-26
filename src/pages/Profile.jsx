import React, { useContext, useState } from 'react'
import ProfileIcon from "../assets/profileIcon.png";
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/quickChatLogo.webp";
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {

  const {authUser,updateProfile} = useContext(AuthContext);

  const [selectedImg,setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name,setName] = useState(authUser.fullName);
  const [bio,setBio] = useState(authUser.bio);

  // submit function
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!selectedImg){
      await updateProfile({fullName:name,bio});
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload=async () =>{
      const base64Image = reader.result;
      await updateProfile({profilePic:base64Image,fullName:name,bio});
      navigate("/");
    }
    
  }
  

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        {/* left-side area */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 flex-1 p-10'>
          <p className='text-lg'>Profile Details</p>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input 
            id='avatar'
            type="file" 
            accept='.png, .jpg, .jpeg'
            hidden
            onChange={(e)=>setSelectedImg(e.target.files[0])}
            />
            <img src={selectedImg ? URL.createObjectURL(selectedImg) : "/profileIcon.png"} alt="" className={`w-12 h-12 ${selectedImg && 'rounded-full'}`} />
            Upload Profile Image
          </label>

          <input 
          type="text" 
          required
          placeholder='Your Name'
          className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />

          <textarea
          required
          placeholder='Write Profile Bio...'
          className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
          rows={4}
          value={bio}
          onChange={(e)=>setBio(e.target.value)}
          ></textarea>

          <button type='submit' className='bg-linear-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'>Save</button>
        </form>

        {/* right-side area */}
        <img src={authUser?.profilePic||Logo} className={`max-w-64 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg && 'rounded-full'}`}/>
      </div>
      
    </div>
  )
}

export default Profile;
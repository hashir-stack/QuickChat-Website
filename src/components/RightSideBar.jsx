import React from 'react'

const RightSideBar = ({ selectedUser }) => {

  const dummyImages = [
  {
    _id: "img1",
    imageUrl: "https://picsum.photos/id/101/400/400"
  },
  {
    _id: "img2",
    imageUrl: "https://picsum.photos/id/102/400/400"
  },
  {
    _id: "img3",
    imageUrl: "https://picsum.photos/id/103/400/400"
  },
  {
    _id: "img4",
    imageUrl: "https://picsum.photos/id/104/400/400"
  },
  {
    _id: "img5",
    imageUrl: "https://picsum.photos/id/105/400/400"
  },
  {
    _id: "img6",
    imageUrl: "https://picsum.photos/id/106/400/400"
  },
  {
    _id: "img7",
    imageUrl: "https://picsum.photos/id/107/400/400"
  },
  {
    _id: "img8",
    imageUrl: "https://picsum.photos/id/108/400/400"
  },
  {
    _id: "img9",
    imageUrl: "https://picsum.photos/id/109/400/400"
  },
  {
    _id: "img10",
    imageUrl: "https://picsum.photos/id/110/400/400"
  }
];

  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light    mx-auto'>
          <img src={selectedUser.profilepic} alt="profile Pic" className='w-20 aspect-square rounded-full' />
          <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
          <p className='w-2 h-2 rounded-full bg-green-500'></p>
          {selectedUser.fullname}</h1>
          <p className='px-10 mx-auto'>{selectedUser.bio}</p>
      </div>

      <hr className='border-[#fffff50] my-4'/>

      <div className='px-5 text-xs'>
        <p>Media</p>
        <div className='invisible-scrollbar mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80 mb-2'>
          {
            dummyImages.map((url,index)=>(
              <div key={index} className='cursor-pointer rounded p-2 ' onClick={()=>window.open(url)}>
                <img src={url.imageUrl} alt="" className='h-full rounded-md' />
              </div>
            ))
          }
        </div>
      </div>

      <button className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default RightSideBar;
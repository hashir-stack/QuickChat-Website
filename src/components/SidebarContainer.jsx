import { useNavigate } from "react-router-dom";
import Logo from "../assets/quickChatLogo.webp";
import { TiThMenu } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";

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

const SidebarContainer = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`invisible-scrollbar bg-[#8185B2]/10 h-full overflow-y-scroll p-5 rounded-r-xl text-white ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      <div className="pb-5">
        {/* Logo and menu */}
        <div className="flex justify-between items-center">
          <img src={Logo} alt="logo" className="max-w-10" />
          <span className="font-semibold text-center">Quick Chat</span>
          <div className="relative py-2 group">
            <TiThMenu fontSize={32} className="max-h-5 cursor-pointer" />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-gray-600 border border-gray-600 text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p className="cursor-pointer text-sm">Logout</p>
            </div>
          </div>
          {/* Menu toggle */}
          {/* <div className="relative py-2">
            <TiThMenu
              fontSize={32}
              className="max-h-5 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-gray-600 border border-gray-600 text-gray-100">
                <p
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer text-sm"
                >
                  Edit Profile
                </p>
                <hr className="my-2 border-t border-gray-500" />
                <p className="cursor-pointer text-sm">Logout</p>
              </div>
            )}
          </div> */}
        </div>

        {/* search section */}
        <div className="bg-gray-500 rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          <FaSearch className="w-3" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
            placeholder="Search User..."
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {dummyUser.map((user, index) => (
          <div
            key={user.id}
            onClick={() => {
              setSelectedUser(user);
            }}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
              selectedUser?.id === user.id && "bg-[#282142]/50"
            }`}
          >
            {user?.profilepic ? (
              <img
                src={user.profilepic}
                alt="Profile Pic"
                className="w-[45px] aspect-square rounded-full"
              />
            ) : (
              <RxAvatar className="w-[45px] h-[45px]" />
            )}

            <div className="flex flex-col leading-5">
              <p>{user?.fullname}</p>
              {index < 3 ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-neutral-400 text-xs">Offline</span>
              )}
            </div>

            {index > 2 && (
              <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                {index}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarContainer;

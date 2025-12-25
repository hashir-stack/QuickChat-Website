import { useContext, useState } from "react"
import Logo from "../assets/quickChatLogo.webp";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {

  const[currentState,setCurrentState] = useState("Sign Up");
  const[fullName,setFullName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[bio,setBio]=useState("");
  const[isDataSubmitted,setIsDataSubmitted]=useState(false);

  const {login} = useContext(AuthContext);

  // Submit Function
  const onSubmitHandler = (e)=>{
    e.preventDefault();
    if(currentState === "Sign Up" && !isDataSubmitted){
      setIsDataSubmitted(true);
      return;
    }

    login(currentState === "Sign Up" ? "signup" : "login",{fullName,email,bio,password})
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* left side */}
      <div>
        <img src={Logo} alt="Logo" className="w-[min(30vw,250px)] animate-bounce transition-all duration-300"/>
        <p className="py-3 px-2 text-center text-5xl font-medium">Quick Chat</p>
      </div>
      
      

      {/* right side */}
     <form 
     onSubmit={onSubmitHandler}
     className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg">
        <h2 className="font-medium texl-2xl flex justify-between items-center">{currentState}
          {isDataSubmitted && <MdKeyboardArrowLeft fontSize={24} className="w-5 cursor-pointer" onClick={()=>setIsDataSubmitted(false)} />}
          
      </h2>
        
        {currentState === "Sign Up" && !isDataSubmitted && (
          <input 
          type="text" 
          className="p-2 border border-gray-500 rounded-md focus:outline-none"
          placeholder="Full Name"
          required
          value={fullName}
          onChange={(e)=>setFullName(e.target.value)}
          />
        )}

        {!isDataSubmitted && (
          <>
          <input 
          type="email"
          className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <input 
          type="password"
          className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter Password"
          required
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          </>
        )}

        {currentState === "Sign Up" && isDataSubmitted &&(
          <textarea 
          rows={4}
          className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Provide a Short Bio..."
          required
          value={bio}
          onChange={(e)=>setBio(e.target.value)}
          ></textarea>
        )}

        <button
        className="py-3 bg-linear-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
        type="submit"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" required/>
          <p>Agree to the terms of use & privacy policy .</p>
        </div>

        <div className="flex flex-col gap-2">
          {currentState === "Sign Up" ? (
            <p className="text-sm text-gray-500">
              Already have an account ?
              <span 
              onClick={()=>{setCurrentState("Login"); setIsDataSubmitted(false)}}
              className="font-medium text-violet-500 cursor-pointer"> Login Here</span>
            </p>
          ) 
          : (
            <p className="text-sm text-gray-500">
              Create an Account 
              <span 
              onClick={()=>setCurrentState("Sign Up")}
              className="font-medium text-violet-500 cursor-pointer"> Click Here</span>
            </p>
          )}
        </div>

     </form>
    </div>
  )
}

export default Login;
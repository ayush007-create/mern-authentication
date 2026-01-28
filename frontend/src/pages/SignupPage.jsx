import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '../components/Input'
import { FaRegUser } from "react-icons/fa";
import { MdLock, MdOutlineMailOutline } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { TbLockCheck } from "react-icons/tb";
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import useAuthStore from '../store/AuthStore';
import { LuLoader } from 'react-icons/lu';

function SignupPage() {
  const [email,setEmail]=useState('')
  const [username,setUsername]=useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const {signup,error,isLoading} = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signup(email,password,username)
      navigate("/verify-email")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <motion.div
     initial={{opacity:0,y:20}}
     animate={{opacity:100,y:0}}
     transition={{duration:0.5}}
     className='max-w-md w-full bg-blue-800/30 shadow-xl rounded-2xl 
     backdrop-blur-3xl'
    >
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-2 bg-gradient-to-r text-center from-pink-500 to-blue-400 text-transparent bg-clip-text'>Create Account</h2>
        <form onSubmit={handleSubmit} className='p-5'>
         <Input 
         icon={FaRegUser}
         value={username}
         onChange={(e)=>{setUsername(e.target.value)}}
         type="text"
         placeholder="Full Name"
         />
         <Input 
         icon={MdOutlineMailOutline}
         type="email"
         value={email}
         onChange={(e)=>{setEmail(e.target.value)}}
         placeholder="Email Address"
         />
         <Input 
         icon={MdLock}
         type="password"
         value={password}
         onChange={(e)=>{setPassword(e.target.value)}}
         placeholder="Password"
         />
         {error && <p className='text-sm font-semibold text-red-400 mt-2'>{error}</p>}
         <PasswordStrengthMeter pass={password}/>
         <motion.button className='w-full rounded-lg bg-gradient-to-r from-pink-500 via-purple-600
           to-blue-500 text-xl text-white font-bold py-2 cursor-pointer hover:from-blue-500
           hover:to-pink-500 hover:via-purple-500 transition-colors duration-700'
           whileHover={{scale:1.04}}
           whileTap={{scale:0.98}}
           type='submit'
           disabled={isLoading}
           >{isLoading ? (<LuLoader className='animate-spin size-5 mx-auto text-white'/>):"Sign Up"}</motion.button>
        </form>
      </div>
      <div className='w-full py-3 flex items-center justify-center gap-1 bg-blue-600/40 rounded-br-xl rounded-bl-xl'>
        <TbLockCheck className='size-5 text-white'/>
        <p className='text-xs font-light text-white'>Already have an account ?</p>
        <Link to={'/login'} className='text-xs text-blue-300 font-medium hover:underline'>Login</Link>
      </div>
    </motion.div>
  )
}

export default SignupPage

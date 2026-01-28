import { motion } from 'framer-motion'
import React from 'react'
import useAuthStore from '../store/AuthStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const DashboardPage = () => {
  const isLoading = false
  const navigate = useNavigate()
  const {logout} = useAuthStore()
  const handleLogout = async (e)=>{
    e.preventDefault()
    await logout()
    toast.success("Logged Out Successfully!")
    navigate("/login")
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
         <p className='mx-auto mt-2 mb-2 text-lg text-white'>Welcome Logged In</p>
         <motion.button onClick={handleLogout} className='w-full rounded-lg bg-gradient-to-r from-pink-500 via-purple-600
           to-blue-500 text-xl text-white font-bold py-2 cursor-pointer hover:from-blue-500
           hover:to-pink-500 hover:via-purple-500 transition-colors duration-700'
           whileHover={{scale:1.04}}
           whileTap={{scale:0.98}}
           type='submit'
           disabled={isLoading}
           >{isLoading ? (<LuLoader className='animate-spin size-5 mx-auto text-white'/>):"Logout"}</motion.button>
      </div>
    </motion.div>
  )
}

export default DashboardPage

import { motion } from 'framer-motion'
import React, { useState } from 'react'
import useAuthStore from '../store/AuthStore'
import { MdLock } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Input from '../components/Input'
import { TbLockPassword } from 'react-icons/tb'
import { LuLoader } from 'react-icons/lu'
const ResetPasswordPage = () => {
  const {isLoading,resetPass} =useAuthStore()
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const navigate = useNavigate()
  const {token} = useParams()
  const handleReset = async (e)=> {
    e.preventDefault()
    try {
        if(password!==confirmPassword){
            toast.error("Password doesn't match!")
            return 
        }
        await resetPass(token,password)
        toast.success("Password Reset Successfully!")
        setTimeout(() => {
            navigate("/login")
        }, 1000);
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
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
        <h2 className='text-3xl font-bold mb-2 bg-gradient-to-r text-center from-pink-500 to-blue-400 text-transparent bg-clip-text'>Reset Password</h2>
        <p className='text-center font-light mt-4 mb-2 text-gray-300 text-[0.8rem]'>Enter your new password</p>
        <form onSubmit={handleReset} className='p-5'>
        <Input
            icon={MdLock}
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Enter New Password"
            required
            />
        <Input
            icon={TbLockPassword}
            type="password"
            value={confirmPassword}
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
            placeholder="Confirm Password"
            required
            />
        <motion.button className='w-full rounded-lg bg-gradient-to-r from-pink-500 via-purple-600
        to-blue-500 text-xl text-white font-bold py-2 cursor-pointer hover:from-blue-500
        hover:to-pink-500 hover:via-purple-500 transition-colors duration-700'
        whileHover={{scale:1.04}}
        whileTap={{scale:0.98}}
        type='submit'
        disabled={isLoading}
        >{isLoading ? (<LuLoader className='animate-spin size-5 mx-auto text-white'/>):"Set New Password"}</motion.button>
        </form>
    </div>
    </motion.div>
  )
}

export default ResetPasswordPage

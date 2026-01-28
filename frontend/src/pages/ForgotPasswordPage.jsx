import React, { useState } from 'react'
import { MdOutlineMailOutline } from 'react-icons/md'
import useAuthStore from '../store/AuthStore'
import { motion } from 'framer-motion'
import Input from '../components/Input'
import { TbLockCheck } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { LuLoader, LuMailCheck } from 'react-icons/lu'

const ForgotPasswordPage = () => {
    const [email,setEmail]=useState('')
    const {isLoading,forgotPass} = useAuthStore()
    const [sent,Setsent]=useState(false)
    const handleForgot = async (e)=>{
       e.preventDefault()
       try {
        await forgotPass(email)
        toast.success("Reset email sent successfully!")
        Setsent(true)
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
        {!sent && (
            <div className='p-8'>
            <h2 className='text-3xl font-bold mb-2 bg-gradient-to-r text-center from-pink-500 to-blue-400 text-transparent bg-clip-text'>Forgot Password</h2>
            <p className='text-center font-light mt-4 mb-2 text-gray-300 text-[0.8rem]'>Enter your email address and we will send the reset link to your email address.</p>
            <form onSubmit={handleForgot} className='p-5'>
            <Input 
            icon={MdOutlineMailOutline}
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="Email Address"
            />
            <motion.button className='w-full rounded-lg bg-gradient-to-r from-pink-500 via-purple-600
            to-blue-500 text-xl text-white font-bold py-2 cursor-pointer hover:from-blue-500
            hover:to-pink-500 hover:via-purple-500 transition-colors duration-700'
            whileHover={{scale:1.04}}
            whileTap={{scale:0.98}}
            type='submit'
            disabled={isLoading}
            >{isLoading ? (<LuLoader className='animate-spin size-5 mx-auto text-white'/>):"Send Reset Link"}</motion.button>
            </form>
        </div>
        )}
        {sent && (
            <div className='p-8'>
            <h2 className='text-3xl font-bold mb-2 bg-gradient-to-r text-center from-pink-500 to-blue-400 text-transparent bg-clip-text'>Forgot Password</h2>
            <LuMailCheck className='size-14 text-blue-400 mx-auto mb-2 mt-3'/>
            <p className='text-center font-light mt-4 mb-2 text-gray-300 text-[0.8rem]'>
            If you have an account exists for {email},<br/> you will receive a password link shortly.</p>
        </div>
        )}
        <div className='w-full py-3 flex items-center justify-center gap-1 bg-blue-600/40 rounded-br-xl rounded-bl-xl'>
            <IoArrowBack className='size-5 text-white'/>
            <Link to={'/login'} className='text-sm hover:underline font-light text-white'>Back to Login</Link>
        </div>
    </motion.div>
  )
}

export default ForgotPasswordPage

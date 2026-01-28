import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { LuAsterisk, LuLoader } from "react-icons/lu";
import useAuthStore from '../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function VerifyEmail() {
  const [tray,setTray]= useState(['','','','','',''])
  const inputref1 = useRef(null)
  const inputref2 = useRef(null)
  const inputref3 = useRef(null)
  const inputref4 = useRef(null)
  const inputref5 = useRef(null)
  const inputref6 = useRef(null)

  const { error,isLoading,verifyEmail } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (val,loc)=>{
    if(val.length<=1){
        const updatedTray = [...tray]
        updatedTray[loc]=val
        setTray(updatedTray)
    }
    if(loc===0 && val.length===1){
        inputref1.current.blur()
        inputref2.current.focus()
    }
    if(loc===1 && val.length===1){
        inputref2.current.blur()
        inputref3.current.focus()
    }
    if(loc===2 && val.length===1){
        inputref3.current.blur()
        inputref4.current.focus()
    }
    if(loc===3 && val.length===1){
        inputref4.current.blur()
        inputref5.current.focus()
    }
    if(loc===4 && val.length===1){
        inputref5.current.blur()
        inputref6.current.focus()
    }
    if(loc===5 && val.length===1){
        inputref6.current.blur()
    }
  }
  const handlekeyDown = (val,loc)=>{
     if(loc===1 && val==="Backspace" && tray[1].length===0){
        inputref2.current.blur()
        inputref1.current.focus()
     }
     if(loc===2 && val==="Backspace" && tray[2].length===0){
        inputref3.current.blur()
        inputref2.current.focus()
     }
     if(loc===3 && val==="Backspace" && tray[3].length===0){
        inputref4.current.blur()
        inputref3.current.focus()
     }
     if(loc===4 && val==="Backspace" && tray[4].length===0){
        inputref5.current.blur()
        inputref4.current.focus()
     }
     if(loc===5 && val==="Backspace" && tray[5].length===0){
        inputref6.current.blur()
        inputref5.current.focus()
     }
  }
  const handleSubmit = async (e)=>{
     e.preventDefault()
     const verficationCode = tray.join("")
     try {
        await verifyEmail(verficationCode)
        navigate('/')
        toast.success("Verified Successfully!")
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
        <h2 className='text-3xl font-bold mb-2 bg-gradient-to-r text-center from-pink-500 to-blue-400 text-transparent bg-clip-text'>Verify Email</h2>
        <div className='p-3'> 
            <p className='text-sm text-pink-300 text-center'>Enter 6 digit code sent your email!</p>
        </div> 
        <form onSubmit={handleSubmit}>
            <div className='flex items-center justify-center p-3 gap-2'>
                <input ref={inputref1}
                onPaste={(e) => {
                    const pastedText = e.clipboardData.getData("text");
                    const ans = pastedText.slice(0,6)
                    const arr = ans.split("")
                    setTray(arr)
                    }} 
                onChange={(e)=>{handleChange(e.target.value,0)}} value={tray[0]} type='text' className='text-blue-300 bg-blue-900/20 text-lg font-black w-10 h-10 rounded-xl text-center focus:outline-0 focus:border-blue-300 focus:border-2 '/>
                <hr className='w-3 h-1 rounded-lg border-none opacity-90 bg-gray-800'></hr>
                <input ref={inputref2}
                onPaste={(e) => {
                    const pastedText = e.clipboardData.getData("text");
                    const ans = pastedText.slice(0,6)
                    const arr = ans.split("")
                    setTray(arr)
                    }}
                onKeyDown={(e)=>{handlekeyDown(e.key,1)}} onChange={(e)=>{handleChange(e.target.value,1)}} value={tray[1]} type='text' className='text-blue-300 bg-blue-900/20 text-lg font-black w-10 h-10 rounded-xl text-center focus:outline-0 focus:border-blue-300 focus:border-2 '/>
                <hr className='w-3 h-1 rounded-lg border-none opacity-90 bg-gray-800'></hr>
                <input ref={inputref3}
                onPaste={(e) => {
                    const pastedText = e.clipboardData.getData("text");
                    const ans = pastedText.slice(0,6)
                    const arr = ans.split("")
                    setTray(arr)
                    }}
                onKeyDown={(e)=>{handlekeyDown(e.key,2)}} onChange={(e)=>{handleChange(e.target.value,2)}} value={tray[2]} type='text' className='text-blue-300 bg-blue-900/20 text-lg font-black w-10 h-10 rounded-xl text-center focus:outline-0 focus:border-blue-300 focus:border-2 '/>
                <hr className='w-3 h-1 rounded-lg border-none opacity-90 bg-gray-800'></hr>
                <input ref={inputref4}
                onPaste={(e) => {
                    const pastedText = e.clipboardData.getData("text");
                    const ans = pastedText.slice(0,6)
                    const arr = ans.split("")
                    setTray(arr)
                    }}
                onKeyDown={(e)=>{handlekeyDown(e.key,3)}} onChange={(e)=>{handleChange(e.target.value,3)}} value={tray[3]} type='text' className='text-blue-300 bg-blue-900/20 text-lg font-black w-10 h-10 rounded-xl text-center focus:outline-0 focus:border-blue-300 focus:border-2 '/>
                <hr className='w-3 h-1 rounded-lg border-none opacity-90 bg-gray-800'></hr>
                <input ref={inputref5} 
                onPaste={(e) => {
                    const pastedText = e.clipboardData.getData("text");
                    const ans = pastedText.slice(0,6)
                    const arr = ans.split("")
                    setTray(arr)
                    }}
                onKeyDown={(e)=>{handlekeyDown(e.key,4)}} onChange={(e)=>{handleChange(e.target.value,4)}} value={tray[4]} type='text' className='text-blue-300 bg-blue-900/20 text-lg font-black w-10 h-10 rounded-xl text-center focus:outline-0 focus:border-blue-300 focus:border-2 '/>
                <hr className='w-3 h-1 rounded-lg border-none opacity-90 bg-gray-800'></hr>
                <input ref={inputref6} 
                onPaste={(e) => {
                    const pastedText = e.clipboardData.getData("text");
                    const ans = pastedText.slice(0,6)
                    const arr = ans.split("")
                    setTray(arr)
                    }}
                onKeyDown={(e)=>{handlekeyDown(e.key,5)}} onChange={(e)=>{handleChange(e.target.value,5)}} value={tray[5]} type='text' className='text-blue-300 bg-blue-900/20 text-lg font-black w-10 h-10 rounded-xl text-center focus:outline-0 focus:border-blue-300 focus:border-2 '/>
            </div>
            {error && <p className='text-sm font-semibold text-red-400 mt-2'>{error}</p>}
            <div className='p-3'>
                <button disabled={tray.every(ele=>ele!=='') ? false:true} className='w-full disabled:opacity-50 rounded-lg bg-gradient-to-r from-pink-500 via-purple-600
                to-blue-500 text-lg text-white font-bold py-2 cursor-pointer hover:from-blue-500
                hover:to-pink-500 hover:via-purple-500 transition-colors duration-700'
                type='submit'
                >{isLoading ? (<LuLoader className='animate-spin size-5 mx-auto text-white'/>):"Verify Email"}</button>
            </div>
        </form>   
    </div>
    </motion.div>
  )
}

export default VerifyEmail

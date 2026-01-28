import React from 'react'
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

function PasswordStrengthMeter({pass}) {
  const arr=[1,2,3,4,5]
  const passwordList = (password)=>{
    const criteria = [
		{ label: "At least 6 characters", met: password.length >= 6 },
		{ label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
		{ label: "Contains lowercase letter", met: /[a-z]/.test(password) },
		{ label: "Contains a number", met: /\d/.test(password) },
		{ label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
	];
    return (<div className='flex-col gap-2'>
      {criteria.map((e,j)=>(
        <div key={j} className={`flex items-center text-sm gap-2 ${e.met ? 'text-blue-300':'text-gray-300'}`}>
          {e.met ? <FaCheck/>:<IoClose/>}
          {e.label}
        </div>
      ))}
    </div>)
  }
  const StrengthMetervalue = (password)=>{
    let val = 0
    if(password.length>=6){
        val=val+1
    }
    if(/[A-Z]/.test(password)){
        val=val+1
    }
    if(/[a-z]/.test(password)){
        val=val+1
    }
    if(/\d/.test(password)){
        val=val+1
    }
    if(/[^A-Za-z0-9]/.test(password)){
        val=val+1
    }
    return val
  }
  const strength = StrengthMetervalue(pass)
  const getColor = (index)=>{
     if(strength===1 && index===0){
        return "#F87171"
     }else if(strength===2 && index<2){
        return "#FACC15"
     }else if(strength===3 && index<3){
        return "#EAB308"
     }else if(strength===4 && index<4){
        return "#4ADE80"
     }else if(strength===5){
        return "#16A34A"
     }else{
        return "#D1D5DB"
     }
  }
  const getPassStrength = ()=>{
    if(strength===1){
        return "Very Weak"
     }else if(strength===2){
        return "Weak"
     }else if(strength===3){
        return "Good"
     }else if(strength===4){
        return "Strong"
     }else if(strength===5){
        return "Very Strong"
     }else{
        return "Very Weak"
     }
  }
  return (
    <div className='w-full py-4'>
      <div className='w-full flex justify-between'>
        <p className='text-gray-400 font-medium text-xs'>Password Strength</p>
        <p className='text-gray-400 font-medium text-xs'>{getPassStrength(strength)}</p>
      </div>
      <div className='flex gap-1 py-2'>
        {arr.map((ele,i)=>(
            <div key={i} className={`w-28 h-[0.3rem] rounded-xl`} style={{background:getColor(i)}}></div>
        ))}
      </div>
      {passwordList(pass)}
    </div>
  )
}

export default PasswordStrengthMeter

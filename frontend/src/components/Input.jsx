import React from 'react'

function Input({icon:Icon,...props}) {
  return (
    <div className='w-full mb-4 py-2 bg-blue-900/20 hover:border-blue-300 hover:border transition-all duration-200 rounded-lg flex items-center'>
      <div className='w-[15%] flex justify-center gap-2 items-center pointer-events-none'>
        <Icon className='size-4.5 text-blue-300'/>
      </div>
      <input
        {...props}
        className='w-[85%] placeholder:text-blue-300 placeholder:opacity-50 text-blue-300 focus:ring-0 focus:border-none focus:outline-0'
      />
    </div>
  )
}

export default Input

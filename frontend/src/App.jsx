import { useEffect } from 'react'
import React from 'react'
import './App.css'
import FloatingShape from './components/floatingShape'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { ToastContainer } from 'react-toastify'
import { Routes , Route, Navigate } from "react-router-dom"
import VerifyEmail from './pages/VerifyEmail'
import useAuthStore from './store/AuthStore'
import DashboardPage from './pages/DashboardPage'
import { LuLoader } from 'react-icons/lu'
import LoadingSpinner from './components/LoadingSpinner'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

const ProtectedRoute = ({children})=>{
  const {isAuthenticated,user}=useAuthStore()

  if(!isAuthenticated){
    return <Navigate to="/login" replace />
  }
  if(user && !user.isVerified){
    return <Navigate to="/verify-email" replace />
  }

  return children

}


const RedirectAuthenticatedUser = ({children})=> {
   
  const {isAuthenticated,user}=useAuthStore()

  if(isAuthenticated && user?.isVerified){
    return <Navigate to="/" replace />
  }
  
  return children

}


function App() {
  const {isCheckingAuth,checkAuth,isAuthenticated,user}=useAuthStore()

  useEffect(() => {
     checkAuth()
  }, [checkAuth])

  console.log("user",user)
  console.log("!user?.Verified",!user?.isVerified)
  console.log("isAuthenticated",isAuthenticated)
  
  if(isCheckingAuth) return <LoadingSpinner/>

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900
     via-pink-800 to-blue-800 relative flex items-center justify-center overflow-hidden'>
      <FloatingShape color={"bg-pink-400"} size={"w-64 h-64"} top={"-5%"} left={"10%"} delay={0} />
      <FloatingShape color={"bg-pink-400"} size={"w-52 h-52"} top={"50%"} left={"80%"} delay={5} />
      <FloatingShape color={"bg-pink-400"} size={"w-32 h-32"} top={"44%"} left={"-3%"} delay={10} />

      <Routes>
        <Route path="/" element={
        <ProtectedRoute>
          <DashboardPage/>
        </ProtectedRoute>}/>
        <Route path='/signup' element={
          <RedirectAuthenticatedUser>
            <SignupPage/>
          </RedirectAuthenticatedUser>
        }/>
        <Route path='/login' element={<RedirectAuthenticatedUser>
            <LoginPage/>
          </RedirectAuthenticatedUser>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='*' element={<Navigate to="/" replace />}/>
        <Route path='/forgot-password' element={<RedirectAuthenticatedUser>
          <ForgotPasswordPage/>
        </RedirectAuthenticatedUser>}/>
        <Route path='/reset-password/:token'
         element={
          <RedirectAuthenticatedUser>
            <ResetPasswordPage/>
          </RedirectAuthenticatedUser>
         }
        />
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App

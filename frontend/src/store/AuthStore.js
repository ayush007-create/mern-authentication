import axios from 'axios'
import React from 'react'
import {create} from 'zustand'

const url = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/"

axios.defaults.withCredentials=true

const useAuthStore = create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,

    signup: async(email,password,username)=>{
        set({isLoading:true,error:null})
        try {
            const response = await axios.post(`${url}/signup`,{email,password,username})
            set({user:response.data.user,isLoading:false,isAuthenticated:true})
        } catch (error) {
            set({error:error.response.data.message || "Error Signing Up",isLoading:false})
            throw error
        }
    },
    verifyEmail: async(code)=>{
        set({isLoading:true,error:null})
        try {
            const response = await axios.post(`${url}/verify-email`,{code})
            set({user:response.data.user,isLoading:false,isAuthenticated:true})
            return response.data
        } catch (error) {
            set({error:error.response.data.message || "Error in Verifying",isLoading:false})
            throw error
        }
    },
    login: async (email,password)=>{
       set({isLoading:true,error:null})
       try {
        const response = await axios.post(`${url}/login`,{email,password})
        set({user:response.data.user,isLoading:false,isAuthenticated:true})
       } catch (error) {
        set({error:error.response.data.message || "Error Logging In",isLoading:false})
            throw error
       }
    },
    checkAuth: async ()=>{
        set({error:null,isCheckingAuth:true})
        try {
            const response = await axios.get(`${url}/verify-auth`)
            set({user:response.data.user,isCheckingAuth:false,isAuthenticated:true})
        } catch (error) {
            set({error:null,isCheckingAuth:false,isAuthenticated:false})
        }
    },
    logout: async ()=>{
        set({error:null,isLoading:true})
        try {
            await axios.post(`${url}/logout`)
            set({isAuthenticated:false,user:null,isLoading:false,error:null})
        } catch (error) {
            set({error:"Error Logging Out",isLoading:false})
            throw error
        }
    },
    forgotPass: async (email)=>{
        set({error:null,isLoading:true})
        try {
            await axios.post(`${url}/forgot-password`,{email})
            set({isLoading:false})
        } catch (error) {
            set({error:error.response.data.message || "Error in sending Mail",isLoading:false})
            throw error
        }
    },
    resetPass: async (token,password)=> {
        set({error:null,isLoading:true})
        try {
            await axios.post(`${url}/reset-password/${token}`,{password})
            set({isLoading:false})
        } catch (error) {
            set({error:error.response.data.message || "Error in Resetting Password",isLoading:false})
            throw error
        }
    }
}))

export default useAuthStore

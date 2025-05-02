import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';

export const useAuthStore = create(persist(
  (set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdateProfile: false,
    isCheckingAuth: true,
    
    checkAuth: async () => {
      try {
        const res = await axiosInstance.get("/auth/check");
        set({ authUser: res.data });
      } catch (error) {
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },

    signup: async (data) => {
      set({ isSigningUp: true });
      try {
        const res = await axiosInstance.post("/auth/signup", data);
        set({ authUser: res.data });
        toast.success("Account created successfully");
      } catch (error) {
        toast.error(error.response?.data?.message || "Signup failed");
      } finally {
        set({ isSigningUp: false });
      }
    },

    login: async (data) => {
      set({ isLoggingIn: true });
      try {
        const res = await axiosInstance.post("/auth/login", data);
        set({ authUser: res.data });
        toast.success("You Logged in successfully");
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
      } finally {
        set({ isLoggingIn: false });
      }
    },

    logout: async () => {
      try {
        await axiosInstance.post("/auth/logout");
        set({ authUser: null });
        toast.success("Logged out successfully");
      } catch (error) {
        toast.error(error.response?.data?.message || "Logout failed");
      }
    },

    uploadImageProfile : async (data) => {
      set({isUpdateProfile : true});
      try {
        const res =  await axiosInstance.put("/update-profile" , data);
        set({authUser : res.data});
        toast.success("Profile updated successfully");
      } catch (error) {
        console.log("error in update profile :" , error);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally{
        set({isUpdateProfile : false});
      }
    }
    
  }),
  {
    name: "auth-storage", 
    partialize: (state) => ({ authUser: state.authUser })
  }
));

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';
import  Axios  from 'axios';
import { io } from 'socket.io-client';

const BASE_URL = "http://localhost:3000";

export const useAuthStore = create(persist(
  (set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdateProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
      try {
        const res = await axiosInstance.get("/auth/check");
        set({ authUser: res.data });
        get().connectSocket();
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
        get().connectSocket();
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
        get().disconnectSocket();
      } catch (error) {
        toast.error(error.response?.data?.message || "Logout failed");
      }
    },

    uploadImageProfile : async (data) => {
      set({isUpdateProfile : true});
      try {
        const res =  await Axios.put("http://localhost:3000/api/auth/update-profile" , data ,{
          withCredentials: true,
        });
        set({authUser : res.data});
        toast.success("Profile updated successfully");
      } catch (error) {
        console.log("error in update profile :" , error);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally{
        set({isUpdateProfile : false});
      }
    },

      connectSocket: () => {
      const { authUser, socket } = get();
      if (!authUser || socket?.connected) return;

      const newSocket = io(BASE_URL, {
        query: { userId: authUser._id },
      });

      newSocket.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds });
      });

      set({ socket: newSocket });
    },

    disconnectSocket: () => {
      // if (get().socket?.connected) get().socket.disconnect();
      const socket = get().socket;
      if (socket?.connected) socket.disconnect();
      set({ socket: null, onlineUsers: [] });
    }
    
  }),
  {
    name: "auth-storage", 
    partialize: (state) => ({ authUser: state.authUser })
  }
));

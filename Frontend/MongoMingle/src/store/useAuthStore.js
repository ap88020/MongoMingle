import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'

export const useAuthStore = create ((set) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdateProfile : false,

    isCheckingAuth : true,

    checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/auth/check");
      
          if (res.data && res.data.user) {
            set({ authUser: res.data.user });
          } else {
            set({ authUser: null });
          }
        } catch (error) {
          console.log("Error in checkAuth :", error);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
    },
    signup : async () => {

    } 
}))
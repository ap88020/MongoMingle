import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set,get) => ({
    messages : [],
    users : [],
    selectedUser : null,
    isUsersLoading : false,
    isMessagesLoading : false,

    getUsers : async () => {
        set({isUsersLoading : true});
        try {
            const res = await axiosInstance.get("/messages/users");
            // console.log(res.data);
            set({users : res.data});    
        } catch (error) {
            toast.error(error.response?.data.messages || "something is wrong");    
        } finally {
            set({isUsersLoading : false});
        }
    },
    getMessages : async (userId) => {
        set({isMessagesLoading : true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`); 
            const messages = Array.isArray(res.data) ? res.data : res.data.messages || [];
            set({messages});
        } catch (error) {
            toast.error(error.response?.data?.error || "Something went wrong");

        } finally {
            set({isMessagesLoading : false});
        }
    },
    sendMessage : async (messageData) => {
        const {selectedUser , messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            const { newMessage } = res.data;
            set({ messages: [...messages, newMessage] });
        } catch (error) {
            toast.error(error.response.data.messages || "something is wrong");
        }
    },
    subscribeToMessages : () => {
        const  { selectedUser } = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        if(!socket) return;

        socket.off("newMessages");
        socket.on("newMessages", (newMessage) => {
        const currentSelected = get().selectedUser;
        if (newMessage.senderId === currentSelected?._id || newMessage.receiverId === currentSelected?._id) {
            set({ messages: [...get().messages, newMessage] });
        }
});
    },
    unSubscribeFromMessages : () => {
        const socket = useAuthStore.getState().socket;
        if (socket) socket.off("newMessages");
    },
    setSelectedUser : (selectedUser) => {set({selectedUser})},
}));
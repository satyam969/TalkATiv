import { useContext,createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChatContext=createContext();

const ChatProvider=({children})=>{

    const URI=import.meta.env.VITE_URL;

    const [user,setUser]=useState(null);
const[selectedChat,setSelectedChat]=useState();
const[chats,setChats]=useState([])
// global state for notifications
const[notifications,setNotifications]=useState([]);
const[loading,setLoading]=useState(false);

const navigate=useNavigate();

const getdeatail=async()=>{
    try {
        
        setLoading(true)
    const {data}=await axios.get(`${URI}/api/detail`, {
        withCredentials: true,
      });

  
    
if(data)
    setUser(data.data)
setLoading(false);

    if(!data.success){

navigate('/login')


    }
  


    } catch (error) {
        navigate('/login')
        console.log(error);
    }
}


useEffect(()=>{

getdeatail();
    
},[])


return (
    <ChatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats,setChats,notifications,setNotifications,loading}}>
        {children}
    </ChatContext.Provider>
 
)

}

const useChat=()=>useContext(ChatContext);

export {useChat,ChatProvider }
import { Box, Spinner } from "@chakra-ui/react";
import { useChat } from "../context/ChatProvider"
import SideDrawer from "../component/SideDrawer";
import MyChats from "../component/MyChats";
import ChatBox from "../component/ChatBox";
import { useEffect, useState } from "react";



const ChatPage = () => {

    const{user,loading}=useChat();

    // state so that when we leave a group from the chatBox page 
const[fetchAgain,setFetchAgain]=useState(false);


if (loading) {  
  return <Spinner size="xl" />;  
} 



  return (
    <div className="w-full bg-prim">
      {user && <SideDrawer/>}

<Box 
className="flex justify-between w-100 h-[91.5vh] p-[10px]"

>

{user && <MyChats fetchAgain={fetchAgain} />}
{user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}

</Box>

    </div>
  )
}


export default ChatPage

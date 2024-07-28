import { Box, Button, FormControl, IconButton, Input, Spinner, Text } from "@chakra-ui/react";
import { useChat } from "../context/ChatProvider"
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogic";
import ProfileModel from "./ProfileModel";
import UpdateGroupChatModel from "./miscallaneous/UpdateGroupChatModel";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from 'socket.io-client'
import { GoFileMedia } from "react-icons/go";
const ENDPOINT=import.meta.env.VITE_URL;

var socket,selectedChatCompare;



const SingleChat = ({fetchAgain,setFetchAgain}) => {
// state for all messages
const[message,setMessage]=useState([]);
const[loading,setLoading] = useState(false);
const[typing,setTyping]=useState(false);
const[isTyping,setIsTyping] = useState(false); 
const [photo,setPhoto] = useState("");


// socket
const[socketConnected,setSocketConnected]=useState(false);


// new message 
const[newMessage,setNewMessage] = useState("")

    const {user,selectedChat,setSelectedChat,notifications,setNotifications}=useChat();

const URI=import.meta.env.VITE_URL;



useEffect(()=>{
  socket =io(ENDPOINT);
  socket.emit('setup',user)
  socket.on('connected',()=> setSocketConnected(true)) 

  socket.on('typing',()=> setIsTyping(true))
  socket.on('stop typing',()=> setIsTyping(false))


  },[])



const sendMessage=async(e)=>{
if(e.key==="Enter" && newMessage){


try {

  
  setNewMessage("");
  socket.emit('stop typing',selectedChat._id)
const {data}=await axios.post(`${URI}/messages`,{content:newMessage,chatId:selectedChat._id},{
  withCredentials: true,
})


socket.emit('new message',data)

setMessage([...message,data])






} catch (error) {
  toast.error("Something went wrong")
  console.log(error);

}


}


}

// fetch all messages 
const fetchMessage=async()=>{

  if(!selectedChat)return;

  try {

    setLoading(true);

    const {data}=await axios.get(`${URI}/messages/${selectedChat._id}`,{
      withCredentials: true,
    });

    setMessage(data);

  
    setLoading(false);
    
    socket.emit('join chat',selectedChat._id);
    

  } catch (error) {
    toast.error("Error Getting Messages")
  }
}

// setting live chat

useEffect(()=>{

  socket.on('message recieved',(newMessageRecieved)=>{

    // agr msg abhi jo latest chat open hai usme nhi kisi aur chat me aaya hai toh notification show kro 
if(!selectedChatCompare || selectedChatCompare._id!=newMessageRecieved.chat._id){

  // give notification
  if(!notifications?.includes(newMessageRecieved)){

    setNotifications([newMessageRecieved,...notifications])
    setFetchAgain(!fetchAgain)

  }

}
else{

  // display message
  setMessage([...message,newMessageRecieved]);

}


  })



})





useEffect(()=>{


fetchMessage();

// to keep the track wheteher we need to send notificstion or the message 
selectedChatCompare=selectedChat;

},[selectedChat])

const typingHandler=(e)=>{

  setNewMessage(e.target.value);


// Typing Indicator Logic (typing...)
if(!socketConnected) return;

if(!typing){

  setTyping(true);
  socket.emit('typing',selectedChat._id);

}

// when to stop typing

let lasttypingtime=new Date().getTime();

var timerlength=3000;

setTimeout(()=>{

  var timeNow=new Date().getTime();

  var timeDiff=timeNow - lasttypingtime;

  console.log(timeDiff);

  if(timeDiff>=timerlength && typing){


    socket.emit('stop typing',selectedChat._id)

setTyping(false);

  }


},timerlength);


}

const handleFileChange = (event) => {  
  const file = event.target.files[0];  
  if (!file) return; // Ensure a file is selected  
  
  const reader = new FileReader();  
  reader.onload = function() {  
    const bytes = new Uint8Array(this.result);  
    socket.emit('image', bytes,newMessageRecieved);  
  };  
  
  reader.readAsArrayBuffer(file);  
};



  return (
    <>
 {selectedChat?(<>
 <Text
 className="flex items-center w-100 "
  fontSize={{ base: "28px", md: "30px" }}
  pb={3}
  px={2}
  fontFamily="Work sans"
  justifyContent={{ base: "space-between" }}

 >
    <IconButton 
   
     d={{ base: "flex", md: "none" }}
     icon={<ArrowBackIcon/>}
     onClick={() => setSelectedChat("")}
    />
    {!selectedChat.isGroupChat?(
        <>{getSender(user,selectedChat.users)}
        <ProfileModel user={getSenderFull(user,selectedChat.users)}/>
        </>
    ):(
        <>
        {selectedChat.chatName.toUpperCase()}
<UpdateGroupChatModel fetchAgain={fetchAgain}  setFetchAgain={setFetchAgain} fetchMessage={fetchMessage} />
        </>
    )}
 </Text>
<Box
className="flex flex-col justify-end  w-100 h-[570px] overflow-y-hidden"

  bg="#E8E8E8"
  borderRadius="lg"

>
 {loading? (<Spinner
  size="xl"
  w={20}
  h={20}
  alignSelf="center"
  margin="auto" />) : (

<div className="flex flex-col overflow-y-scroll scrollbar-width-none ">

{ <ScrollableChat message={message} />}

</div>

 )}



<FormControl className="flex flex-row-reverse" onKeyDown={sendMessage} isRequired mt={3}>

{isTyping ? <div>Typing...</div> :<></>}

<Input
 variant="filled"
 bg="#E0E0E0"
 placeholder="Enter a message.."
 value={newMessage}
 onChange={typingHandler}
/>

{/* <label className="flex h-10 justify-center items-center" htmlFor="file-upload">
          <div className="h-14 p-2  flex justify-center items-center border rounded  hover:bg-prim"><p className="text-sm max-w-[300px] text-ellipsis ">{photo?photo.name : <GoFileMedia />  }</p></div>
        </label> */}
{/* <Input   
          className="hidden"
          id="file-upload"   
          type="file"   
          onChange={handleFileChange}   
        />  */}
</FormControl>

</Box>

 </>):(
<Box className="flex items-center justify-center h-100" >
    <Text fontSize="3xl" pb={3} fontFamily="Work sans">Select a chat to view its messages</Text>

</Box>

 )}
    </>
  )
}

export default SingleChat

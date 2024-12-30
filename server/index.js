const express=require('express');
const cors=require('cors');
const connectDB=require('./config/connectDB')
require('dotenv').config()
const router=require('./routes/auth-router')
const userrouter=require('./routes/user-router')
const chatrouter=require('./routes/chat-router')
const messagesrouter=require('./routes/message-router')
const app= express();
const cookieParser = require('cookie-parser');
const fs=require('fs')

app.use(cors({

origin:"https://talk-a-tiv.vercel.app",
credentials:true


}))

app.use(express.json())
// to get cookies in the browser
app.use(cookieParser());

const PORT=process.env.PORT || 8080;


app.use('/api',router);
  
// user details
app.use('/user',userrouter);

// chat
app.use('/chat',chatrouter);

// messages
app.use('/messages',messagesrouter);

connectDB().then(()=>{
   const server= app.listen(PORT,()=>{

        console.log("server running at ",PORT)
        
        }
    

    
    )

    const io=require('socket.io')(server,{
// itne time me kuch na ho to stop kr dega connection ko do
        pingTimeout:60000,
    cors:{
       origin:"https://talk-a-tiv.vercel.app",
    }
            })


io.on('connection',(socket)=>{
console.log("connection established")


socket.on('setup',(userData)=>{

    // make a room to chat
    
    socket.join(userData._id)
socket.emit('connected')

});

// on clicking any chat just create a room with all users in the group or the 2 users 
// jb dono user online honge tbhi ye connection dono k liye krna hai 
// otherwise jo online hai sirf uskw liye hoga 

socket.on('join chat',(room)=>{

// hr user ka alg room hai jha pe msg jyega 

socket.join(room)
// console.log('User Joined Room '+room)
})

socket.on('typing',(room)=>{

    socket.in(room).emit('typing')

})

socket.on('stop typing',(room)=>{
    socket.in(room).emit('stop typing')
})



socket.on('new message',(newMessageRecieved)=>{

    var chat=newMessageRecieved.chat;

    if(!chat.users){

        return console.log('chat.users not defined')

    }

// emit it to all users of room except me
chat.users.forEach(user=>{
    if(user._id == newMessageRecieved.sender._id) return;

    // in this user id room

socket.in(user._id).emit('message recieved',newMessageRecieved)

    
})


})

// socket.on('image', (image,newMessageRecieved) => {  

//     var chat=newMessageRecieved.chat;

//     // Assuming 'image' is a Uint8Array or similar  
//     const buffer = Buffer.from(image); 
    
//     const dir = 'C:/tmp'; // Change this to your desired path  
//     const filePath = `${dir}/image_${Date.now()}.png`; // Unique filename  

//     if (!fs.existsSync(dir)) {  
//         fs.mkdirSync(dir);  
//     }  

//     fs.writeFile(filePath, buffer, (err) => {  
//         if (err) {  
//             console.error('Error writing file:', err);  
//             return;  
//         }  
//         console.log('Image saved successfully:', filePath);  
//     });  
    


//     chat.users.forEach(user=>{
//         if(user._id == newMessageRecieved.sender._id) return;
    
//         // in this user id room
    
//     socket.in(user._id).emit('message recieved',newMessageRecieved)
    
        
//     }) 
    
    
 

// });  




socket.off("setup",()=>{
    console.log('user disconnected')
    socket.leave(userData._id)
})



})


        
}).catch((e)=>{

    console.log('connection failed')

})




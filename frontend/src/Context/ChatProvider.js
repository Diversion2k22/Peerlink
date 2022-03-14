import {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


export const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const [user,setUser]=useState();
    const [SelectedChat,setSelectedChat]=useState();
    const [Chats,setChats]=useState();
    const Navigate = useNavigate();
    
    
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("user"));
        console.log(userInfo);
        setUser(userInfo);
        if(!userInfo){
            Navigate("/login")
        }
    },[Navigate]);

    return <ChatContext.Provider value={{user,setUser,SelectedChat,setSelectedChat,Chats,setChats}}>
        {children}
        </ChatContext.Provider>
};
// export const ChatState=()=>{
//     useContext(ChatContext);
// }


export default ChatProvider
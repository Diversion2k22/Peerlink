import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import {messagesList} from "../mockData";
import { SearchContainer, SearchInput } from "../chatcomp/MyContact";
import { ChatContext} from '../../Context/ChatProvider';
import './mycon.css';


import styled from "styled-components";
// const ChatHeader = styled.div`
// display:flex;
// padding:10px;
// background:#ffbf;

// `;
// const ChatName = styled.span`
// width:100%;
// font-size:16px;
// color:black;
// margin:0px 0px 0px 5px;
// `;
// const Online = styled.span`
// display:flex;
// justify-content:flex-start;
// color:black;
// font-size:12px;
// `;
const ChatBox = styled.div`
display:flex;
background:rgba(0,0,0, 0.6);
border-radius:13px;
padding: 10px;
align-items: center;
bottom:0;

`;

const Money = styled.img`
width:28px;
height:28px;
cursor:pointer;
margin:0px 5px 0px 0px;
`;
const EmojiImage = styled.img`
width:28px;
height:28px;
cursor:pointer;
margin:0px 5px 0px 0px;
`;

const Voice = styled.img`
width:28px;
height:28px;
cursor:pointer;
margin:0px 5px 0px 0px;
`;

const SendLogoContainer = styled.div`
height:35px;
width:35px;
border-radius:50%;
background:white;
display:inline-block;
margin:0px 5px 0px 8px;
align-items:center;
`
const SendLogo = styled.img`
width:30px;
height:30px;
cursor:pointer;
margin:3px 5px 0px 0px;
`;
const MessageContainer = styled.div`
display:flex;
margin-bottom:10px;
flex-direction:column;
height:100%;
background:#e5ddd6;
background:rgb(255, 255, 255,0.2);
overflow-y:hidden;
padding:0px 40px;

`;

const MessageDiv = styled.div`
justify-content: ${(props) => (props.isYours ? "flex-end" : "flex-start")};
display:flex;
margin: 5px 15px;
`;

const Message = styled.div`
background: ${(props) => (props.isYours ? "#daf8cb" : "white")};
max-width:50%;
color: #303030;
padding: 8px 10px;
font-size:14px;
border-radius:4px;
`;

function MyChat() {

  const {SelectedChat} = useContext(ChatContext);
  
  return (
   
    <div className='mychat'>
     <Box
       d="flex"
       justifyContent="center"
       alignItems="center"
      //  bg="rgba(255, 255, 255, 0.1);"
      
       bg="rgba(255,255 ,255,0.4 )"
       borderRadius="13px"
       width="100%"
       border="2px solid rgb(0,0,0,0.2)"
       height="50px"
     >
        <Text
 fontSize={{ base: "28px", md: "30px" }}
 fontFamily="rancho"
 textTransform="uppercase"
 color="black"
 
 >
 {SelectedChat}
</Text>
</Box>

{/* .................................................... */}


<Box h="100%">
<MessageContainer>
    {messagesList.map((messageData) => ( <MessageDiv isYours={messageData.senderID === 0} key={messageData.id}>
            <Message isYours={messageData.senderID === 0}>{messageData.text}</Message>
        </MessageDiv>))}
    </MessageContainer>
    <ChatBox>
    <Money src = {"wallet.svg"}></Money>
    <EmojiImage src = {"emoji-img.svg"}/>
    <Voice src = {"voice.svg"}></Voice>
        <SearchContainer>
        
            <SearchInput placeholder = "Type a message..."/>
        </SearchContainer>
        <SendLogoContainer>
        <SendLogo src = {"send-logo.png"}></SendLogo>
        </SendLogoContainer>
        
    </ChatBox>
</Box>
      
      
      
      
      
      </div>
  )
}

export default MyChat;
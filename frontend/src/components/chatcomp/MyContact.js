import React from 'react'
import {Box} from '@chakra-ui/react'
import './mycon.css';
import styled from 'styled-components';
import { contactList } from '../mockData';




export const SearchContainer =styled.div`
display:flex;
flex-direction:row;
background: white;
border-radius: 14px;
width:100%;
padding: 5px 5px;
`;

export const SearchInput = styled.input`
     width:100%;
     outline:none;
     border:none;
     font-size: 15px;
     margin-left:10px;
`;
const ContactItem = styled.div`
display:flex;
flex-direction: row;
border-bottom: 1px solid #f2f2f2;

cursor:pointer;
background:transparent;
margin:0px 10px;
padding: 15px 12px;
color:white;
:hover{
  border-radius:10px;
  background: rgba(255, 255, 255, 0.205);
}
`;
export const ProfileIcon = styled.img`
width:38px;
height:38px;
border-radius: 50%;
`;
const ContactInfo = styled.div`
display:flex;
flex-direction:column;
width:100%;
margin: 0 12px;
`;
const ContactName = styled.span`
width:100%;
font-size:16px;
color:white;
`;
const MessageText = styled.span`
width:100%;
font-size: 14px;
margin-top:3px;
color:rgba(255,255,255,0.4);
`;
const MessageTime = styled.span`
font-size:12px;
margin-right:10px;
color: rgba(0,0,0,0.55);
white-space:nowrap;
`;




function MyContact() {

  const ContactComponent = (props) =>{
    const {userData} =props;
    return ( 
    <ContactItem>
        <ProfileIcon src = {'user.png'}/>
        <ContactInfo>
            <ContactName>{userData.name}</ContactName>
            <MessageText >{userData.lastText}</MessageText>
        </ContactInfo>
        <MessageTime>{userData.lastTextTime}</MessageTime>
    </ContactItem>
    
    );
};
  return (
    <div className='mycontact'>
     <input className='search' type="text" placeholder='Search Name'/>

     <Box mt="10px">
     
     {contactList.map((userData)=> (<ContactComponent userData={userData} key={userData.id}/>))}
     </Box>
      </div>
  )
}

export default MyContact
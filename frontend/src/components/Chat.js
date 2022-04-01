import React from 'react';
import MyChat from './chatcomp/MyChat';
import MyContact from './chatcomp/MyContact';
import SideDrawer from './chatcomp/SideDrawer';


function Chat() {


    
  return (
    <>
        
        {/* <h1>{user}</h1> */}
    <SideDrawer/>
    <div className="set set2">
        <MyContact/>
         <MyChat/>
     </div>
    </>
  )
}

export default Chat
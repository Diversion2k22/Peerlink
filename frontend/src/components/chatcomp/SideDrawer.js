import React,{ useContext, useState } from 'react';
import { Box } from "@chakra-ui/layout";
import { Avatar, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, MenuDivider, MenuItem, MenuList, Tooltip, useToast } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Text,Input } from '@chakra-ui/react'
import { Menu } from '@chakra-ui/react'
import { MenuButton } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import { BellIcon,ChevronDownIcon } from '@chakra-ui/icons'
import ProfileModal from './ProfileModal';
import ChatLoading from './ChatLoading';
import UserListItem from './UserListItem';
// import ChatProvider from '../../Context/ChatProvider';
import { ChatContext } from '../../Context/ChatProvider';
const axios = require('axios');



function SideDrawer() {

 
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const { user,setSelectedChat } = useContext(ChatContext);
     
    const { isOpen, onOpen, onClose } = useDisclosure(); 

   const toast = useToast();

    const handleSearch = async () => {
      if (!search) {
          toast({
            title: "Please Enter something in search",
            status: "warning",
            duration: 4000,
            isclosable: true,
            position: "top-left",
          });
          return;
        }
   

    try{
      setLoading(true)

      const {data} = await axios.get('api/contact');
      setLoading(false);
      setSearchResult(data);
    }
    catch(error){
      toast({
        title: "Error",
        status: "warning",
        duration: 4000,
        isclosable: true,
        position: "bottom-left",
      });
    }


  };
    const handleSearchAuto = async () => {
     

    try{
      setLoading(true)

      const {data} = await axios.get('api/contact');
      setLoading(false);
      setSearchResult(data);
    }
    catch(error){
      toast({
        title: "Error",
        status: "warning",
        duration: 4000,
        isclosable: true,
        position: "bottom-left",
      });
    }
    


  };

  const accessChat = (userid,user) =>{

    try{
    setLoading(true);
    
    // const { data } = await axios.post("/api/chat",{userid});
     
    setSelectedChat(user.username);
    setLoadingChat(false);
    onClose();
    }catch(error){
      toast({
        title: "Error name",
        status: "warning",
        duration: 4000,
        isclosable: true,
        position: "bottom-left",
      });
    }
  }
    

    
  return (
    <>
    
    <Box 
    d="flex"
    justifyContent="space-between"
    alignItems="center"
    bg="rgba(0, 0, 0,)"
    width="100%"
    border="2px solid rgb(0,0,0,0.2)"
    
    >
  <Tooltip label="Search Users to chat" 
  hasArrow placement="bottom-end">
    <Button variant="ghost" onClick={onOpen}>
      
    <i class="fas fa-search"></i>
    
     <Text d={{base:"none",md:"flex"}} pl={3} onClick={handleSearchAuto}>
       Search New User
     </Text>
    </Button>
    
  </Tooltip>
  <Text fontSize="35px" fontFamily="rancho" letterSpacing="2px">
  Chat
</Text>
<div>
  <Menu>
    <MenuButton p={1}>
      <BellIcon fontSize="30px" m={1} />
    </MenuButton>
    {/* <MenuList></MenuList> */}
  </Menu>
  <Menu>
    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
     <Avatar size='sm' cursor="pointer"/>
    </MenuButton>
    <MenuList>
      <ProfileModal
       user={user}
      
      >
      <MenuItem>My Profile</MenuItem>
      </ProfileModal>
      <MenuDivider/>
      <MenuItem>Setting</MenuItem>
    </MenuList>
  </Menu>
</div>

  </Box>

  <Drawer  placement='left' onClose={onClose} isOpen={isOpen}>
   <DrawerOverlay > 
     <DrawerContent bg="rgba(255, 255, 255, 0.5);">
       <DrawerHeader bg="white" borderBottomWidth="1px" >Search New User</DrawerHeader>
     

       <DrawerBody >
     <Box d="flex" pb={2} >
  <Input
   placeholder="Search by name or email"
   mr={2}
   bg="white"
   value={search}
   onChange={(e) => setSearch(e.target.value)}
   
 />
  <Button
 onClick={handleSearch}
 >
   Go
  </Button>
</Box>
{loading ? (
   <ChatLoading/>
):(
 searchResult?.map((user)=>(
   <UserListItem
 key={user._id}
 user={user}
 handleFunction={() => accessChat(user._id,user)}
/>
   
   
 ))
)}

     </DrawerBody>
     
     
     
     
     </DrawerContent>
    
   </DrawerOverlay>
</Drawer>
   </>
  )
}

export default SideDrawer
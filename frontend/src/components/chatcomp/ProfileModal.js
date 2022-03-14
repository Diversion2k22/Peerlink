import React, { useContext } from 'react'
import {useDisclosure} from '@chakra-ui/hooks'
import {Image,Text} from '@chakra-ui/react'
import { Button, ModalBody,ModalCloseButton , Modal, ModalContent, ModalHeader, ModalOverlay,ModalFooter } from '@chakra-ui/react';
import { ChatContext } from '../../Context/ChatProvider';


function ProfileModal({children}) {
    const { isOpen, onOpen, onClose } = useDisclosure(); 
    const {user} = useContext(ChatContext);
    console.log(user);
    
    const userInfo = JSON.parse(localStorage.getItem("user"));
    // console.log(userInfo);
    
    


   

  return (
    <div>
       {children?( <span onClick={onOpen} style={{paddingLeft:"12px"}}>Profile</span>
       ):(<span>Not Log in</span>)}

  <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay/>
  <ModalContent>
   <ModalHeader 
   fontSize="30px"
   d="flex"
   justifyContent="center"
   textTransform="capitalize"
   >{userInfo.username}</ModalHeader>
    <ModalCloseButton />
     <ModalBody 
     d="flex"
     flexDir="column"
     alignItems="center"
     justifyContent="space-between"
     >
     <Image
 borderRadius="full"
 boxSize="150px"
  src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
 alt="ok"
 />
 <Text
 fontSize={{ base: "28px", md: "30px" }}
 fontFamily="Work sans"
 >
 {userInfo.email}
 
</Text>
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="blue" mr={3} onClick={onClose}>
        Close
      </Button>
      {/* <Button variant="ghost">Extra</Button> */}
      </ModalFooter>
  </ModalContent>
  </Modal>
    </div>
  )
}

export default ProfileModal
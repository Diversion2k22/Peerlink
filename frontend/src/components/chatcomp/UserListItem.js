import React from 'react'
import { Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import {Avatar} from "@chakra-ui/react";

function UserListItem({user,handleFunction}) {
  return (
    <div>
<Box
  onClick={handleFunction}
  cursor="pointer"
  bg="#E8E8E8"
  _hover={{
    background: "#38B2AC",
    color: "white",
  }}
  W="100%"
  d="flex"
  alignItems="certer"
  color="black"
  px={3}
  py={2}
  mb={2}
  borderRadius="lg"
  >

     <Avatar
  mr={2}
  size="sm"
  cursor="pointer"
  name={user.username}
  src={user.pic}
  />
<Box>
  <Text>{user.name}</Text>
  <Text fontSize="xs">
      <b>{user.username}</b>
      <br />
     <b>Email : </b>
    {user.email}
  </Text>
</Box>
</Box>
      
       
    </div>
  )
}

export default UserListItem
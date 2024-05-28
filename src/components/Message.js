import React, { useState , useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";



const useDebounce = (value , delay)=>{
  const [debouncedMessageValue , setDebouncedMessageValue] = useState(value);

useEffect(()=>{  
    const handleFunc = setTimeout(()=>{
      setDebouncedMessageValue(value);
    }, delay)
  
  return ()=>{
    clearTimeout(handleFunc)
  };
},[value , delay])
  return debouncedMessageValue;
}

const Messages = ({ messages }) => {
  
  const debouncedMessages = useDebounce(messages , 2000);
  console.log('mmessga', debouncedMessages)
  
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  let mess = [{}];
    if( debouncedMessages && mess.length === 0 ) 
    {
      mess = JSON.parse(JSON.stringify(debouncedMessages));
    }  
     

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="4" backgroundColor='lightgreen'>
      {debouncedMessages?.map((item, index) => {
        if(index === 0 ) return <></>; 

        else if (item.role === "user") {
          return (
            <Text> <h6>YOU</h6></Text>, 
            <Flex key={index} w="100%" justify="flex-end">
               
              <Flex
                bg="black"
                color="white"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{item.parts[0].text}</Text>
                </Flex>
            </Flex>
          );
        } else {
          return ( 
            <Flex key={index} w="100%">
              <Avatar
                name="Computer"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                bg="blue.300"
              ></Avatar>
              <Flex
                bg="gray.100"
                color="black"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                 {/* <Text>{item.parts[0].text}
                </Text>  */}
                
                {(item.parts.length === 1)?<Text>{item.parts[0].text}
                </Text> :<> {item.parts.map((item)=>{
                     return <p>{`${item.text}\n`}</p>
                })}</>}
              </Flex>
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
};

export default Messages;
import React,{useState} from 'react';
import { Card, Image , Stack , Heading ,Header ,Footer, Divider , Button , ButtonGroup, CardBody, CardFooter } from '@chakra-ui/react';
import {  useDispatch } from 'react-redux';
import { increment } from '../features/cartSlice';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Flex, Input } from "@chakra-ui/react";
import Messages from './Message';

const ShowItems = (product) => {

    console.log('show' , product.product);
    const userid = localStorage.getItem('id');
     const genAI = new GoogleGenerativeAI('AIzaSyCkimmrTvjhi16EiNYUsUpizNHWR9opNFc');
    let [inputMessage, setInputMessage] = useState('');
    //  const [ chatApp , setChatApp ] = useState([{}]);
    let [ chatApp  , setChatApp ] = useState([{}]);
    var chat =[{}]
      const [clicked , setClicked ]= useState(false) ;

    async function genai(msg) {
      setClicked(false);
      setInputMessage('');

      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
        chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello, I have 2 dogs in my house." }],
          },
          {
            role: "model",
            parts: [{text: "Great to meet you. What would you like to know?" }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 100,
        },
       });

      // const arr = chat._history
      // chatArr=[...chatArr , {role:}];
      // chat._history = [...chat._history , {role : "user" , parts :[{text:msg}]}]
     
      
      const result = await chat.sendMessageStream(msg);

      const response =await result.response;
      console.log('reposne', response.text())
   
      const history = await chat.getHistory();
      console.log('sis', history);
      console.log('histroy', chat._history);
      if( chatApp.length === 0 )
      {
       setChatApp(JSON.parse(JSON.stringify(chat._history)));
      }
      else{
         history.map((item , ind)=>{
            if( ind === 2 || ind ===3 )
                 chatApp.push( item );
         })
      }
     
      console.log('chatstate', chatApp);
    
      
      //  const historyCopy = JSON.parse(JSON.stringify(history));
      //  chat.push(historyCopy);
       console.log('after', chat);
       const copiedObject = JSON.parse(JSON.stringify(chat._history));
      

       console.log('copies', copiedObject);
           // Log updated chatArr
           console.log('Updated chatArr:', chat._history);
           setClicked(true);
    }
     
  const dispatch = useDispatch();
       
        const addProduct = async (item , user_id) =>{
          
          // let token = localStorage.getItem('token');
          // console.log('hi',token , user_id);
                 
          console.log('itemsimages', item);
          const { name, price , allArticleBaseImages , galleryImages } = item; // Destructure item to get name and price
          const productData = {
            name,
            price: price.value, // Assuming price.value contains the price
            quantity: 1,
            image: allArticleBaseImages[0],
            galleryImages,
            user_id
          };

             console.log('prodc', productData);
          try {
            // Make POST request using Axios
            const response = await axios.post("http://localhost:10000/api/products/", productData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            // Check if request was successful
          if (response.status === 201) {
            const outcome =  response.data;
            console.log('out', outcome);
             dispatch(increment(item)); 
       
                // Dispatch any actions or update state as needed
            } else {
                throw new Error("Failed to create product");
            }
        } 
          catch (error) {
            // Handle error
            console.error("There was an error with the request:", error);
          }
        }

  return (
    <div style={{display:"flex"}}>
    <div>
       {
        <>
        {
          (product.product)?.map((item , id)=>{
          

           return (    
       
         <Card maxW='sm' key= {id}>
         <CardBody>
           <Image
             src={`${item.images[0].url}`}
             alt='Green double couch with wooden legs'
             borderRadius='lg'
           />
           <Stack mt='6' spacing='3'>
             <Heading size='md'>{`${item.name}`}</Heading>
                  <Card>
                   <h6>  {`${item.brandName}`} </h6>
                  </Card>
           </Stack>
         </CardBody>
         <Divider />
         <CardFooter>
           <ButtonGroup spacing='2'>
             <Button variant='solid' colorScheme='blue' >
               Buy now
             </Button>
             <Button variant='ghost' colorScheme='blue'  onClick={() => addProduct(item, userid)}>
               Add to cart
             </Button>
             <Button variant='ghost' colorScheme='blue'>
               Add to wishlist
             </Button>
           </ButtonGroup>
         </CardFooter>
       </Card>  
       )
        })
      }
       </>
      }
    
    </div>
      <>
    <Flex w="100%" h="100vh" justify="center" align="center" position= "sticky"   top="0" overflowY="auto">
      <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column" >   
             
      {  (clicked)?<Messages messages ={chatApp} /> : <Messages />}
         <Divider /> 
          <Input
        placeholder="Need Help? Ask me.."
        border="none"
        borderRadius="none"
        _focus={{
          border: "1px solid black",
        }}
         value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
         <Button
        bg="black"
        color="white"
        borderRadius="none"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black"           
        }}
        onClick={()=>genai(inputMessage)}
         disabled={inputMessage.trim().length <= 0}
      >
        Send
      </Button>
      </Flex>
    </Flex>
    </> 
    </div>
  )
}

export default ShowItems

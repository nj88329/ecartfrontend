import React, { useState , useEffect} from "react";
import { useDispatch } from 'react-redux';
import { loginLogout} from './features/cartSlice';
// import { useAuth0 } from "@auth0/auth0-react";

import axios from 'axios';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    Stack,
    Text
  } from '@chakra-ui/react'
  
  export const Login = () => {

    const [token , setToken ] = useState('');
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
      username : "",
      email: "",
      password: "",
    });

    // const { user , loginWithRedirect } = useAuth0();

   const [show , setShow ] = useState(0);
  
   useEffect(() => {
    const fetchData = async (api) => {
        try {
            const response = await api.get('/current');
            console.log('response.data', response.data);    
            dispatch(loginLogout());
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    if (token) {
        const api = axios.create({
            baseURL: 'http://localhost:3000/api/users',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // Use the 'api' instance for subsequent requests
        fetchData(api);
    }
}, [token, dispatch]);


//   useEffect(() => {
    
//     const fetchData = async (api) => {
//       try {
//           const response = await api.get('/current');
//           console.log('response.data', response.data);    
//           dispatch(loginLogout()) ;
          
//       } catch (error) {
//           console.error('Failed to fetch data', error);
//       }
//   }


//     if (token) {
//         const api = axios.create({
//             baseURL: 'http://localhost:3000/api/users',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         // Use the 'api' instance for subsequent requests
        
//         fetchData()
//     }
// }, [token , dispatch]);
         
      //    const fetchData = async (api) => {
      //     try {
      //         const response = await api.get('/current');
      //         console.log('response.data', response.data);    
      //         dispatch(loginLogout()) ;
              
      //     } catch (error) {
      //         console.error('Failed to fetch data', error);
      //     }
      // }

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
         const handleLogin = async (event) =>{
          try {     
           if(token)   localStorage.setItem('token','');
          const response = await fetch("http://localhost:10000/api/users/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          });
    
             const data = await response.json();
              //  console.log('data', data )
                 
               if(!response.ok) alert(data.message);

          // Handle successful response

          localStorage.setItem('id', data.user._id.toString() )
          localStorage.setItem('token', data.accessToken);
           setToken(localStorage.getItem('token'));
          //  console.log('newtoke', data.accessToken)
          //  fetchData();
        } catch (error) {
          // Handle error
          console.error("There was an error with the request:", error);
        }
    }


    const handleSubmit = async (event) => {
      try {
        const response = await fetch("http://localhost:10000/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          if( response.statusText === "Bad Request")
          {
            alert("Username/email is already taken.");
           throw new Error("Validation failed");
          }
          else 
          {
            alert('Please enter the mandatory fields')
           throw new Error(response.statusText);
          }
        } 
        // Handle successful response
        handleLogin()
        
        console.log("Request successful", formData);
      } catch (error) {
        // Handle error
        console.error("There was an error with the request:", error);
      }
    };



  return(
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6" style = {{display :'flex'}}>
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center"  >
          
           <Button onClick ={()=>setShow(2)} > <Heading size={{ base: 'xs', md: 'sm' }} >Log in to your account</Heading></Button>
           <Button onClick ={()=>setShow(1)} > <Text color="fg.muted">
              Don't have an account? <Link href="#">Sign up</Link>
            </Text> </Button>
          
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
      {
        ( show !== 0)?
         <Stack spacing="6">
            <Stack spacing="5">
            { ( show === 1)?
              <FormControl >      
                <FormLabel htmlFor="email" >Username</FormLabel>
                <Input id="email" type="username" name ="username" onChange = {handleChange} value = {formData.username}/>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email"    name="email" type="email" onChange = {handleChange} value = {formData.email}/>
                <FormLabel htmlFor="email">Password</FormLabel>
                <Input id="email"    name="password" type="password" onChange = {handleChange} value={formData.password}/>
              </FormControl>
              : <FormControl >      
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email"    name="email" type="email" onChange = {handleChange} value = {formData.email}/>
              <FormLabel htmlFor="email">Password</FormLabel>
              <Input id="email" name="password" type="password" onChange = {handleChange} value={formData.password}/>
            </FormControl>
            }
            </Stack>
            <Stack spacing="6" >
              <HStack style = {{display: "flex"}}>
            { 
            (show === 1)?<>
            <Button onClick={handleSubmit}>Sign Up</Button>
            </> : 
              <Button onClick={ ()=>{ handleLogin(true)  }} >LOGIN</Button>            
          }
              </HStack>
            </Stack>
          </Stack>:<></>
       }
        </Box>
        
        {/* return <button onClick={() => loginWithRedirect()}>Log In</button>; */}
        
        </Stack>
    </Container>)
  }
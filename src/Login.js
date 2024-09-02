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


  function Login(){

    // function Login(){

     let REACT_APP_API_URL='https://nitinecartapp.onrender.com'  

      // let REACT_APP_API_URL='http://localhost:10000'  
    const [token , setToken ] = useState('');
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
      username : "",
      email: "",
      password: "",
    });

    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
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
            baseURL: `${REACT_APP_API_URL}/api/users`,
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
      let { name, value } = event.target;
      

      // Check password validity if the password field is being updated
    if (name === "password") {
      setIsPasswordValid(value.length >= 8);
    }

    else if( name === "username"){
      setIsUsernameValid(value.length >= 5);
    }
    else if ( name === "email"){
      // if (!value.endsWith('@xyz.com')) {
      //   value += '@xyz.com';
      // }
    }
    setFormData({ ...formData, [name]: value });
    };


         const handleLogin = async (event) =>{
          try {     
            console.log('reachedlogin')
           if(token)   localStorage.setItem('token','');
          const response = await fetch(`${REACT_APP_API_URL}/api/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          });
          console.log('reachedlogout')
             const data = await response.json();
                console.log('data', data )
                 
               if(!response.ok) alert(data.message);

          // Handle successful response
          
          localStorage.setItem('id', data.user._id.toString() )
          localStorage.setItem('token', data.accessToken);
          
           setToken(localStorage.getItem('token'))
          // console.log('newtoke', data.accessToken)
          //  fetchData();
        } catch (error) {
          // Handle error
          console.error("There was an error with the request:", error);
        }
    }


    const handleSubmit = async (event) => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/api/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
            console.log('signedin bitton')
          
        if (!response.ok) {
          // console.log('badresob',response.statusText )
          if( response.statusText === "Bad Request")
          {
            alert("Username/email is already taken.");
           throw new Error("Validation failed");
          }
        } 
        console.log("Request successful", formData);
        // Handle successful response
        handleLogin()
        
      
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
                <Input id="username" type="text" name ="username" onChange = {handleChange} value = {formData.username}
                   borderColor={isUsernameValid ? 'gray.200' : 'red.500'} />
                    {!isUsernameValid && (
                    <Text color="red.500" fontSize="sm">
                     Username must be at least 5 characters long.
                    </Text>
            )}
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email"    name="email" type="email" onChange = {handleChange} value = {formData.email}/>
                <FormLabel htmlFor="email">Password</FormLabel>
                <Input id="password"    name="password" type="password" onChange = {handleChange} value={formData.password}
                 borderColor={isPasswordValid ? 'gray.200' : 'red.500'} // Conditional border color
                 />
                  {!isPasswordValid && (
                    <Text color="red.500" fontSize="sm">
                      Password must be at least 8 characters long.
                    </Text>
            )}
              </FormControl>
              : <FormControl >      
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email"    name="email" type="email" onChange = {handleChange} value = {formData.email}/>
              <FormLabel htmlFor="email">Password</FormLabel>
              <Input id="password" name="password" type="password" onChange = {handleChange} value={formData.password}/>
            </FormControl>
            }
            </Stack>
            <Stack spacing="6" >
              <HStack style = {{display: "flex"}}>
            { 
            (show === 1)?<>
            <Button onClick={handleSubmit} isDisabled={!isPasswordValid || !isUsernameValid}>Sign Up</Button> 
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


  export default Login
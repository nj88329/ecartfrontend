import './App.css'
import './tailwind.config';
import Navbars from './components/Navbars.js';
import Products from './components/Products.js';
import { useSelector } from 'react-redux';
import Cart from './components/Cart.js';
import { Login } from './Login.js'
import React, { useState } from "react";


function App() {
 
  const cartLink = useSelector((state) => state.cart.cartLink);
  console.log('cartLi' ,  cartLink);
     
  
    const loginScreen = useSelector((state)=>state.cart.loginScreen);
    console.log('login', loginScreen);
  return (
   <div >
     { (loginScreen) ?<Login/> :  (cartLink === false) ?<> <Navbars/><Products /> </>:<><Navbars/> <Cart/></> }
  </div>
  );
}

export default App;

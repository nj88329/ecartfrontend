import './App.css'
import './tailwind.config';
// import Navbars from './components/Navbars.js';
// import Products from './components/Products.js';
import { useSelector } from 'react-redux';
// import Cart from './components/Cart.js';
//  import { Audio } from 'react-loader-spinner'
import { lazy , Suspense  } from 'react';
// import Login from './Login.js';
 const  Login  = lazy(() => import('./Login.js'));
 const Navbars =  lazy(() => import('./components/Navbars.js'));
 const Products = lazy(() => import('./components/Products.js'));
 const Cart =  lazy(() => import('./components/Cart.js'));

function App() {
 
  const cartLink = useSelector((state) => state.cart.cartLink);
  console.log('cartLi' ,  cartLink);
     
  
    const loginScreen = useSelector((state)=>state.cart.loginScreen);
    console.log('login', loginScreen);
  return (
   <div >
     { (loginScreen) ?
         
       <Suspense fallback = {<div>'...Loading'</div>}>
         <Login/> 
        </Suspense>  
     :
     
     
     (cartLink === false) ?<> <Suspense fallback = {<div>'...Loading'</div>}><Navbars/><Products /></Suspense> </>:
     <> <Suspense fallback = {<div>'...Loading'</div>}><Navbars/> <Cart/></Suspense></> }
  </div>
  );
}

export default App;

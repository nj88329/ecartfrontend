import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GalleryImages from './GalleryImages';
import { Card, Button } from 'react-bootstrap';
import  axios  from 'axios';
import  { useState , useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Cart = () => {
 
  // const items = useSelector((state) => state.cart.item);
  let REACT_APP_API_URL='https://nitinecartapp.onrender.com'
  
  const [buyProd , setBuyProd ] = useState([]) 
  const cartLink = useSelector((state) => state.cart.cartLink);
  const [clicked , setClicked] = useState([]);
  // let [count, setCount] = useState(0); 
  let [prevClickedItem , setPrevClickedItem ] = useState(-1);
  // const dispatch = useDispatch();
   
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')} `
  };


  const buyProduct =async(it)=>{
        
    // setBuyProd((prev)=>{
    //   let  newBuyList = [...prev];
    //    newBuyList[index] = true;
    //    return newBuyList;
    // })
     console.log('item' , it);
     const dataToBuy = {
       amount : it.price ,
       userid: it._id
     }
     console.log('dafa', dataToBuy)
     try {
      console.log('Fetching cart items...');
      const response = await axios.post(`${REACT_APP_API_URL}api/products/payment`,  dataToBuy , {headers});

       window.location.href = response.data;

      // Handle cart items data here
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // Handle errors here (e.g., show error message to user)
    }

  }



  const showGalleryImages = (id) => {
    setClicked((prevClicked) => {
      const newClicked = [...prevClicked];
      if( prevClickedItem !== id){
       newClicked[prevClickedItem] = false;
       setPrevClickedItem(id)
      }
      newClicked[id] = !newClicked[id];
       
      return newClicked;
    });
  }

    let [ cartData , setCartData ] = useState([]);
    console.log('cartdata' , cartData);
  
           
  //     const [ show , setShow ] = useState(false);

 
        
  useEffect (() =>{
     if(cartLink === true ) {  fetchCartItems(); }
  },[])
 
   
  


  const fetchCartItems = async() =>{
    try {
      console.log('Fetching cart items...');
      const response = await axios.get(`${REACT_APP_API_URL}/api/products/`, { headers });

      setCartData(response.data);

      // Handle cart items data here
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // Handle errors here (e.g., show error message to user)
    }
  }
   
     
    const deleteProductfromCart = async(item)=>{
      try{
        let response = await axios.delete(`${REACT_APP_API_URL}/api/products/${item._id}`,  {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      });
      fetchCartItems();
     }
       catch(err){
           console.log('err', err);
       }   
    }

  return (
  <div>
  {
    cartData?.map((it , id)=>{
     
      return(
  <div style={{display:"flex"}}>
    <div>
    <Card style={{ width: '30rem' , marginLeft:'50%' }} key={id}>
      <Card.Img variant="top" src = {`${it.image}`}  />
      <Card.Body>
        <Card.Title style={{backgroundColor:'lightgreen'}}>{`${it.name}`}</Card.Title>
        <Card.Title style={{backgroundColor:'yellow'}}>Price : ${`${it.price}`}</Card.Title>
       
       { 
        (!buyProd[it])?<>
       <Button variant="primary" style={{ backgroundColor:'green'}} onClick={()=>buyProduct(it)}>Buy Now</Button></>
         : <><StripeCheckout>
             
          </StripeCheckout></>
      }

        <Button style={{margin:"10px", backgroundColor:'red'}}variant="primary" onClick={(e)=>deleteProductfromCart(it)}>Remove</Button>
       
       {
         !clicked[id]?<><Button variant="primary" style={{ backgroundColor:'purple'}} onClick={()=>showGalleryImages(id)}>Show galleryImages</Button>
      
        </>: <Button variant="primary" style={{ backgroundColor:'purple'}} onClick={()=>showGalleryImages(id)}>Close galleryImages</Button>
       }
         {
          clicked[id] &&   <GalleryImages images={it.galleryImages} name={it.name} />
        }
      </Card.Body>
    </Card> 
    </div>
  </div>
    )
    })
  }
  </div>
  )
}

export default Cart

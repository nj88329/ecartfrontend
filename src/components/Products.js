import React , { useState , useEffect } from 'react';
import { useGetProductQuery } from '../services/productApi';
import  ShowItems  from './ShowItems.js';

import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const Products = () => {

  const { data : productList , isFetching } = useGetProductQuery();
   console.log( 'first' , productList)

   const [ product , setProduct ] = useState( productList ); 

  useEffect(()=>{
    setProduct(productList)
  },[isFetching])
  console.log( 'fp' , product)

   
  return (
    <>
    { 
         product ?  <ShowItems product={product.results}/> : <Box padding='6' boxShadow='lg' bg='white'>
         <SkeletonCircle size='10' />
         <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
         <h3>LOADING</h3>
       </Box>
    }
    </>
  )
}

export default Products

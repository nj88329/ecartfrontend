// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const headers = {
  'X-RapidAPI-Host' : 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com',
  'X-RapidAPI-Key': '0a4a15f8b1msh67ff19cb5779a22p18611bjsn5726ff736a76'
}



export const productApi = createApi({
  // Set the baseUrl for every endpoint below 
  reducerPath : 'productApi',
  baseQuery :  fetchBaseQuery({ 
    baseUrl: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com',
    headers
    } ),
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () =>({
           url :  `/products/list`     
    })
        }),
    }),
});



 export const { useGetProductQuery } = productApi;
 



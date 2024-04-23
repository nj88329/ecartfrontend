import { createSlice } from '@reduxjs/toolkit'
import { store } from '../app/store.js'

const initialState = {
  item : [],
  price:0,
   cartLink : false,
   loginScreen : true
}

export const cartSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state , action) => {
      
     if(state.item !== null  && state.item !== undefined ){
      console.log('payload' , action.payload);
      state.item=[...state.item, action.payload]
      state.price += action.payload.price.value; 
      console.log('payload' , action.payload);
      console.log('stateite', JSON.parse(JSON.stringify(state.item)));
     }
      else {
       state.item = [action.payload];
       state.price += action.payload.price.value; 
       console.log('stateite', JSON.parse(JSON.stringify(state.item)));
      }
        console.log('disp', JSON.parse(JSON.stringify(state.item)))
    },
    cartScreen : (state) => {
         state.cartLink = (!state.cartLink)
    },
    loginLogout : (state , action) => {
      state.cartLink = false;
        if(action.payload === false) localStorage.setItem('token' , "");
       state.loginScreen = (!state.loginScreen)
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment ,  cartScreen , loginLogout  } = cartSlice.actions

export default cartSlice.reducer;
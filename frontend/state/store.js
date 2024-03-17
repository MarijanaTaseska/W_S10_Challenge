import { configureStore } from '@reduxjs/toolkit'
import { usersApi } from './usersAPi'
import formReducer from './ordersSlice'




// const exampleReducer = (state = { 
//   }) => {
//    return state
//   }

export const resetStore = () => configureStore({
   reducer: {
    form: formReducer,
   [usersApi.reducerPath] : usersApi.reducer
  //  add your reducer(s) here
  },
  middleware: getDefault => getDefault().concat(
    usersApi.middleware
    // if using RTK Query for your networking: add your middleware here
   
  ),
})

export const store = resetStore()

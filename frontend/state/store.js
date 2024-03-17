import { configureStore } from '@reduxjs/toolkit'
import { usersApi } from './usersAPi'


export const resetStore = () => configureStore({
   reducer: {
    
   [usersApi.reducerPath] : usersApi.reducer
  //  add your reducer(s) here
  },
  middleware: getDefault => getDefault().concat(
    usersApi.middleware
    // if using RTK Query for your networking: add your middleware here
   
  ),
})

export const store = resetStore()

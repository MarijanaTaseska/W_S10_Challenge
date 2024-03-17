import { createSlice } from '@reduxjs/toolkit'

const initialState = {  
   fullName: '',
   size: '',
   toppings: [
      { id: "1", checked: false },
      { id: "2", checked: false },
      { id: "3", checked: false },
      { id: "4", checked: false },
      { id: "5", checked: false }
    ]
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    changeName : (state,action ) => {
      return {...state, fullName:action.payload}
    },
    checkboxTopping : (state, action) => {
      const checkboxId = action.payload;
      state.toppings = state.toppings.map(checkbox =>
        checkbox.id === checkboxId
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    },
    sizeChange() {
      
    },
  },
})

export const { changeName, checkboxTopping, sizeChange } = formSlice.actions
export default formSlice.reducer
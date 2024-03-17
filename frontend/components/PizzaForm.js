import React,{useReducer} from 'react'
import { useCreateOrderMutation } from '../state/usersAPi'


const CHANGE_NAME = 'CHANGE_NAME'
const CHECKED_TOPPING = 'CHECKED_TOPPING'
const SIZE_CHANGE = 'SIZE_CHANGE'
const RESET_FORM = 'RESET_FORM'

const initialState = { // suggested
  fullName: '',
  size: '',
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
}


const reducer = (state=initialState, action) =>{
  switch (action.type){
    case CHANGE_NAME: 
      return {...state , fullName: action.payload}
    case CHECKED_TOPPING:
      return { 
        ...state,[action.payload]: !state[action.payload]
      }
    case SIZE_CHANGE:
      return {...state , size:action.payload}
    case RESET_FORM:
      return initialState
      default:
        return state
  }
}

export default function PizzaForm() {
const [state,dispatch] = useReducer(reducer,initialState)
const [createOrder, {error: creationError,isLoading:loadingOrder}] = useCreateOrderMutation()



  const checkedToppings = Object.keys(state)
  .filter(key => key !== 'fullName' && key !== 'size') 
  .filter(key => state[key])
  


const onLabelChange = ({target:{value}}) =>{
dispatch({type:CHANGE_NAME, payload:value})
}

const handleCheboxChange = (checkedToppings) =>{
  dispatch({type:CHECKED_TOPPING, payload:checkedToppings})
}

const handleSizeChange =(evt) => {
dispatch({type:SIZE_CHANGE, payload:evt.target.value})

}

const resetForm = () =>{
 dispatch({type:RESET_FORM})
 dispatch({type:SIZE_CHANGE,payload:""})
}


const onSubmit = async evt => {
  evt.preventDefault()
  const {fullName,size} = state
 
  const user = {
    fullName:fullName,
    size:size,
    toppings:checkedToppings
  }
  createOrder(user)
  .unwrap()
  .then(data => {
    resetForm(data)
    console.log(data)
  })
 .catch(err =>{
  console.log(err)
 })
}
 
  
  return (
    <form onSubmit={onSubmit}>
      <h2>Pizza Form</h2>
      {loadingOrder && <div className='pending'>Order in progress...</div>}
      {creationError && <div className='failure'>Order failed: {creationError.data.message} </div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={state.fullName}
            onChange={onLabelChange}
            
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select  value={state.size} onChange={handleSizeChange} data-testid="sizeSelect" id="size" name="size">
            <option value=''>----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input checked={state['1']} onChange={()=>handleCheboxChange('1')} data-testid="checkPepperoni" name="1" type="checkbox" />
          Pepperoni<br /></label>
        <label>
          <input checked={state['2']} onChange={()=>handleCheboxChange('2')} data-testid="checkGreenpeppers" name="2" type="checkbox" />
          Green Peppers<br /></label>
        <label>
          <input checked={state['3']} onChange={()=>handleCheboxChange('3')} data-testid="checkPineapple" name="3" type="checkbox" />
          Pineapple<br /></label>
        <label>
          <input checked={state['4']} onChange={()=>handleCheboxChange('4')} data-testid="checkMushrooms" name="4" type="checkbox" />
          Mushrooms<br /></label>
        <label>
          <input checked={state['5']} onChange={()=>handleCheboxChange('5')} data-testid="checkHam" name="5" type="checkbox" />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}

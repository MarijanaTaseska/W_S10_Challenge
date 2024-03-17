import React,{useState} from 'react'
import {useGetAllOrdersQuery} from "../state/usersAPi";

export default function OrderList() {

 const {data:orders} = useGetAllOrdersQuery()
 const [selectedSize, setSelectedSize] = useState('All');


  const handleSizeFilter = (size) => {
    setSelectedSize(size);
  };

  const filteredOrders = selectedSize === 'All' ? orders : orders.filter(order => order.size === selectedSize);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filteredOrders?.map(order => {
            return (
              <li key={order.id}>
               <div>
                 {order.customer} ordered a size {order.size} with {order.toppings?.length > 0 ? 
              `${order.toppings.length} ${order.toppings.length === 1 ? 'topping' : 'toppings'}` 
              : 'no toppings'}
                 </div> 
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
          const className = `button-filter ${size === selectedSize ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick ={() => handleSizeFilter(size)}
              >{size}</button>
          })
        }
      </div>
    </div>
  )
}

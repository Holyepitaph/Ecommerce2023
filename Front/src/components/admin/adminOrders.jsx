import { AdminMenu } from "./adminMenu"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import orderService from "../../services/orders"

const OrderStatusForm = ({order,newStatus}) =>{
  const [status, setStatus] = useState('')



  const changeStatus = async (e) =>{
    e.preventDefault()
     newStatus({
      id:order.id,
      status:status,
      username: order.user.username
    })


  }

  return(
    <>
      <form className="my-4 bg-accentA border-accentB border-2 rounded-2xl pt-2 pl-4 mr-4 text-textB" onSubmit={changeStatus}>
        <label>
          Change Status: 
          <select    
          className="w-10/12"      
          value={status}
          onChange={({ target }) => setStatus(target.value)}>
            <option value=""/>
            <option value='Not Prepared'>Not Prepared</option>
            <option value='Items Prepared'>Items Prepared</option>
            <option value='Items at Delivery Company'>Items at Delivery Company</option>
            <option value='Items Delivered'>Items Delivered</option>
            <option value='Order on Standby'>Order on Standby</option>
            <option value='Order Canceled'>Order Canceled</option>
          </select>
        </label>
        <button className="border-accentC border-2 bg-accentD w-11/12 mr-4 my-4 active:translate-y-2 active:scale-y-90 focus:border-black" type="submit" >Change Order Status</button>
      </form>
    </>
  )
}


//Display all Orders
export const AdminOrders = ({user,admin,items}) =>{
    const [order, setOrder] = useState([])

    
      useEffect(()=>{
        const orderTest = async () =>{
          const response = await orderService.getAll()
          return setOrder(response)
        }
        orderTest()
      },[])


      const updateStatus = async (newStatus) =>{
        console.log(newStatus)
        if (window.confirm(`Update ${newStatus.username} order?`)) {
          await orderService.updateOrder(newStatus)
          const response = await orderService.getAll()
          setOrder(response)
      
          }
      }


  

    
      if(!order){
        return(
          <div className="w-screen px-4">
          <div>
            <AdminMenu/>
          </div>
            Now Loading
          </div>
        )
      }
    
      return(
        <div className="w-full px-4 mt-20  mb-6 text-textA">
        <div className="sm:grid-cols-3 w-full grid grid-cols-1 gap-4 mt-4 shadow-xl">
          {order.sort((a,b)=>b.id-a.id).map(x=>(
            <div className="bg-main border-accentB border-4 rounded-2xl pl-4 py-4" key={x.id}>
              <div>Name: {x.user.name}</div>
              <div>Username: {x.user.username}</div>
              <div>Status Date: {x.dateOfStatus}</div>
              <div>Status: {x.status}
               <OrderStatusForm order={x} newStatus={updateStatus}/>
              </div>
              <div>Cost: {x.totalCost}</div>
              <div>Sale: {x.totalSale}</div>
              <div className="bg-accentA border-accentB border-2 rounded-2xl px-2 mt-4 mr-4 shadow-2xl py-2">
                  <div className="text-textB">Address : </div>
                  {x.addresses.map(x=>(
                    <ul className="pl-4 text-textB" key={x.id}>
                      <li>Address Type: {x.addressType}</li>
                      <li>City: {x.city}</li>
                      <li>Country: {x.country}</li>
                      <li>State: {x.state}</li>
                      <li>Street: {x.street}</li>
                      <li>Zipcode: {x.zipcode}</li>
                    </ul>
                  ))}
              </div>
              <div className="bg-accentA border-accentB border-2 rounded-2xl px-2 mt-4 mr-4 shadow-2xl py-2 text-textB">
                   <div>Items</div>
                   <ul >
                   {x.items.map(x=>(
                     <Link className="pl-4" to={`/admin/Item/${x.id}`} key={x.id}>
                       <li>Item: {x.name}</li>
                       <li>Quantity: {x.orderItem.quantity}</li>
                       <li>Desc: {x.description}</li>
                       <li>Cost: {x.cost}</li>
                       <li>Purchase Price{x.orderItem.priceAtPurchase}</li>
                       <br/>
                     </Link>
                   ))}
                   </ul>
              </div>
              <br/>
            </div>
          ))}
          </div>
        </div>
      )
    }
    
    // Display Single Order
    export const AdminSingleOrders = ({user,admin,items, deleteOrder}) =>{
      const [order, setOrder] = useState(null)
      const id = useParams().orderId
      
    
      useEffect(()=>{
        const orderTest = async () =>{
          const response = await orderService.getAll()
          const single = response.filter(x=>x.id == id)
          return setOrder(single)
        }
        orderTest()
      },[])

      const delOrder = async (info) =>{
        if (window.confirm(`Please Make sure User was notified and Items were not sent. Delete Order?`)) {
          await orderService.deleteOrder(info)
          deleteOrder()
          }
      }
  
    
      if(!order){
        return(
          <div className="w-full px-4">
            Loading
          </div>
        )
      }
    
      return(
        <div className="mt-20 w-screen px-4 mb-6 text-textA">
          <div className="bg-main border-accentB border-4 rounded-2xl pl-4">
            <div className="flex flex-col gap-2 pt-2">
                <div>Status: {order[0].status}</div>
                <div>Total Cost: {order[0].totalCost}</div>
                <div>Total Sale: {order[0].totalSale}</div>
                <div>Status Date: {order[0].dateOfStatus}</div>
                <div>Username: {order[0].user.username}</div>
                <div>Name: {order[0].user.name}</div>
                <div>Email: {order[0].user.email}</div>
                <div>Phone: {order[0].user.phone}</div>
            </div>
            <div className="bg-accentA border-accentB border-2 rounded-2xl pt-2 px-2 mt-4 mr-4 text-textB">
                <div>Address</div>
                {order[0].addresses.map(x=>(
                  <ul className="pl-4" key={x.id}>
                    <li>Address Type: {x.addressType}</li>
                    <li>Street: {x.street}</li>
                    <li>City: {x.city}</li>
                    <li>State: {x.state}</li>
                    <li>Country: {x.country}</li>
                    <li>Zipcode: {x.zipcode}</li>
                    <div className="border border-gray-800 w-11/12 my-4"/>
                  </ul>
                ))}
            </div>
            <div className="bg-accentA border-accentB border-2 rounded-2xl py-2 px-2 mt-4 mr-4 text-textB">
                <div>Items</div>
                {order[0].items.sort((a, b)=> a.id - b.id).map(x=>(
                  <ul className="pl-4" key={x.id}>
                    <li>Name: {x.name}</li>
                    <li>Desc.: {x.description}</li>
                    <li>Cost: {x.cost}</li>
                    <li>Purchase Price: {x.orderItem.priceAtPurchase}</li>
                    <li>Quantity: {x.orderItem.quantity}</li>
                    <div className="border border-gray-800 w-11/12 my-4"/>
                  </ul>
                ))}
            </div>
            <Link to="/admin/Users"><button className="sm:w-[98%] sm:mx-0 w-[94%] mb-8 mt-4 text-textB bg-mainAlt border-accentB border-2" onClick={()=>delOrder(order[0].id)}>Delete Order</button></Link>
            <br/>
          </div>
        </div>
      )
    }
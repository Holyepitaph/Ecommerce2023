import { UserMenu } from "./userMenu"
import { useState } from "react"
import orderServices from "../../services/orders"
import addressOrderServices from "../../services/addressOrder"
import orderItemServices from "../../services/orderItem"
import cartItemServices from "../../services/cartItem"
import { useNavigate } from "react-router-dom"



const NewAddress = ({ newAddressInfo}) =>{
    const [addressType, setAddressType] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [zipcode, setZipcode] = useState("")
    
    
      const change = (e) =>{
        e.preventDefault()
        newAddressInfo({
            addressType:addressType,
            street: street,
            city: city,
            state: state,
            country: country,
            zipcode: zipcode
        })
        setAddressType('')
        setStreet('')
        setCity('')
        setState('')
        setCountry('')
        setZipcode('')
      }
    
      return(
        <div className="bg-gray-800 pl-4 flex flex-col gap-2 py-4 rounded-2xl">
           <form className="flex flex-col gap-3" onSubmit={change}>
           <div>New Address: </div>
           <label>
              <span className="mr-4">Address Type:</span>  
              <select          
              value={addressType}
              onChange={({ target }) => setAddressType(target.value)}>
                <option value=""/>
                <option value='Shipping'>Shipping</option>
                <option value='Billing'>Billing</option>
              </select>
            </label>
            <div>
              <span className="mr-4">Street Line:</span>
              <input 
                type='text'
                value={street}
                onChange={({target})=>setStreet(target.value)}
              />
            </div>
            <div>
              <span className="mr-4">City: </span> 
              <input 
                type='text'
                value={city}
                onChange={({target})=>setCity(target.value)}
              />
            </div>
            <div>
              <span className="mr-4">State: </span>
              <input
                type="text"
                value={state}
                onChange={({target})=>setState(target.value)}
              />
            </div>
            <div>
              <span className="mr-4">Country:</span>
              <input
                type="text"
                value={country}
                onChange={({target})=>setCountry(target.value)}
              />
            </div>
            <div>
              <span className="mr-4">Zipcode:</span> 
              <input
                type="number"
                value={zipcode}
                onChange={({target})=>setZipcode(target.value)}
              />
            </div>
            <button className="bg-black w-11/12 ml-3 mt-3" type="submit">
              Send
            </button>
          </form>
        </div>
      )
    }

export const UserAddress = ({address,cart,update, newAddress}) => {
    const navigate = useNavigate()


    if(!cart){
        return(
        <>
            <div>Loading</div>
        </>
        )
    }else{
        const totalSale = cart.items.map(x=>x.price).reduce((x,i)=>x+i,0)
        const totalCost = cart.items.map(x=>x.cost).reduce((x,i)=>x+i,0)
        const itemIds = cart.items
    
        const createOrder =async (address) =>{
            const newOrderDetails = {
                totalSale:totalSale,
                totalCost:totalCost
            } 
            //send to order then take response
            const newOrder = await orderServices.createOrder(newOrderDetails)
            const newAddressOrderDetails = {
                addressId: address,
                orderId: newOrder.id
            }
            await addressOrderServices.createOrder(newAddressOrderDetails)
            itemIds.map(async (x)=> await orderItemServices.createOrderItem({itemId: x.id, orderId: newOrder.id, quantity: x.cartItem.quantity}))
            itemIds.map(async (x)=> await cartItemServices.deleteCartItem({itemId:x.id}))
            update({test:"test"})
            navigate(`/user/Orders/${newAddressOrderDetails.orderId}`)
        }

        const newAddressInfo = (info) =>{
            newAddress({...info})
        }
    
        return(
            <div className="w-screen px-4 mt-4 flex flex-col gap-4">
                <UserMenu/>
              <div className="bg-gray-800 px-4 flex flex-col gap-2 py-4 rounded-2xl">
                  <div>Select Address: </div>
                  <div className="w-full grid grid-cols-3 gap-4">
                  {address.map(x=>(
                      <ul key={x.id}>
                          <button onClick={()=>createOrder(x.id)}>
                          <li>Address Type: {x.addressType}</li>
                          <li>Street: {x.street}</li>
                          <li>City: {x.city}</li>
                          <li>State: {x.state}</li>
                          <li>Country: {x.country}</li>
                          <li>Zipcode: {x.zipcode}</li>
                          </button>
                      </ul>
                  ))}
                  </div>
              </div>
                <NewAddress newAddressInfo={newAddressInfo}/>
            </div>
        )
    }

}
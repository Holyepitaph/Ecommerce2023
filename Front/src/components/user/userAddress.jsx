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
        <div className="bg-main border-accentB border-4 pl-4 flex flex-col gap-2 py-4 rounded-2xl">
           <form className="flex flex-col gap-3" onSubmit={change}>
           <div>New Address: </div>
           <label>
              <span className="mr-4">Address Type:</span>  
              <select          
              className="sm:w-[12.25rem] w-[8.7rem]"
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
                className="sm:w-[13.5rem] w-[16rem] mt-2"
                type='text'
                value={street}
                onChange={({target})=>setStreet(target.value)}
              />
            </div>
            <div>
              <span className="mr-4">City: </span> 
              <input 
                className="sm:w-[14.5rem] ml-[1.7rem] w-[11rem]"
                type='text'
                value={city}
                onChange={({target})=>setCity(target.value)}
              />
            </div>
            <div>
              <span className="mr-4">State: </span>
              <input
                className="sm:w-[14.5rem] ml-[1.22rem] w-[11rem]"
                type="text"
                value={state}
                onChange={({target})=>setState(target.value)}
              />
            </div>
            <div>
              <span className="mr-4">Country:</span>
              <input
                className="sm:w-[14.5rem] ml-0.5 w-[11rem]"
                type="text"
                value={country}
                onChange={({target})=>setCountry(target.value)}
              />
            </div>
            <div>
              <span className="mr-4">Zipcode:</span> 
              <input
                className="sm:w-[14.5rem] w-[11rem]"
                type="number"
                value={zipcode}
                onChange={({target})=>setZipcode(target.value)}
              />
            </div>
            <button className="bg-mainAlt border-accentB border-2 w-11/12 ml-1 mt-3" type="submit">
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
        if(address.length == 0){
          return(
            <div className="sm:grid-cols-2 w-full px-4 mt-20 grid grid-cols-1 gap-4">
              <div className="bg-main border-accentB border-4 px-4 flex flex-col gap-2 py-4 rounded-2xl">
                <div>Please Create an Address</div>
              </div>
              <NewAddress newAddressInfo={newAddressInfo}/>
            </div>
          )
        } else{
          return(
            <div className="sm:grid-cols-2 w-full px-4 mt-20 grid grid-cols-1 gap-4">
              <div className="bg-main border-accentB border-4 px-4 flex flex-col gap-2 py-4 rounded-2xl">
                  <div>Select Address: </div>
                  <div className="w-full grid grid-cols-2 gap-4">
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
                
            </div>
        )
        }
    

    }

}
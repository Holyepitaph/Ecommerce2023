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
        <>
           <form onSubmit={change}>
           <div>New Address: </div>
           <label>
              Address Type:  
              <select          
              value={addressType}
              onChange={({ target }) => setAddressType(target.value)}>
                <option value=""/>
                <option value='Shipping'>Shipping</option>
                <option value='Billing'>Billing</option>
              </select>
            </label>
            <div>
              Street Line:
              <input 
                type='text'
                value={street}
                onChange={({target})=>setStreet(target.value)}
              />
            </div>
            <div>
              City:  
              <input 
                type='text'
                value={city}
                onChange={({target})=>setCity(target.value)}
              />
            </div>
            <div>
              State: 
              <input
                type="text"
                value={state}
                onChange={({target})=>setState(target.value)}
              />
            </div>
            <div>
              Country
              <input
                type="text"
                value={country}
                onChange={({target})=>setCountry(target.value)}
              />
            </div>
            <div>
              Zipcode: 
              <input
                type="number"
                value={zipcode}
                onChange={({target})=>setZipcode(target.value)}
              />
            </div>
            <button type="submit">
              Send
            </button>
          </form>
        </>
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
            <>
                <UserMenu/>
                <div>Select Address: </div>
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
                <NewAddress newAddressInfo={newAddressInfo}/>
            </>
        )
    }

}
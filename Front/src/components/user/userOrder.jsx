import { UserMenu } from "./userMenu"
import { useParams } from "react-router-dom"
import orderServices from "../../services/orders"
import { useState } from "react"

export const UserSingleOrder = ({orders})=>{
    const id = useParams().orderId
    const single = orders.filter(x=>x.id == id)


  
    return(
        <>
            <UserMenu/>
            {single.map(x=>(
                <ul key={x.id}>
                    <li>Delivery Status: {x.status}</li>
                    <li>Total Sale: {x.totalSale}</li>
                    <li>Order Date: {x.dateOfStatus}</li>
                    <div>Addresses: </div>
                    {x.addresses.map(x=>(
                        <ul key={x.id}>
                            <li>Address Type: {x.addressType}</li>
                            <li>Street: {x.street}</li>
                            <li>City: {x.city}</li>
                            <li>State: {x.state}</li>
                            <li>Country: {x.country}</li>
                            <li>Zipcode: {x.zipcode}</li>
                            <br/>
                        </ul>
                    ))}
                    <div>Items: </div>
                    {x.items.map(x=>(
                        <ul key={x.id}>
                            <li>Name: {x.name}</li>
                            <li>Description: {x.description}</li>
                            <li>Purchase Price: {x.orderItem.priceAtPurchase}</li>
                            <li>Quantity: {x.orderItem.quantity}</li>
                            <li>Image: {x.image}</li>
                            <br/>
                        </ul>
                    ))}

                </ul>
            ))}
        </>
    )
}

const Cancel = ({info,cancelOrder}) =>{
    const [error, setError] = useState(null)


    const test =async () =>{
        if(info.status== "Not Prepared"){
            await orderServices.updateOrder({id: info.id, status: "User Requested Cancelation"})
            cancelOrder()
            setError("Admin advised of Cancelation")
            setTimeout(() => {
                setError(null)
              }, 5000)
        } else{
            setError("Item already in preparation. Please Admin contact for more information.")
            setTimeout(() => {
                setError(null)
              }, 5000)
        }
    }

    return(
        <>
                    {error}
                    <button onClick={()=>test(info)}>Cancel Order</button>
        </>

    )
}

export const UserOrder = ({orders, deleteOrder})=>{

    const cancelOrder=  ()=>{
        deleteOrder()
    }

    return(
        <>
            <UserMenu/>

            {orders.sort((a,b)=>b.id - a.id).map(x=>(
                <ul key={x.id}>
                    <li>Delivery Status: {x.status}</li>
                    <li>Total Sale: {x.totalSale}</li>
                    <li>Order Date: {x.dateOfStatus}</li>
                    <div>Addresses: </div>
                    {x.addresses.map(x=>(
                        <ul key={x.id}>
                            <li>Address Type: {x.addressType}</li>
                            <li>Street: {x.street}</li>
                            <li>City: {x.city}</li>
                            <li>State: {x.state}</li>
                            <li>Country: {x.country}</li>
                            <li>Zipcode: {x.zipcode}</li>
                            <br/>
                        </ul>
                    ))}
                    <div>Items: </div>
                    {x.items.map(x=>(
                        <ul key={x.id}>
                            <li>Name: {x.name}</li>
                            <li>Description: {x.description}</li>
                            <li>Purchase Price: {x.orderItem.priceAtPurchase}</li>
                            <li>Quantity: {x.orderItem.quantity}</li>
                            <li>Image: {x.image}</li>
                            <br/>
                        </ul>
                    ))}
                        <Cancel info={x} cancelOrder={cancelOrder}/>
                </ul>
            ))}
        </>
    )
}
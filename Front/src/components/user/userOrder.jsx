import { UserMenu } from "./userMenu"
import { useParams } from "react-router-dom"
import orderServices from "../../services/orders"
import { useState } from "react"
import {ImagesViewer} from "../image"

export const UserSingleOrder = ({orders})=>{
    const id = useParams().orderId
    const single = orders.filter(x=>x.id == id)


  
    return(
        <div className="w-screen px-4 mt-4">
            <UserMenu/>
            <div>
            {single.map(x=>(
                <ul className="flex flex-col gap-4 mt-4" key={x.id}>
                <div className="bg-gray-800 pl-4 flex flex-col gap-2 py-4 rounded-2xl">
                    <li>Delivery Status: {x.status}</li>
                    <li>Total Sale: {x.totalSale}</li>
                    <li>Order Date: {x.dateOfStatus}</li>
                </div>
                <div className="bg-gray-800 pl-4 flex flex-col gap-2 py-4 rounded-2xl">
                <div>Address: </div>
                    {x.addresses.map(x=>(
                        <ul className="bg-gray-900 rounded-2xl px-4 mt-4 mr-4 pt-4"
 key={x.id}>
                            <li>Address Type: {x.addressType}</li>
                            <li>Street: {x.street}</li>
                            <li>City: {x.city}</li>
                            <li>State: {x.state}</li>
                            <li>Country: {x.country}</li>
                            <li>Zipcode: {x.zipcode}</li>
                            <br/>
                        </ul>
                    ))}
                </div>
                <div className="bg-gray-800 pl-4 flex flex-col gap-4 py-4 rounded-2xl">
                    <div>Items: </div>
                    {x.items.map(x=>(
                        <ul 
                          className="bg-gray-900 rounded-2xl flex justify-around items-center py-6 pl-6 mr-4"
                          key={x.id}>
                            <div className="border border-black rounded-2xl  p-4 bg-gray-600">
                                <li>Name: {x.name}</li>
                                <li>Description: {x.description}</li>
                                <li>Purchase Price: {x.orderItem.priceAtPurchase}</li>
                                <li>Quantity: {x.orderItem.quantity}</li>
                            </div>
                            <ImagesViewer change={"h-32 rounded-2xl border-2 border-black"} info={x.image}/>
                            <br/>
                        </ul>
                    ))}
                </div>
                </ul>
            ))}
            </div>
        </div>
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
                    <button className="w-11/12 mt-2" onClick={()=>test(info)}>Cancel Order</button>
        </>

    )
}

export const UserOrder = ({orders, deleteOrder})=>{

    const cancelOrder=  ()=>{
        deleteOrder()
    }

    return(
        <div className="w-screen px-4">
            <UserMenu/>
            <div className="w-full grid grid-cols-2 gap-4">
            {orders.sort((a,b)=>b.id - a.id).map(x=>(
                <ul  className="bg-gray-800 pl-4 flex flex-col gap-2 py-4 rounded-2xl" key={x.id}>
                    <li>Delivery Status: {x.status}</li>
                    <li>Total Sale: {x.totalSale}</li>
                    <li>Order Date: {x.dateOfStatus}</li>
                    <div className="bg-gray-900 rounded-2xl px-2 mt-4 mr-4">
                        <div>Addresses: </div>
                        {x.addresses.map(x=>(
                            <ul className="ml-2" key={x.id}>
                                <li>Address Type: {x.addressType}</li>
                                <li>Street: {x.street}</li>
                                <li>City: {x.city}</li>
                                <li>State: {x.state}</li>
                                <li>Country: {x.country}</li>
                                <li>Zipcode: {x.zipcode}</li>
                                <br/>
                            </ul>
                        ))}
                    </div>
                    <div className="bg-gray-900 rounded-2xl px-2 mt-4 mr-4">
                        <div>Items: </div>
                        {x.items.map(x=>(
                            <ul className="ml-2" key={x.id}>
                                <li>Name: {x.name}</li>
                                <li>Description: {x.description}</li>
                                <li>Purchase Price: {x.orderItem.priceAtPurchase}</li>
                                <li>Quantity: {x.orderItem.quantity}</li>
                                <li>Image: {x.image}</li>
                                <br/>
                            </ul>
                        ))}
                    </div>
                        <Cancel info={x} cancelOrder={cancelOrder}/>
                </ul>
            ))}
            </div>
        </div>
    )
}
import { UserMenu } from "./userMenu"
import { useParams } from "react-router-dom"
import orderServices from "../../services/orders"
import { useState } from "react"
import {ImagesViewer} from "../image"

export const UserSingleOrder = ({orders})=>{
    const id = useParams().orderId
    const single = orders.filter(x=>x.id == id)

    if(single == 0){
        return(
            <div className="mt-4 w-full px-4">
                <div className="bg-main border-accentB border-4 px-4 py-4 rounded-2xl mt-4">
                    Order is Empty. Maybe Buy Some Stuff ?
                </div>
            </div>
        )
    }
  
    return(
        <div className="sm:w-[calc(100vw-1rem)] w-full px-4 mt-20 text-textA">
            <div>
            {single.map(x=>(
                <ul className="sm:grid-cols-2 grid grid-cols-1 gap-4 mt-4" key={x.id}>
                <div className="bg-main border-accentB border-4 pl-4 flex flex-col gap-2 py-4 rounded-2xl">
                    <li>Delivery Status: {x.status}</li>
                    <li>Total Sale: {x.totalSale}</li>
                    <li>Order Date: {x.dateOfStatus}</li>
                </div>
                <div className="bg-main border-accentB border-4 pl-4 flex flex-col gap-2 py-4 rounded-2xl">
                <div>Address: </div>
                    {x.addresses.map(x=>(
                        <ul className="bg-accentA border-accentB border-2 text-textB rounded-2xl px-4 mt-4 mr-4 pt-4"
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
                <div className="sm:col-span-2 bg-main border-accentB border-4 pl-4 flex flex-col gap-4 py-4 rounded-2xl mb-6">
                    <div>Items: </div>
                    <div className="sm:grid sm:grid-cols-3">
                    {x.items.map(x=>(
                        <ul 
                          className="sm:flex-row sm:py-4 bg-accentA border-accentB border-2 text-textB rounded-2xl flex flex-col px-2 justify-around gap-4 items-center pt-8  mr-4"
                          key={x.id}>
                            <div className="border-accentB border-2 rounded-2xl  p-4 bg-accentD">
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
                    <button className="w-11/12 mt-2 border-accentB border-2 bg-mainAlt text-textB" onClick={()=>test(info)}>Cancel Order</button>
        </>

    )
}

export const UserOrder = ({orders, deleteOrder})=>{

    const cancelOrder=  ()=>{
        deleteOrder()
    }

    return(
        <div className="w-full px-4 mt-20 mb-6">
            <div className="sm:grid-cols-3 w-full grid grid-cols-1 gap-4">
            {orders.sort((a,b)=>b.id - a.id).map(x=>(
                <ul  className="bg-main border-accentB border-4 text-textA pl-4 flex flex-col gap-2 py-4 rounded-2xl" key={x.id}>
                    <li>Delivery Status: {x.status}</li>
                    <li>Total Sale: {x.totalSale}</li>
                    <li>Order Date: {x.dateOfStatus}</li>
                    <div className="bg-accentA border-accentB border-2 text-textB rounded-2xl pt-2 px-2 mt-4 mr-4">
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
                    <div className="bg-accentA border-accentB border-2 text-textB rounded-2xl pt-2 px-2 mt-4 mr-4">
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
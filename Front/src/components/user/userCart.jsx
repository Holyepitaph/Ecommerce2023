import { UserMenu } from "./userMenu"
import { Link } from "react-router-dom"
import {ImagesViewer} from "../image"


export const UserCart = ({cart,removeFromCart}) =>{


    const removeItem = (item) =>{
        removeFromCart({
            itemId: item
        })
    }

if(cart.items.length == 0){
    return(
        <div className="mt-4 w-screen px-4">
            <div className="text-center bg-main border-accentB border-4 text-textA px-4 py-4 rounded-2xl mt-4">
                Cart is Empty. Maybe Buy Some Stuff ?
            </div>
        </div>
    )
}
    return(
        <div className="sm:mt-20 w-full px-4 mt-20 text-textA">
            <div className="sm:grid-cols-3 grid grid-cols-2 w-full gap-4 mt-4">
                {cart.items.map(x=>(
                    <ul className="bg-main border-accentB border-4 flex flex-col gap-2 py-4 rounded-2xl pl-2" key={x.id}>
                    <Link to={`/user/Item/${x.id}`}>
                        <ImagesViewer change={"mb-4 w-11/12"} info={x.image}/>
                        <li>Name: {x.name}</li>
                        <li>Description: {x.description}</li>
                        <li>Price: {x.price}</li>
                        <li>Stock: {x.stock}</li>
                        <li>Quantity: {x.cartItem.quantity}</li>
                        </Link>
                        <button className="border-accentB border-2 bg-mainAlt text-textB mt-4 w-11/12 mr-2" onClick={()=>removeItem(x.id)}>Remove From Cart</button>
                        <br/>
                    </ul>
                ))}
            </div>    
            <Link to="/user/Address"><button className="border-accentB border-4 my-4 w-full bg-mainAlt text-textB">Complete Purchase</button></Link>
        </div>
    )
}
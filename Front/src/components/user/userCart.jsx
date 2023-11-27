import { UserMenu } from "./userMenu"
import { Link } from "react-router-dom"


export const UserCart = ({cart,removeFromCart}) =>{


    const removeItem = (item) =>{
        removeFromCart({
            itemId: item
        })
    }

if(cart.items.length == 0){
    return(
        <>
            <UserMenu/>
            <div>
                Cart is Empty
            </div>
        </>
    )
}
    return(
        <>
            <UserMenu/>
                {cart.items.map(x=>(
                    <ul key={x.id}>
                    <Link to={`/user/Item/${x.id}`}>
                        <li>Name: {x.name}</li>
                        <li>Description: {x.description}</li>
                        <li>Price: {x.price}</li>
                        <li>Stock: {x.stock}</li>
                        <li>Image URL: {x.image}</li>
                        <li>Quantity: {x.cartItem.quantity}</li>
                        </Link>
                        <button onClick={()=>removeItem(x.id)}>Remove From Cart</button>
                        <br/>
                    </ul>
                ))}
                <Link to="/user/Address"><button>Complete Purchase</button></Link>
        </>
    )
}
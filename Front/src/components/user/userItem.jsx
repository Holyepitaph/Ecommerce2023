import { UserMenu } from "./userMenu"
import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import cartItemServices from "../../services/cartItem"

const ItemToCart = ({item, added})=>{
  const [quantity, setQuantity] = useState(0)
  const navigate = useNavigate()

    const addToCart = () =>{
      added({
        quantity: quantity,
        itemId: item.id
      })
      navigate('/user/Cart')
    }

  return(
    <>
        <div>
          <span>Quantity: </span>
          <input type="number" min={0} 
          max={item.stock} 
          value={quantity}
          onChange={({target})=>setQuantity(target.value)}>

          </input>
        </div>
        <button onClick={()=>addToCart(item.id)}>Add To Cart</button>
    </>
  )
}


// Display All Items
export const UserItems = ({items,addedToCart}) =>{


    const addToCart = (info) =>{
      addedToCart(info)
    }

    return(
    <>
    <div>
      <UserMenu/>
    </div>
    {items.map(x=>(
      <div key={x.id}>
        <Link to={`/user/Item/${x.id}`} >
          <div>Name: {x.name}</div>
          <div>Description: {x.description}</div>
          <div>Stock: {x.stock}</div>
          <div>Price: {x.price}</div>
          <div>Categories:</div>
          <ul>
          {x.categories.map(x=><li key={x.id}>{x.categoryName}</li>)}
          </ul>
          <div>Image: {x.image}</div>
          <div>Reviews: {x.reviews.map(x=>x.review)}</div>
        </Link>
          <ItemToCart item={x} added={addToCart}/>
        <br/>
        <br/>
        <br/>
      </div>

    ))}
    </>
  )
  }  


  // Display Single Item
export const UserSingleItem = ({items,addedToCart}) =>{
  const id = useParams().itemId
  const single = items.filter(x=>x.id == id)

  const addToCart = (info) =>{
    addedToCart(info)
  }

  return(
    <>
    <div>
      <UserMenu/>
    </div>
      <div>
        <div>Categories:</div>
        <ul> 
        {single[0].categories.map(x=>(<li key={x.id}>{x.categoryName} 
        </li>))}</ul>
        <div>Description: {single[0].description}</div>
        <div>Image: {single[0].image}</div>
        <div>Name: {single[0].name}</div>
        <div>Price: {single[0].price}</div>
        <div>Reviews: {single[0].reviews.map(x=>x.review)}</div>
        <div>Stock: {single[0].stock}</div>
        <ItemToCart item={single[0]} added={addToCart}/>
        <br/>
      </div>
    </>
  )
}
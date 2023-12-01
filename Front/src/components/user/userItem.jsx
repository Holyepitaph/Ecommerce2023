import { UserMenu } from "./userMenu"
import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import reviewServices from "../../services/review"
import cartItemServices from "../../services/cartItem"
import { ImagesViewer } from "../image"
import { Ratings } from "../ratings"

const ItemToCart = ({item, added, change, changeA})=>{
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
    <div className={change}>
        <div >
          <span >Quantity: </span>
          <input type="number"
          className="w-8 text-center"
           min={0} 
          max={item.stock} 
          value={quantity}
          onChange={({target})=>setQuantity(target.value)}>

          </input>
        </div>
        <button className={changeA} onClick={()=>addToCart(item.id)}>Add To Cart</button>
    </div>
  )
}



// Display All Items
export const UserItems = ({items,addedToCart}) =>{


    const addToCart = (info) =>{
      addedToCart(info)
    }

    return(
    <div className="w-full px-4 mt-20 mb-4">

    <div className="sm:grid-cols-3 grid grid-cols-2 gap-4 mt-4">
    {items.map(x=>(
      <div className="bg-main border-accentB border-4 pl-4 flex flex-col gap-2 py-4 rounded-2xl" key={x.id}>
        <Link to={`/user/Item/${x.id}`} >
          <ImagesViewer change={"w-11/12 mb-4 mr-2 rounded-xl"} info={x.image}/>
          <div>Name: {x.name}</div>
          <div>Description: {x.description}</div>
          <div>Stock: {x.stock}</div>
          <div>Price: {x.price}</div>
          <div className="bg-accentA border-accentB border-2 rounded-2xl px-2 mt-4 mr-2 py-2">
              <div>Categories:</div>
              <ul className="ml-2">
              {x.categories.map(x=><li key={x.id}>{x.categoryName}</li>)}
              </ul>
          </div>
          <Ratings change={"bg-accentA border-accentB border-2 rounded-2xl px-2 mt-4 mr-2 py-2"} info={x.reviews}/>
          <div className="bg-accentA border-accentB border-2 rounded-2xl px-2 mt-4 mr-2 py-2">
              <div>Reviews:</div>
              <ul className="ml-2"> 
              {x.reviews.map(x=><li key={x.id}>{x.review}</li>)}

              </ul>
          </div>
        </Link>
          <ItemToCart change={"flex flex-col gap-3 mt-4 pr-2"} 
          changeA={"w-11/12 text-sm bg-mainAlt border-accentB border-2"} 
          item={x} added={addToCart}/>
        <br/>
        <br/>
        <br/>
      </div>
    ))}
    </div>
    </div>
  )
  }  

  // Adds New Review
  const NewReview = ({ newReviewInfo, change}) =>{
    const [review, setReview] = useState("")
    const [rating, setRating] = useState("3")
    
    
      const changed = (e) =>{
        e.preventDefault()
        newReviewInfo({
          review: review,
          rating: rating
        })
        setReview('')
        setRating('3')
      }
    
      return(
        <div className={change}>
           <form onSubmit={changed} className="flex flex-col gap-4 ">
           <div className="text-2xl">Create Review: </div>
            <div className="sm:gap-4 flex flex-col">
              <span className="mr-4">Review:</span>
              <textarea className="sm:w-full w-64" rows={4} cols={50} value={review} onChange={({target})=>setReview(target.value)}/>
            </div>
            <div className="sm:text-center">
              <span className="mr-2">Rating: </span> 
              <input type="radio" value={rating} onClick={()=>setRating(1)} name="rating"/> 1
              <input type="radio" className="mx-2" value={rating} onClick={()=>setRating(2)} name="rating"/> 2
              <input type="radio" className="mx-2" value={rating} onClick={()=>setRating(3)} name="rating"/> 3
              <input type="radio" className="mx-2" value={rating} onClick={()=>setRating(4)} name="rating"/> 4
              <input type="radio" className="mx-2" value={rating} onClick={()=>setRating(5)} name="rating"/> 5
            </div>
            <button className="bg-mainAlt border-accentB border-2" type="submit">
              Send
            </button>
          </form>
        </div>
      )
    }




  // Display Single Item
export const UserSingleItem = ({items,addedToCart, reloadItem}) =>{
  const id = useParams().itemId
  const single = items.filter(x=>x.id == id)

  const addToCart = (info) =>{
    addedToCart(info)
  }

  const addReviewMiddleWare =async(info)=>{
      const sendIt ={
        review: info.review,
        rating: info.rating,
        id: id
      }
     await reviewServices.newReview(sendIt)
    reloadItem()
  }

  const reducedFirst = single[0].reviews.map(x=>x.rating)
  const reduced = reducedFirst.reduce((x,i)=>x+i, 0)
  return(
    <div className="w-full mt-20 px-4  mb-6">
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="h-full bg-main border-accentB border-4 rounded-2xl flex flex-col justify-around items-center gap-4 py-4">
           <ImagesViewer change={"w-11/12 rounded-2xl "} info={single[0].image}/>
           <ItemToCart change={"bg-accentA border-accentB border-2 rounded-2xl w-11/12 p-4 flex flex-col gap-4"}
            changeA={"w-11/12 text-sm bg-accentD border-accentB border-2"}
            item={single[0]} added={addToCart}/>
        </div>
        <div className="w-full bg-main border-accentB border-4 pl-4 flex flex-col gap-2 py-4 rounded-2xl">
            <div>Name: {single[0].name}</div>
            <div>Description: {single[0].description}</div>
            <div>Stock: {single[0].stock}</div>
            <div>Price: {single[0].price}</div>
            <div>Categories:</div>
            <ul> 
            {single[0].categories.map(x=>(<li key={x.id}>{x.categoryName} 
            </li>))}</ul>
            <div>Rating: {reduced/reducedFirst.length}</div>
            <div>
                  <div>Reviews:</div>
                  <ul> 
                  {single[0].reviews.map(x=>(<li key={x.id}>{x.review}</li>))}
                  </ul>
            </div>
        </div>
            <NewReview change={"bg-main border-accentB border-4 col-span-2 rounded-2xl p-4"}
             newReviewInfo={addReviewMiddleWare}/>
      </div>
    </div>
  )
}
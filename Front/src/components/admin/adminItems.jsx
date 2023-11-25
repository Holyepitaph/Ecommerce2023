import { AdminMenu } from "./adminMenu"
import { Link, useParams } from "react-router-dom"

// Display All Items
export const AdminItems = ({user,admin,items}) =>{
    return(
    <>
    <div>
      <AdminMenu/>
    </div>
    {items.map(x=>(
      <Link to={`/admin/Item/${x.id}`} key={x.id}>
        <div>ID: {x.id}</div>
        <div>Categories: {x.categories.map(x=><span key={x.id}>{x.categoryName}</span>)}</div>
        <div>Cost: {x.cost}</div>
        <div>Description: {x.description}</div>
        <div>Highest Price: {x.highestPrice}</div>
        <div>Lowest Price: {x.lowestPrice}</div>
        <div>Image: {x.image}</div>
        <div>Name: {x.name}</div>
        <div>Price: {x.price}</div>
        <div>Reviews: {x.reviews.map(x=>x.review)}</div>
        <div>Stock: {x.stock}</div>
        <br/>
      </Link>
    ))}
    </>
  )
  }  


  // Display Single Item
export const AdminSingleItem = ({user,admin,items}) =>{
  const id = useParams().itemId
  const single = items.filter(x=>x.id == id)
  console.log(single)
  return(
    <>
    <div>
      <AdminMenu/>
    </div>
      <div>
        <div>ID: {single[0].id}</div>
        <div>Categories: {single[0].categories.map(x=><span key={x.id}>{x.categoryName}</span>)}</div>
        <div>Cost: {single[0].cost}</div>
        <div>Description: {single[0].description}</div>
        <div>Highest Price: {single[0].highestPrice}</div>
        <div>Lowest Price: {single[0].lowestPrice}</div>
        <div>Image: {single[0].image}</div>
        <div>Name: {single[0].name}</div>
        <div>Price: {single[0].price}</div>
        <div>Reviews: {single[0].reviews.map(x=>x.review)}</div>
        <div>Stock: {single[0].stock}</div>
        <br/>
      </div>
    </>
  )
}
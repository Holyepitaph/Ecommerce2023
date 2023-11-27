import { AdminMenu } from "./adminMenu"
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import userService from "../../services/user"
import categoriesService from "../../services/categories"

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
        <div>Categories:</div>
        <ul>
        {x.categories.map(x=><li key={x.id}>{x.categoryName}</li>)}
        </ul>
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

  // Adds the Categories for each Item
  const EditCategories = ({item, catInfo}) =>{
    const [categories, setCategories] = useState(null)
    const [newCategory, setNewCategory] = useState("")

    useEffect(()=>{
      const categoriesTest = async () =>{    
        const catIds = item.categories.map(x=>x.id)
        const response = await categoriesService.getAll()
        const filter = response.filter(x=>!catIds.includes(x.id))
        return setCategories(filter)
      }
      categoriesTest()
    },[item])


    const changeCategory =(e) =>{
      e.preventDefault()
      catInfo({
        categoryId:newCategory,
        itemId: item.id
      })
    }

    if(!categories){
      return(
        <>
        <div>
          <AdminMenu/>
        </div>
          Now Loading
        </>
      )
    }

    return(
      <div>
      <form onSubmit={changeCategory}>
          <label>
            Change Categories: 
            <select          
              value={newCategory}
              onChange={({ target }) => setNewCategory(target.value)}>
              <option value=""/>
              {categories.map(x=><option key={x.id} value={x.id}>{x.categoryName}</option>)}
            </select>
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }

//Forms for editing Items including adding categories to items
  const EditItem = ({item, itemInfo}) =>{
    const [cost, setCost] = useState("")
    const [description, setDescription] = useState("")
    const [highestPrice, setHighestPrice] = useState("")
    const [lowestPrice, setLowestPrice] = useState("")
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
  
  

      const change = (e) =>{
        e.preventDefault()
        
        itemInfo({
          id: item.id,
          cost: cost=="" ? item.cost: Number(cost),
          description: description=="" ? item.description: description,
          highestPrice: highestPrice=="" ? item.highestPrice: Number(highestPrice),
          lowestPrice: lowestPrice=="" ? item.lowestPrice: Number(lowestPrice),
          image: image=="" ? item.image: image,
          name: name=="" ? item.name: name,
          price: price=="" ? item.price: Number(price),
          stock: stock=="" ? item.stock: Number(stock)
        })
        setCost('')
        setDescription('')
        setHighestPrice('')
        setImage('')
        setLowestPrice('')
        setName('')
        setPrice('')
        setStock('')
      }
    
      return(
        <>
           <form onSubmit={change}>
           <div>Change Information</div>
            <div>
              Cost: 
              <input 
                type='number'
                value={cost}
                onChange={({target})=>setCost(target.value)}
              />
            </div>
            <div>
              Description: 
              <input 
                type='text'
                value={description}
                onChange={({target})=>setDescription(target.value)}
              />
            </div>
            <div>
              Highest Price: 
              <input
                type="number"
                value={highestPrice}
                onChange={({target})=>setHighestPrice(target.value)}
              />
            </div>
            <div>
              Lowest Price: 
              <input
                type="number"
                value={lowestPrice}
                onChange={({target})=>setLowestPrice(target.value)}
              />
            </div>
            <div>
              Image Url: 
              <input
                type="text"
                value={image}
                onChange={({target})=>setImage(target.value)}
              />
            </div>
            <div>
              Name: 
              <input
                type="text"
                value={name}
                onChange={({target})=>setName(target.value)}
              />
            </div>
            <div>
              Price: 
              <input
                type="number"
                value={price}
                onChange={({target})=>setPrice(target.value)}
              />
            </div>
            <div>
              Stock: 
              <input
                type="number"
                value={stock}
                onChange={({target})=>setStock(target.value)}
              />
            </div>
            <button type="submit">
              Send
            </button>
          </form>
        </>
      )
    }


  // Display Single Item
export const AdminSingleItem = ({user,admin,items, updateItem, updateCat, delCat}) =>{
  const id = useParams().itemId
  const single = items.filter(x=>x.id == id)

  const updateItemInfo = async (itemInfo) =>{
      if (window.confirm(`Are you certain it's time to update ${single[0].name}`)) {
        updateItem({...itemInfo})
        }
  }

  const updateCategoryInfo = async (catInfo) =>{
    if (window.confirm(`Are you certain it's time to update ${single[0].name}`)) {
      updateCat({...catInfo})
      }
}

  const deleteCategoryInfo = (catInfoDel) =>{
    const catInfo ={
      categoryId:catInfoDel,
      itemId: Number(id)
    }
    if (window.confirm(`Remove Category from ${single[0].name} ?`)) {
      delCat({...catInfo})
      }
  }

  return(
    <>
    <div>
      <AdminMenu/>
    </div>
      <div>
        <div>ID: {single[0].id}</div>
        <div>Categories:</div>
        <ul> 
        {single[0].categories.map(x=>(<li key={x.id}>{x.categoryName} 
        <button onClick={()=>deleteCategoryInfo(x.id)}>Delete</button>
        </li>))}</ul>
        <EditCategories item={single[0]} catInfo={updateCategoryInfo}/>
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
        <EditItem item={single[0]} itemInfo={updateItemInfo}/>
      </div>
    </>
  )
}
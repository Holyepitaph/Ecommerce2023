import { AdminMenu } from "./adminMenu"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import userService from "../../services/user"
import categoriesService from "../../services/categories"
import itemServices from "../../services/items"
import {ImagesViewer} from '../image'
import {Ratings} from "../ratings"

// Display All Items
export const AdminItems = ({user,admin,items}) =>{

  

    return(
    <div className="w-full px-4 mt-16">
    <Link to="/admin/NewItem"><button className="w-full mt-4 border-accentB border-4">Create New Item</button></Link>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full py-4">
    {items.map(x=>(
      <Link className=" bg-main border-accentB border-4 rounded-2xl" to={`/admin/Item/${x.id}`} key={x.id}>
        <ImagesViewer change={"w-full rounded-2xl"} info={x.image}/>
        <div className="px-4 py-4">
          <div>ID: {x.id}</div> 
          <div>Name: {x.name}</div>
          <div>Description: {x.description}</div>
          <div>Price: {x.price}</div>
          <div>Cost: {x.cost}</div>
          <div>Highest Price: {x.highestPrice}</div>
          <div>Lowest Price: {x.lowestPrice}</div>
          <div>Stock: {x.stock}</div>
          <div className="bg-accentA border-accentB border-2 rounded-2xl px-2 mt-4 py-2">
              <div>Categories:</div>
              <ul>
              {x.categories.map(x=><li className="px-2" key={x.id}>{x.categoryName}</li>)}
              </ul>
          </div>
          <Ratings change={"bg-accentA border-accentB border-2 rounded-2xl px-2 mt-4 py-2"} info={x.reviews}/>
          <div className="bg-accentA border-accentB border-2 rounded-2xl px-2 mt-4 py-2">
                <div>Reviews:</div>
                <ul> 
                {x.reviews.map(x=><li className="pl-2" key={x.id}>{x.review}</li>)}
                </ul>
          </div>
        </div>
        <br/>
      </Link>
    ))}
    </div>
    </div>
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
        <div className="w-screen px-4">
        <div>
          <AdminMenu/>
        </div>
          Now Loading
        </div>
      )
    }

    return(
      <div className="row-span-2">
      <form className="mt-3" onSubmit={changeCategory}>
          <label >
            Change Categories:  
            <select className="ml-1"          
              value={newCategory}
              onChange={({ target }) => setNewCategory(target.value)}>
              <option value=""/>
              {categories.map(x=><option key={x.id} value={x.id}>{x.categoryName}</option>)}
            </select>
          </label>
          <button className="w-10/12 bg-mainAlt border-accentB border-2 my-3" type="submit">Send</button>
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
          name: name=="" ? item.name: name,
          price: price=="" ? item.price: Number(price),
          stock: stock=="" ? item.stock: Number(stock)
        })
        setCost('')
        setDescription('')
        setHighestPrice('')
        setLowestPrice('')
        setName('')
        setPrice('')
        setStock('')
      }
    
      return(
        <div className="w-full mb-6">
           <form className="border-accentB border-4 bg-main rounded-2xl flex flex-col gap-3 pl-4 py-4" onSubmit={change}>
           <div>Change Information</div>
            <div>
              Cost: 
              <input 
                className="ml-2 w-[13.6rem]"
                type='number'
                value={cost}
                onChange={({target})=>setCost(target.value)}
              />
            </div>
            <div>
              Description: 
              <input 
                className="ml-2 w-[10.55rem]"
                type='text'
                value={description}
                onChange={({target})=>setDescription(target.value)}
              />
            </div>
            <div>
              Highest Price: 
              <input
                className="ml-2 w-[9.8rem]"
                type="number"
                value={highestPrice}
                onChange={({target})=>setHighestPrice(target.value)}
              />
            </div>
            <div>
              Lowest Price: 
              <input
                className="ml-2 w-[10.1rem]"
                type="number"
                value={lowestPrice}
                onChange={({target})=>setLowestPrice(target.value)}
              />
            </div>
            <div>
              Name: 
              <input
                className="ml-2 w-[13rem]"
                type="text"
                value={name}
                onChange={({target})=>setName(target.value)}
              />
            </div>
            <div>
              Price: 
              <input
                className="ml-2 w-[13.5rem]"
                type="number"
                value={price}
                onChange={({target})=>setPrice(target.value)}
              />
            </div>
            <div>
              Stock: 
              <input
                className="ml-2 w-[13.2rem]"
                type="number"
                value={stock}
                onChange={({target})=>setStock(target.value)}
              />
            </div>
            <button className=" w-11/12 mx-2 bg-mainAlt border-accentB border-2" type="submit">
              Send
            </button>
          </form>
        </div>
      )
    }


  // Display Single Item
export const AdminSingleItem = ({user,admin,items, updateItem, updateCat, delCat, reloadItem}) =>{
  const id = useParams().itemId
  const navigate = useNavigate()
  if(!items){
    return(
      <div className="w-screen px-4">
        Loading
      </div>
    )
  } else{

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

    const delItem =async (info) =>{
      await itemServices.delItem(info)
      reloadItem()
      navigate(`/admin/Item/`)
    }
  
  
  
    return(
      <>
        <div className="w-full px-4 text-back mt-16">
          <button className="w-full mt-2 border-accentB border-4" onClick={()=>delItem(single[0].id)}>Remove Item</button>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="bg-main border-accentB border-4 flex items-center rounded-2xl">
                <ImagesViewer change={"w-full rounded-2xl"} info={single[0].image}/>
            </div>
            <div className="bg-main border-accentB border-4 pl-4 flex flex-col row-span-2 gap-2 py-4 rounded-2xl">
                <div>ID: {single[0].id}</div>
                <div>Name: {single[0].name}</div>
                <div>Description: {single[0].description}</div>
                <div>Price: {single[0].price}</div>
                <div>Cost: {single[0].cost}</div>
                <div>Highest Price: {single[0].highestPrice}</div>
                <div>Lowest Price: {single[0].lowestPrice}</div>
                <div>Stock: {single[0].stock}</div>
                <Ratings info={single[0].reviews}/>
            </div>
            <div className="bg-main border-accentB border-4 rounded-2xl pl-4 py-4">
                <div>Categories:</div>
                <ul> 
                {single[0].categories.map(x=>(<li className="flex justify-around items-center py-2" key={x.id}>{x.categoryName} 
                <button className="mr-2 border-accentB border-2" onClick={()=>deleteCategoryInfo(x.id)}>Delete</button>
                </li>))}
                </ul>
              <EditCategories item={single[0]} catInfo={updateCategoryInfo}/>
            </div>
            <div className="bg-main border-accentB border-4 col-span-2 rounded-2xl pl-4 py-4">
                <div>Reviews:</div>
                <ul className="pl-4">
                {single[0].reviews.map(x=><li key={x.id}>{x.review}</li>)}
                </ul>
            </div>
          </div>
          <EditItem item={single[0]} itemInfo={updateItemInfo}/>
        </div>
      </>
    )
  }

}
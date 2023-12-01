import { AdminMenu } from "./adminMenu"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import imageServices from "../../services/images"
import itemServices from "../../services/items"
import { ImagesViewer } from "../image"




export const AdminNewItem = ({user,admin,items,updateItem}) =>{
  const navigate = useNavigate()
    const [cost, setCost] = useState("")
    const [description, setDescription] = useState("")
    const [highestPrice, setHighestPrice] = useState("")
    const [lowestPrice, setLowestPrice] = useState("")
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [test , setTest] = useState(null)



  const onSubmit = async (e) => {
    e.preventDefault()
    const regEx = /.jpeg|.jpg|.gif|.png|.webp/
    const regMatch = e.target[7].files[0].name.match(regEx)
    const itemTest = await itemServices.getAll()
    const id = Math.max(...itemTest.map(x=>x.id))

    console.log(id)
    const prep = id +1 + regMatch[0]
    const sendIt ={
      cost: Number(cost),
      description:  description,
      highestPrice:  Number(highestPrice),
      lowestPrice:  Number(lowestPrice),
      image: prep,
      name:  name,
      price:  Number(price),
      stock:  Number(stock)
    }
    console.log(sendIt)
     await itemServices.newItem(sendIt)
    const createdImage = await imageServices.createOrder({file: e.target[7].files, id: id +1 })
    setTest(createdImage)
    updateItem()
    navigate(`/admin/Item/`)
  };

    return(
    <div className="w-screen px-4 mt-14" >
    <div >
            <form className="sm:grid sm:grid-cols-2 bg-main border-accentB border-4 pl-4 flex flex-col gap-2 py-4 rounded-2xl flex gap-4" onSubmit={onSubmit}>
           <div className="sm:col-span-2 sm:text-center">Change Information</div>
            <div>
              <span className="mr-2">Cost: </span>
              <input 
                className="w-[14rem]"
                type='number'
                value={cost}
                onChange={({target})=>setCost(target.value)}
              />
            </div>
            <div>
              <span className="mr-2">Description:</span> 
              <input 
                className="w-[11.19rem]"
                type='text'
                value={description}
                onChange={({target})=>setDescription(target.value)}
              />
            </div>
            <div>
              <span className="mr-2">Highest Price: </span>
              <input
                className="w-[10.15rem]"
                type="number"
                value={highestPrice}
                onChange={({target})=>setHighestPrice(target.value)}
              />
            </div>
            <div>
              <span className="mr-2">Lowest Price: </span>
              <input
                className="w-[10.5rem]"
                type="number"
                value={lowestPrice}
                onChange={({target})=>setLowestPrice(target.value)}
              />
            </div>

            <div>
              <span className="mr-2">Name: </span>
              <input
                className="w-[13.3rem]"
                type="text"
                value={name}
                onChange={({target})=>setName(target.value)}
              />
            </div>
            <div>
              <span className="mr-2">Price: </span>
              <input
                className="w-[13.8rem]"
                type="number"
                value={price}
                onChange={({target})=>setPrice(target.value)}
              />
            </div>
            <div>
              <span className="mr-2">Stock:</span> 
              <input
                className="w-[13.8rem]"
                type="number"
                value={stock}
                onChange={({target})=>setStock(target.value)}
              />
            </div>
                <input className="rounded-2xl border-accentB border-2 w-11/12" type="file" />
                <input className="sm:col-span-2 bg-mainAlt border-accentB h-10 border-4 rounded-2xl w-11/12" type="submit" />
            </form>
        </div>
    </div>
  )
  }
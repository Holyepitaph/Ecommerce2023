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
    <>
    <div>
      <AdminMenu/>
    </div>
    <div className="App">
            <form onSubmit={onSubmit}>
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
                <input type="file" />

                <input type="submit" />
            </form>
        </div>
    </>
  )
  }
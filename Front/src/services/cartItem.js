import axios from "axios"
const baseUrl = "/api/cartItem"
let token

export const setTokenCartItem = (newToken) => {
    token = `Bearer ${newToken}`
  };


const newCartItem = async (thing) =>{
    const config = {
        headers : {Authorization : token},
    }
    const connect ={
        itemId: thing.itemId,
        quantity: Number(thing.quantity)
    }
    const request = await axios.post(baseUrl,connect, config)
    return request.data
}

const deleteCartItem = async (thing) =>{
    const config = {
        headers : {Authorization : token},
    }
    const removedCartItem = thing.itemId
    const request = await axios.delete(`${baseUrl}/${removedCartItem}`, config)
    return request.data
}

export default { newCartItem, deleteCartItem }
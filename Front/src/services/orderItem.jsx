import axios from "axios"
const baseUrl = "/api/orderItem"
let token

export const setTokenOrderItem = (newToken) => {
    token = `Bearer ${newToken}`
  };

const getAll = async () =>{
    const config = {
        headers : {Authorization : token},
    }
    const request = await axios.get(baseUrl, config)
    return request.data
}

const createOrderItem = async (thing) =>{
  const config = {
      headers : {Authorization : token},
  }
  const sendIt ={
    quantity: Number(thing.quantity),
    orderId: Number(thing.orderId),
    itemId: Number(thing.itemId)
  }
  const request = await axios.post(baseUrl,sendIt, config)
  return request.data
}


export default { getAll,  createOrderItem }
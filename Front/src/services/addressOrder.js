import axios from "axios"
const baseUrl = "/api/addressOrder"
let token

export const setTokenAddressOrder = (newToken) => {
    token = `Bearer ${newToken}`
  };

const getAll = async () =>{
    const config = {
        headers : {Authorization : token},
    }
    const request = await axios.get(baseUrl, config)
    return request.data
}

const createOrder = async (thing) =>{
  const config = {
      headers : {Authorization : token},
  }
  const sendIt ={
    addressId: Number(thing.addressId),
    orderId: Number(thing.orderId)
  }
  const request = await axios.post(baseUrl,sendIt, config)
  return request.data
}


export default { getAll,  createOrder }
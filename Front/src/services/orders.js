import axios from "axios"
const baseUrl = "/api/orders"
let token

export const setTokenOrder = (newToken) => {
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
    status:"Not Prepared",
    totalSale: thing.totalSale,
    totalCost: thing.totalCost
  }
  const request = await axios.post(baseUrl,sendIt, config)
  return request.data
}

const updateOrder = async (thing) => {
    const config = {
      headers: { Authorization: token },
    };
    const id = thing.id
    const status={
        status: thing.status
    }  
    const response = await axios.put(`${baseUrl}/${id}`,status, config);
    return response.data;
  };


  
export default { getAll, updateOrder, createOrder }
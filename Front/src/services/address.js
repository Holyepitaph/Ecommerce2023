import axios from "axios"
const baseUrl = "/api/address"
let token

export const setTokenAddress = (newToken) => {
    token = `Bearer ${newToken}`
  };

const getAll = async () =>{
    const config = {
        headers : {Authorization : token},
    }
    const request = await axios.get(baseUrl, config)
    return request.data
}

const newAddress = async (thing) =>{
    const config = {
        headers : {Authorization : token},
    }
    console.log(thing)
    const request = await axios.post(baseUrl,thing, config)
    return request.data
}

// const login = async (credentials) => {
//   const response = await axios.post(baseUrl, credentials)
//   return response.data
// }

export default { getAll,newAddress }
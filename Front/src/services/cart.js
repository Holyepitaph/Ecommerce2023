import axios from "axios"
const baseUrl = "/api/cart"
let token

export const setTokenCart = (newToken) => {
    token = `Bearer ${newToken}`
  };

const getAll = async () =>{
    const config = {
        headers : {Authorization : token},
    }
    await axios.post(baseUrl,"none", config)
    const request = await axios.get(baseUrl, config)
    return request.data
}

const cartCheck = async () =>{
    const config = {
        headers : {Authorization : token},
    }
    const request = await axios.post(baseUrl,"none", config)
    return request.data
}

// const login = async (credentials) => {
//   const response = await axios.post(baseUrl, credentials)
//   return response.data
// }

export default { getAll,cartCheck }
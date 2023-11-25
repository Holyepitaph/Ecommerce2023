import axios from "axios"
const baseUrl = "/api/category"
let token

export const setTokenCategories = (newToken) => {
    token = `Bearer ${newToken}`
  };

const getAll = async () =>{
    const config = {
        headers : {Authorization : token},
    }
    const request = await axios.get(baseUrl, config)
    return request.data
}

const makeNew = async (thing) =>{
    const config = {
        headers : {Authorization : token},
    }
    const request = await axios.post(baseUrl,thing, config)
    return request.data
}

// const login = async (credentials) => {
//   const response = await axios.post(baseUrl, credentials)
//   return response.data
// }

export default { getAll, makeNew }
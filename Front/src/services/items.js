import axios from "axios"
const baseUrl = "/api/items"
let token

export const setTokenItems = (newToken) => {
    token = `Bearer ${newToken}`
  };

const getAll = async () =>{
    const config = {
        headers : {Authorization : token},
    }
    const request = await axios.get(baseUrl, config)
    return request.data
}

// const login = async (credentials) => {
//   const response = await axios.post(baseUrl, credentials)
//   return response.data
// }

export default { getAll }
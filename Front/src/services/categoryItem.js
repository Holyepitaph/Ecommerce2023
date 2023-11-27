import axios from "axios"
const baseUrl = "/api/categoryItem"
let token

export const setTokenCategoryItem = (newToken) => {
    token = `Bearer ${newToken}`
  };


const makeNew = async (thing) =>{
    const config = {
        headers : {Authorization : token},
    }
    const request = await axios.post(baseUrl,thing, config)
    return request.data
}

const delCategoryItem = async (thing) =>{
    const request = await axios.delete(baseUrl, {data:thing, headers: {Authorization : token}})
    return request.data
}

export default {  makeNew, delCategoryItem }
import axios from "axios"
const baseUrl = "/api/reviews"
let token

export const setTokenReview = (newToken) => {
    token = `Bearer ${newToken}`
  };

const getAll = async () =>{
    const config = {
        headers : {Authorization : token},
    }
    const request = await axios.get(baseUrl, config)
    return request.data
}

const newReview = async (thing) =>{
    const config = {
        headers : {Authorization : token},
    }
    const id = thing.id
    console.log(thing)
    const sendIt ={
        review: thing.review,
        rating: Number(thing.rating)
    }
    const request = await axios.post(`${baseUrl}/${id}`,sendIt, config)
    return request.data
}

// const login = async (credentials) => {
//   const response = await axios.post(baseUrl, credentials)
//   return response.data
// }

export default { getAll,newReview }
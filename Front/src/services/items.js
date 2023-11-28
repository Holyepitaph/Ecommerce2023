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

const updateItem = async (thing) => {
    const config = {
      headers: { Authorization: token },
    };
    const id = thing.id
    const update = {      
      cost: thing.cost=="" ? null: thing.cost,
      description: thing.description=="" ? null: thing.description,
      highestPrice: thing.highestPrice=="" ? null: thing.highestPrice,
      lowestPrice: thing.lowestPrice=="" ? null: thing.lowestPrice,
      image: thing.image=="" ? null: thing.image,
      name: thing.name=="" ? null: thing.name,
      price: thing.price=="" ? null: thing.price,
      stock: thing.stock=="" ? null: thing.stock
    }
  
    const response = await axios.put(`${baseUrl}/${id}`,update, config);
    return response.data;
  };

  const newItem = async (thing) =>{
    const config = {
      headers: { Authorization: token },
    }
    const update = {      
      cost:  thing.cost,
      description:  thing.description,
      highestPrice:  thing.highestPrice,
      lowestPrice:  thing.lowestPrice,
      image:  thing.image,
      name:  thing.name,
      price: thing.price,
      stock:  thing.stock
    }
    const response = await axios.post(baseUrl,update, config);
    return response.data;
  }

  const delItem = async (thing) =>{
    const config = {
      headers: { Authorization: token },
    }
 const id = thing
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  }

export default { getAll, updateItem, newItem,delItem }
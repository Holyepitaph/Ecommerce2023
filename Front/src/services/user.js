import axios from "axios"
const baseUrl = "/api/users"
let token

export const setTokenUsers = (newToken) => {
    token = `Bearer ${newToken}`
  };

const getAll = async () =>{
    const config = {
        headers : {Authorization : token},
    }
    const request = await axios.get(baseUrl, config)
    return request.data
}

const delUser = async (id) => {
    const config = {
      headers: { Authorization: token },
    };
  
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  };

  const updateUser = async (thing) => {
    const config = {
      headers: { Authorization: token },
    };
    const id = thing.username
    const update = {      
      admin: thing.admin=="" ? null: thing.admin,
      email: thing.email=="" ? null: thing.email,
      phone: thing.phone=="" ? null: thing.phone,
      password: thing.password=="" ? null : thing.password
    }
  
    const response = await axios.put(`${baseUrl}/${id}`,update, config);
    return response.data;
  };

export default { getAll, delUser, updateUser }
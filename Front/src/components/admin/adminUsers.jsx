import { AdminMenu } from "./adminMenu"
import { useState, useEffect } from "react"
import userService from "../../services/user"
import { Link } from "react-router-dom"

const EditUser = ({info, newInfo}) =>{
const [email, setEmail] = useState("")
const [phone, setPhone] = useState("")
const [password, setPassword] = useState("")


  const change = (e) =>{
    e.preventDefault()
    
    newInfo({
      id: info.id,
      email: email=="" ? info.email: email,
      phone: phone=="" ? info.phone: phone,
      password: password=="" ? null : password,
      username: info.username
    })
  }

  return(
    <div className="bg-gray-900 rounded-2xl mr-4 mt-4 py-4 pl-2">
       <form className="flex flex-col gap-2 pl-2" onSubmit={change}>
       <div>Change Information</div>
        <div>
          Email: 
          <input 
            type='text'
            value={email}
            onChange={({target})=>setEmail(target.value)}
          />
        </div>
        <div>
          Phone Number: 
          <input 
            type='text'
            value={phone}
            onChange={({target})=>setPhone(target.value)}
          />
        </div>
        <div>
          Password: 
          <input
            type="text"
            value={password}
            onChange={({target})=>setPassword(target.value)}
          />
        </div>
        <button className="bg-black mr-4 mt-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

//Display all Users
export const AdminUsers = ({user,admin,items,orders}) =>{
    const [userTotal, setUserTotal] = useState([])
  
    useEffect(()=>{
      const userTest = async () =>{
        const response = await userService.getAll()
        return setUserTotal(response)
      }
      userTest()
    },[orders])
  
  
    const deleteUser =async (user) =>{
      if (window.confirm(`Are you certain it's time to delete ${user.username}`)) {
        await userService.delUser(user.username)
        const response = await userService.getAll()
        setUserTotal(response)
    
        }
  
    }
  
    const updateUser = async (newInfo) =>{
      if (window.confirm(`Update ${newInfo.username} ?`)) {
        await userService.updateUser(newInfo)
        const response = await userService.getAll()
        setUserTotal(response)
    
        }
    }

    const changeAdmin = async(current) =>{
      const newInfo ={
        admin: current.admin ? false : true,
        username: current.username
      }
      console.log(newInfo)
      if (window.confirm(`Make ${newInfo.username} an Admin?`)) {
        await userService.updateUser(newInfo)
        const response = await userService.getAll()
        setUserTotal(response)
    
        }

    }
  
    if(!userTotal){
      return(
        <div className="w-screen px-4">
        <div>
          <AdminMenu/>
        </div>
          Now Loading
        </div>
      )
    }
    return(
      <div className="w-screen px-4">
      <div>
        <AdminMenu/>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {userTotal.map(x=>(
          <div className="bg-gray-800 pl-4 flex flex-col gap-2 py-4 rounded-2xl" key={x.id}>
            <div>Username: {x.username}</div>
            <div>Name: {x.name}</div>
            <div>Phone: {x.phone ? x.phone : "Missing"}</div>
            <div>Email: {x.email ? x.email : "Missing"}</div>
            <div>Created: {x.created}</div>
            <div>Admin Status: {x.admin ? "True" : "False"}
                <button className="mt-2" onClick={()=>changeAdmin(x)}>Make Admin</button>
            </div>
            <div className="bg-gray-900 rounded-2xl px-2 mr-4 mt-4">
                <div>Addresses</div>
                {x.addresses.map(x=>(
                  <ul className="ml-4" key={x.id}>
                    <li>Address Type: {x.addressType}</li>
                  </ul>
                ))}
            </div>
            <div className="bg-gray-900 rounded-2xl px-2 mr-4 mt-4">
                <div>Orders</div>
                {x.orders.sort((a, b)=> a.id - b.id).map(x=>(
                  <ul className="mt-4 ml-4" key={x.id}>
                    <Link to={`/admin/Orders/${x.id}`}>
                      <li>Status: {x.status}</li>
                      <li>Date Created: {x.dateOfStatus}</li>
                      <li>Cost: {x.totalCost}</li>
                      <li>Sale: {x.totalSale}</li>
                    </Link>
                  </ul>
                ))}
            </div>
            <button className="mr-4" onClick={()=>deleteUser(x)}>Delete User</button>
            <EditUser info={x} newInfo={updateUser}/>
            <br/>
          </div>
        ))}
        </div>
      </div>
    )
  }
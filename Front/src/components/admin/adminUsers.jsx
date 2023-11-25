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
    <>
       <form onSubmit={change}>
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
        <button type="submit">
          login
        </button>
      </form>
    </>
  )
}

//Display all Users
export const AdminUsers = ({user,admin,items}) =>{
    const [userTotal, setUserTotal] = useState([])
  
    useEffect(()=>{
      const userTest = async () =>{
        const response = await userService.getAll()
        return setUserTotal(response)
      }
      userTest()
    },[])
  
  
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

    const changeAdmin = async(username) =>{
      const newInfo ={
        admin: true,
        username: username
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
        <>
        <div>
          <AdminMenu/>
        </div>
          Now Loading
        </>
      )
    }
    return(
      <>
      <div>
        <AdminMenu/>
      </div>
        {userTotal.map(x=>(
          <div key={x.id}>
            <div>Username: {x.username}</div>
            <div>Name: {x.name}</div>
            <div>Phone: {x.phone ? x.phone : "Missing"}</div>
            <div>Email: {x.email ? x.email : "Missing"}</div>
            <div>Created: {x.created}</div>
            <div>Admin Status: {x.admin ? "True" : "False"}
            <button onClick={()=>changeAdmin(x.username)}>Make Admin</button>
            </div>
            <div>Addresses</div>
            {x.addresses.map(x=>(
              <ul key={x.id}>
                <li>{x.id}</li>
                <li>{x.addressType}</li>
              </ul>
            ))}
            <div>Orders</div>
            {x.orders.sort((a, b)=> a.id - b.id).map(x=>(
              <ul key={x.id}>
                <Link to={`/admin/Orders/${x.id}`}>
                  <li>{x.id}</li>
                  <li>{x.status}</li>
                  <li>{x.dateOfStatus}</li>
                  <li>{x.totalCost}</li>
                  <li>{x.totalSale}</li>
                </Link>
              </ul>
            ))}
            <button onClick={()=>deleteUser(x)}>Delete User</button>
            <EditUser info={x} newInfo={updateUser}/>
            <br/>
          </div>
        ))}
      </>
    )
  }
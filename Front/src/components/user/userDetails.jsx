import { useEffect, useState } from "react"
import { UserMenu } from "./userMenu"
import userServices from "../../services/user"

const EditUser = ({user, update}) =>{
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    
    
      const change = (e) =>{
        e.preventDefault()
        
        update({
          id: user.id,
          email: email=="" ? user.email: email,
          phone: phone=="" ? user.phone: phone,
          password: password=="" ? null : password,
          username: user.username
        })
        setEmail("")
        setPhone("")
        setPassword("")
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

export const UserDetails = ({user}) =>{
const [total, setTotal] = useState(null)

    useEffect(()=>{
        const fetchTotal = async () =>{
          const userTest = await userServices.getAll()
          return setTotal(userTest)
        }
            fetchTotal()
      },[])

      const update =async (info) =>{
        await userServices.updateUser(info)
        const userTest = await userServices.getAll()
          return setTotal(userTest)
      }

      if(!total){
        return(
            <>
                <div>Loading</div>
            </>
        )
      }

    return(
        <>
            <UserMenu/>
            <div>Username: {total.username}</div>
            <div>Name: {total.name}</div>
            <div>Email: {total.email}</div>
            <div>Phone: {total.phone}</div>
            <div>Addresses: </div>
            {total.addresses.map(x=>(
                    <ul key={x.id}>
                        <li>Address Type: {x.addressType}</li>
                        <li>Street: {x.street}</li>
                        <li>City: {x.city}</li>
                        <li>State: {x.state}</li>
                        <li>Zip: {x.zipcode}</li>
                        <li>Country: {x.country}</li>
                    </ul>
                ))}
            <div>Orders:</div>
            {total.orders.map(x=>(
                <ul key={x.id}>
                    <li>Status: {x.status}</li>
                    <li>Date Ordered: {x.dateOfStatus}</li>
                    <li>Sale Total: {x.totalSale}</li>
                </ul>
            ))}
            <EditUser update={update} user={total}/>
        </>
    )
}
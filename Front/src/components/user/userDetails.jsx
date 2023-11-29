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
        <div className="bg-gray-800 pl-4 flex flex-col gap-2 py-4 rounded-2xl">
           <form className="flex flex-col gap-4" onSubmit={change}>
           <div className="text-xl">Change Information</div>
            <div>
              <span className="mr-4">Email: </span>
              <input 
                type='text'
                value={email}
                onChange={({target})=>setEmail(target.value)}
              />
            </div>
            <div>
              <span className="mr-4">Phone Number:</span> 
              <input 
                type='text'
                value={phone}
                onChange={({target})=>setPhone(target.value)}
              />
            </div>
            <div>
              <span className="mr-4">Password: </span>
              <input
                type="text"
                value={password}
                onChange={({target})=>setPassword(target.value)}
              />
            </div>
            <button className="bg-black w-11/12 ml-3 mt-2" type="submit">
              Change
            </button>
          </form>
        </div>
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
        <div className="w-screen px-4">
            <UserMenu/>
            <div className="flex flex-col gap-4">
              <div className="bg-gray-800 pl-4 flex flex-col gap-2 py-4 rounded-2xl">
                  <div>Username: {total.username}</div>
                  <div>Name: {total.name}</div>
                  <div>Email: {total.email}</div>
                  <div>Phone: {total.phone}</div>
              </div>
              <EditUser update={update} user={total}/>
              <div className="bg-gray-800 pl-4 flex flex-col gap-2 py-4 rounded-2xl">
                  <div>Addresses: </div>
                  {total.addresses === undefined ? "None on File": total.addresses.map(x=>(
                        <ul className="bg-gray-900 rounded-2xl px-2 mt-4 mr-4" key={x.id}>
                            <li>Address Type: {x.addressType}</li>
                            <li>Street: {x.street}</li>
                            <li>City: {x.city}</li>
                            <li>State: {x.state}</li>
                            <li>Zip: {x.zipcode}</li>
                            <li>Country: {x.country}</li>
                        </ul>
                    ))}
              </div>
              <div className="bg-gray-800 pl-4 flex flex-col gap-2 py-4 rounded-2xl">
                  <div>Orders:</div>
                  {total.orders === undefined ? "None on File" : total.orders.map(x=>(
                      <ul className="bg-gray-900 rounded-2xl px-2 mt-4 mr-4" key={x.id}>
                          <li>Status: {x.status}</li>
                          <li>Date Ordered: {x.dateOfStatus}</li>
                          <li>Sale Total: {x.totalSale}</li>
                      </ul>
                  ))}
              </div>
              
            </div>
        </div>
    )
}
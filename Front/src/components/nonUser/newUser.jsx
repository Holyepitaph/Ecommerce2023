import { useState } from "react"
import userServices from "../../services/user"



export const NewUser = () =>{
const [username,setUsername] = useState('')
const [name, setName] = useState('')
const [password, setPassword] = useState('')
const [check, setCheck] = useState('')
const [error, setError] = useState('')

const regUser = async (e) =>{
   try{
    e.preventDefault()
    if(check == password){
        const newUserInfo={
            username:username,
            name:name,
            password:password
        }
         await userServices.newUser(newUserInfo)
        setError("New User Created")
        setTimeout(() => {
            setError(null)
          }, 5000)
    } else{
        setError("Password and Check do not match")
        setTimeout(() => {
            setError(null)
          }, 5000)
    }
   } catch{
    setError("Error Occured // Try New Username")
    setTimeout(() => {
        setError(null)
      }, 5000)
   }


}

    return(
        <div className=" mt-4 w-screen px-4">
            <form className="bg-gray-800 pl-4 flex flex-col  py-4 rounded-2xl" onSubmit={regUser}>
            <div>{error}</div>
            <div className="text-2xl mb-4">New User: </div>
                <span>Username: </span>
                <input
                    className="w-11/12"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                  /><br/>
                <span>Name: </span>
                <input
                    className="w-11/12"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                  /><br/>
                <span>Password: </span>
                <input
                    className="w-11/12"
                    value={password}
                    type="password"
                    onChange={({ target }) => setPassword(target.value)}
                  /><br/>
                <span>Password: </span>
                <input
                    className="w-11/12"
                    value={check}
                    type="password"
                    onChange={({ target }) => setCheck(target.value)}
                  /><br/>
                <button className="bg-black w-11/12" type="submit">save</button>
            </form>  
        </div>
    )
}
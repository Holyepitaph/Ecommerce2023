import { useState } from "react"



//needs to adjust to remove admin auto status
export const LoginText = ({login}) =>{
    const [username, setUsername] = useState('admin')
    const [password,setPassword] = useState('secret')

    const sendIt = (e) =>{
        e.preventDefault()
          login({
            username:username,
            password:password
          })
          // setUsername('')
          // setPassword('')
    }
    return(
      <div className="w-screen px-4">
      <form className="bg-gray-800 pl-4 flex flex-col gap-4 py-4 rounded-2xl" onSubmit={sendIt}>
        <div>
          <span className="mr-4">Username:</span>
          <input 
            className="pl-2"
            type='text'
            value={username}
            onChange={({target})=>setUsername(target.value)}
          />
        </div>
        <div>
          <span className="mr-4">Password: </span>
          <input
            className="pl-2"
            type="text"
            value={password}
            onChange={({target})=>setPassword(target.value)}
          />
        </div>
        <button className="bg-black w-11/12" id="loginSubmit" type="submit">
          Login
        </button>
      </form>
    </div>
    )
  }


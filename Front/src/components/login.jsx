import { useState } from "react"



//needs to adjust to remove admin auto status
export const LoginText = ({login, hiddenCheck}) =>{
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
      <div className="lg:pt-4 sm:w-1/2 w-full px-4 pt-4">
      <form className="bg-main bg-opacity-10 border-accentB border-4 pl-4 flex flex-col gap-4 py-4 rounded-2xl" onSubmit={sendIt}>
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
        <button className="bg-mainAlt border-accentB border-2 w-11/12" id="loginSubmit" type="submit">
          Login
        </button>
      </form>
      <button className="bg-mainAlt border-accentB border-4 w-full mt-4"
      onClick={()=>hiddenCheck()}
      >Create New User</button>
    </div>
    )
  }


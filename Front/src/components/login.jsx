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
      <>
      <form onSubmit={sendIt}>
        <div>
          username
          <input 
            type='text'
            value={username}
            onChange={({target})=>setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            onChange={({target})=>setPassword(target.value)}
          />
        </div>
        <button id="loginSubmit" type="submit">
          login
        </button>
      </form>
    </>
    )
  }


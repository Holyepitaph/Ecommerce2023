
import { useState } from "react"
import { ToDoList } from "./components/toDoList"
import loginServices from "./services/login"
import itemServices from "./services/items"
import { useEffect } from "react"
import { LoginText} from "./components/login"
import {AdminCategories} from "./components/admin/adminCategories"
import {AdminItems,AdminSingleItem} from "./components/admin/adminItems"
import {AdminPageMain} from "./components/admin/adminMain"
import { AdminOrders, AdminSingleOrders } from "./components/admin/adminOrders"
import { AdminUsers } from "./components/admin/adminUsers"
import { UserPage } from "./components/user"
import { setToken } from "./services/util"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom"

function App() {

  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [items, setItems] = useState(null)

//Pulls user info from local storage
useEffect(()=>{
    const fetchItems = async () =>{
      const itemsTest = await itemServices.getAll()
      return setItems(itemsTest)
    }
    const loggedUser = window.localStorage.getItem("BbubbanLoggedUserCommerce")
    if(loggedUser){
      const prepared = JSON.parse(loggedUser)
      setUser(prepared)
      setAdmin(prepared.admin)
      setToken(prepared.token)
      fetchItems()
    }
  },[])



//Pulls info from Login Component
  const login = async  (fromLoginText) =>{
    const loginTest = await loginServices.login({
      username: fromLoginText.username,
      password: fromLoginText.password
    } )
    window.localStorage.setItem("BbubbanLoggedUserCommerce", JSON.stringify(loginTest))
    setUser(loginTest)
    setAdmin(loginTest.admin)
    setToken(loginTest.token)
    const itemsTest = await itemServices.getAll()
    setItems(itemsTest)
}

// LogOut Component
const LogOut = () =>{
  const bye = () =>{
    window.localStorage.removeItem("BbubbanLoggedUserCommerce")
    setUser(null)
  }
    return(
      <>
        <button onClick={()=>bye()}>Log Out</button>
      </>
    )
  }

  const BlankMenu = () =>(
    <div>
  <Link to='/'>Home</Link>
  <Link to='/admin'>Admin</Link>
  <Link to='/user'>User</Link>
    </div>

  )

  


 

  const Test = () =>(
    <>
      <div>
        Hello
      </div>
    </>
  )

  return (
    <>
      <Router>
            {/* <AdminMenu/> */}
      {/* {user.admin? <AdminMenu/> : <UserMenu/>} */}
      <BlankMenu/>

      {!user ? <LoginText login={login}/>: <LogOut/>}
      <button onClick={()=>console.log(items[0])}>TEST</button>
        <Routes>
    {/* Admin Routes */}
          <Route path="/admin" element={admin ? <AdminPageMain user={user} admin={admin} items={items}/> : <Navigate replace to="/" />} />
          <Route path="/admin/Item" element={admin ? <AdminItems user={user} admin={admin} items={items}/> : <Navigate replace to="/" />} />
          <Route path="/admin/Item/:itemId" element={admin ? <AdminSingleItem user={user} admin={admin} items={items}/> : <Navigate replace to="/" />} />
          <Route path="/admin/Categories" element={admin ? <AdminCategories user={user} admin={admin} items={items}/> : <Navigate replace to="/" />} />
          <Route path="/admin/Orders" element={admin ? <AdminOrders user={user} admin={admin} items={items}/> : <Navigate replace to="/" />} />
          <Route path="/admin/Orders/:orderId" element={admin ? <AdminSingleOrders user={user} admin={admin} items={items}/> : <Navigate replace to="/" />} />
          <Route path="/admin/Users" element={admin ? <AdminUsers user={user} admin={admin} items={items}/> : <Navigate replace to="/" />} />
    {/* User Routes */}
          <Route path="/user" element={user ? <UserPage user={user} /> : <Navigate replace to="/" />} />


          <Route path="/" element={<Test/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App


import { useState, useEffect } from "react"

import loginServices from "./services/login"
import itemServices from "./services/items"
import categoryItemServices from "./services/categoryItem"
import cartServices from "./services/cart"
import cartItemServices from "./services/cartItem"
import orderServices from "./services/orders"
import addressServices from "./services/address"
import { setToken } from "./services/util"

import { LoginText} from "./components/login"
import {AdminCategories} from "./components/admin/adminCategories"
import {AdminItems,AdminSingleItem} from "./components/admin/adminItems"
import {AdminPageMain} from "./components/admin/adminMain"
import { AdminOrders, AdminSingleOrders } from "./components/admin/adminOrders"
import { AdminUsers } from "./components/admin/adminUsers"
import { AdminNewItem } from "./components/admin/adminNewItem"


import { UserItems,UserSingleItem } from "./components/user/userItem"
import { UserPage } from "./components/user/userMain"
import { NewUser } from "./components/nonUser/newUser"
import { UserCart } from "./components/user/userCart"
import { UserDetails } from "./components/user/userDetails"
import { UserOrder, UserSingleOrder } from "./components/user/userOrder"
import { UserAddress } from "./components/user/userAddress"

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
  const [cart,setCart] = useState(null)
  const [orders,setOrders] = useState(null)
  const [address, setAddress] =useState(null)

//Pulls user info from local storage
useEffect(()=>{
    const fetchItems = async () =>{
      const itemsTest = await itemServices.getAll()
      return setItems(itemsTest)
    }
    const fetchCart = async ()=>{
      const cartInfo = await cartServices.getAll()
      return setCart(cartInfo[0])
    }
    const fetchOrders = async () =>{
      const ordersTest = await orderServices.getAll()
      return setOrders(ordersTest)
    }
    const fetchAddress = async () =>{
      const addressTest = await addressServices.getAll()
      return setAddress(addressTest)
    }
    const loggedUser = window.localStorage.getItem("BbubbanLoggedUserCommerce")
    if(loggedUser){
      const prepared = JSON.parse(loggedUser)
      setUser(prepared)
      setAdmin(prepared.admin)
      setToken(prepared.token)
      fetchItems()
      if(!admin){
        fetchCart()
        fetchOrders()
        fetchAddress()
      }
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
    const cartTest = await cartServices.getAll()
    setCart(cartTest[0])
    const orderTest = await orderServices.getAll()
    setOrders(orderTest)
    const addressTest = await addressServices.getAll()
    setAddress(addressTest)
}

// LogOut Component
const LogOut = () =>{
  const bye = () =>{
    window.localStorage.removeItem("BbubbanLoggedUserCommerce")
    setUser(null)
    setAdmin(null)
    setCart(null)
    setItems(null)
    setOrders(null)
    setAddress(null)
  }
    return(
      <div className=" w-screen px-4 ">
        <Link className="" to="/"><button className="w-full bg-mainAlt  border-accentB border-4" onClick={()=>bye()}>Log Out</button></Link>
      </div>
    )
  }

  const BlankMenu = ({admin}) =>{

  return(
    <div className="sm:w-[95%] sm:px-0  bg-main border-accentB border-4  text-back w-11/12 m-4 flex justify-around py-2 fixed top-0 rounded-2xl">
        <Link to='/'>Home</Link>
{!admin ? null : <div className="group"><div>Admin</div>
                    <div className=" absolute bg-[#136161] border-4 border-t-0 border-[#a15a1f]  rounded-b-2xl px-4 pb-4 pt-2 -ml-3 hidden group-hover:block ">
                       <Link className="group-hover:block hidden" to='/admin/Item'>Item List</Link>
                       <div className="border-gray-700 border w-full my-1"/>
                       <Link className="group-hover:block hidden" to='/admin/Categories'>Categories</Link>
                       <div className="border-gray-700 border w-full my-1"/>
                       <Link className="group-hover:block hidden" to='/admin/Orders'>Orders</Link>
                       <div className="border-gray-700 border w-full my-1"/>
                       <Link className="group-hover:block hidden" to='/admin/Users'>Users</Link>
                    </div>
              </div>}
              <div className="group"><div>User</div>
                    <div className="absolute bg-[#136161] rounded-b-2xl border-4 border-t-0 border-[#a15a1f] px-4 pb-4 pt-2 -ml-5 hidden group-hover:block">
                       <Link className="group-hover:block hidden" to='/user/Item'>Item List</Link>
                       <div className="border-gray-700 border w-full my-1"/>
                       <Link className="group-hover:block hidden" to='/user/Cart'>Cart</Link>
                       <div className="border-gray-700 border w-full my-1"/>
                       <Link className="group-hover:block hidden" to='/user/Orders'>Orders</Link>
                       <div className="border-gray-700 border w-full my-1"/>
                       <Link className="group-hover:block hidden" to='/user/Details'>User Details</Link>
                    </div>
              </div>
    </div>
  )
}

//Category and Item adjustement from Child components
  const updateCat =async (info) =>{
    await categoryItemServices.makeNew(info)
    const response = await itemServices.getAll()
    setItems(response)
  }

  const delcat =async (info) =>{
    await categoryItemServices.delCategoryItem(info)
    const response = await itemServices.getAll()
    setItems(response)
  }

  const updateItem =async (info) =>{
    await itemServices.updateItem(info)
    const response = await itemServices.getAll()
    setItems(response)
  }

  const reloadItem = async () =>{
    const response = await itemServices.getAll()
    setItems(response)
  }

//Cart Adjustement from child components
  const addItemToCart = async (info) =>{
    await cartItemServices.newCartItem(info)
    const response = await cartServices.getAll()
    setCart(response[0])
  }

  const removeFromCart = async (info) =>{
    await cartItemServices.deleteCartItem(info)
    const response = await cartServices.getAll()
    setCart(response[0])
  }

  const updateCart = async (info) =>{
    console.log(info)
    const cartTest = await cartServices.getAll()
    setCart(cartTest[0])
    const responseB = await orderServices.getAll()
    setOrders(responseB)
    const itemsTest = await itemServices.getAll()
    setItems(itemsTest)
  }

  const deleteOrder = async ()=>{
    const responseB = await orderServices.getAll()
    setOrders(responseB)
  }
  

  const newAddress =async (info) =>{
    await addressServices.newAddress(info)
    const addressTest = await addressServices.getAll()
    setAddress(addressTest)
  }

  const Main = () =>(
      <div className="mt-20 sm:mt-0 sm:grid sm:grid-cols-2 sm:w-screen mb-6">
        {!user ? <LoginText login={login}/>: <LogOut/>}
        {user ? null : <NewUser/>}
      </div>
  )

  return (
    <>
      <Router>
      <BlankMenu admin={admin}/>
        <Routes>
    {/* Admin Routes */}
          <Route path="/admin" element={admin ? <AdminPageMain user={user} admin={admin} items={items}/> : <Navigate replace to="/" />} />
          <Route path="/admin/Item" element={admin ? <AdminItems user={user} admin={admin} items={items}/> : <Navigate replace to="/" />} />
          <Route path="/admin/NewItem" element={admin ? <AdminNewItem user={user} admin={admin} items={items} updateItem={reloadItem}/> : <Navigate replace to="/" />} />   
          <Route path="/admin/Item/:itemId" element={admin ? <AdminSingleItem user={user} admin={admin} items={items} reloadItem={reloadItem} updateItem={updateItem} updateCat={updateCat} delCat={delcat}/> : <Navigate replace to="/" />} />
          <Route path="/admin/Categories" element={admin ? <AdminCategories user={user} admin={admin} items={items}/> : <Navigate replace to="/" />} />
          <Route path="/admin/Orders" element={admin ? <AdminOrders user={user} admin={admin} items={items}/> : <Navigate replace to="/" />} />
          <Route path="/admin/Orders/:orderId" element={admin ? <AdminSingleOrders user={user} admin={admin} deleteOrder={deleteOrder}  items={items}/> : <Navigate replace to="/" />} />
          <Route path="/admin/Users" element={admin ? <AdminUsers user={user} admin={admin} items={items} orders={orders}/> : <Navigate replace to="/" />} />
    {/* User Routes */}
          <Route path="/user" element={user ? <UserPage user={user} /> : <Navigate replace to="/" />} />
          <Route path="/user/Item" element={user ? <UserItems items={items} cart={cart} addedToCart={addItemToCart}/> : <Navigate replace to="/" />} />
          <Route path="/user/Item/:itemId" element={user ? <UserSingleItem items={items} cart={cart} reloadItem={reloadItem} addedToCart={addItemToCart}/> : <Navigate replace to="/" />} />
          <Route path="/user/Cart" element={user ? <UserCart user={user} cart={cart} removeFromCart={removeFromCart}/> : <Navigate replace to="/" />} />
          <Route path="/user/Orders" element={user ? <UserOrder user={user} orders={orders} deleteOrder={deleteOrder}/> : <Navigate replace to="/" />} />
          <Route path="/user/Orders/:orderId" element={user ? <UserSingleOrder user={user} orders={orders} /> : <Navigate replace to="/" />} />
          <Route path="/user/Details" element={user ? <UserDetails user={user} items={items} /> : <Navigate replace to="/" />} />
          <Route path="/user/Address" element={user ? <UserAddress user={user} address={address} cart={cart} update={updateCart} newAddress={newAddress}/> : <Navigate replace to="/" />} />
          <Route path="/" element={<Main/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App

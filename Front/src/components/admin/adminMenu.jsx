import { Link } from "react-router-dom"

export const AdminMenu = () =>(
    <div className="w-full flex justify-around">
    <Link to='/admin'>Admin</Link>
    <Link to='/admin/Item'>Item List</Link>
    <Link to='/admin/Categories'>Categories</Link>
    <Link to='/admin/Orders'>Orders</Link>
    <Link to='/admin/Users'>Users</Link>
    </div>
  )
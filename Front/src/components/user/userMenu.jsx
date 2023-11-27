import { Link } from "react-router-dom"

export const UserMenu = () =>(
    <>
    <Link to='/user'>User</Link>
    <Link to='/user/Item'>Item List</Link>
    <Link to='/user/Cart'>Cart</Link>
    <Link to='/user/Orders'>Orders</Link>
    <Link to='/user/Details'>User Details</Link>
    </>
  )
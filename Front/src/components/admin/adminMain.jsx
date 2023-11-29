import { AdminMenu } from "./adminMenu"
import axios from "axios"
import { useEffect, useState } from "react"
import imageServices from "../../services/images"


export const AdminPageMain = ({user,admin,items}) =>{



    return(
    <div className="w-screen px-4">
    <div>
      <AdminMenu/>
    </div>
    <div className="App">
        </div>
    </div>
  )
  }
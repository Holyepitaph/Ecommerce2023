import { AdminMenu } from "./adminMenu"
import { useState , useEffect} from "react"
import categoriesService from "../../services/categories"

  //Form for Category Creation
  const CategoryForm = ({makeCategory}) =>{
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const sendCategory = (e) =>{
      e.preventDefault()
      makeCategory({
        categoryName: name,
        categoryDescription: description
      })
      setName("")
      setDescription("")
    }

    return(
      <div className="bg-gray-800 rounded-2xl mt-4 pl-4 py-4">
      <h2 className="text-2xl text-blue-400">New Category</h2>
      <form className="flex flex-col mt-4" onSubmit={sendCategory}>
          <div>
              <span>Title: </span>
              <input
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
          </div>
          <br/>
          <div>
              <span>Author: </span>
              <input
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              />
          </div>
          <br/>
          <button className="bg-black w-11/12 mx-4" type="submit">save</button>
      </form>  
    </div>

    )
  }


// Display All Categories
export const AdminCategories = ({user,admin,items}) =>{
    const [categories, setCategories] = useState(null)
  
  
    useEffect(()=>{
      const categoriesTest = async () =>{
        const response = await categoriesService.getAll()
        return setCategories(response)
      }
      categoriesTest()
    },[])
  
    const newCategory =async (makeCategory) =>{
      await categoriesService.makeNew(makeCategory)
      const reset = await categoriesService.getAll()
      setCategories(reset)
    }
  

  
    if(!categories){
      return(
        <div className="w-screen px-4">
        <div>
          <AdminMenu/>
        </div>
          Now Loading
        </div>
      )
    }
    return(
      <div className="w-screen px-4">
      <div>
        <AdminMenu/>
      </div>
      <div className="w-full grid grid-cols-3 gap-4 mt-4">
        {categories.map(x=>(
          <div className="bg-gray-800 rounded-2xl pl-4 py-4" key={x.id}>
            <div>Name: {x.categoryName}</div>
            <div>Description: {x.categoryDescription}</div>
            <div className="bg-gray-900 rounded-2xl px-2 mr-4 mt-4 py-2">
                <div>Items: </div>
                <ul>
                  {x.items.map(x=><li className="ml-4" key={x.id}> {x.name}</li>)}
                </ul>
            </div>
            <br/>
          </div>
        ))}
        </div>
        <CategoryForm makeCategory={newCategory}/>
      </div>
    )
  }
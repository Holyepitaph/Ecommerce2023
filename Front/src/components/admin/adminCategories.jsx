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
      <div>
      <h2>New Category</h2>

      <form onSubmit={sendCategory}>
      <span>Title: </span>
      <input
        value={name}
        onChange={({ target }) => setName(target.value)}
      /><br/>
      <span>Author: </span>
        <input
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      /><br/>
      <button  type="submit">save</button>
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
        <>
        <div>
          <AdminMenu/>
        </div>
          Now Loading
        </>
      )
    }
    return(
      <>
      <div>
        <AdminMenu/>
      </div>
        {categories.map(x=>(
          <div key={x.id}>
            <div>Name: {x.categoryName}</div>
            <div>Description: {x.categoryDescription}</div>
            <div>
              <ul>
                {x.items.map(x=><li key={x.id}>{x.name}</li>)}
              </ul>
            </div>
            <br/>
          </div>
        ))}
        <CategoryForm makeCategory={newCategory}/>
      </>
    )
  }
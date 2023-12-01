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
      <div className="bg-main border-accentB border-4 rounded-2xl mt-4 pl-4 py-4">
      <h2 className="text-2xl ">New Category</h2>
      <form className="sm:flex-row sm:justify-around sm:items-center flex flex-col mt-4" onSubmit={sendCategory}>
          <div >
              <span>Name: </span>
              <input
                className="ml-2 w-[13rem]"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
          </div>
          <br/>
          <div>
              <span>Description: </span>
              <input
              className="ml-2 w-[11.8rem]"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              />
          </div>
          <br/>
          <button className="bg-mainAlt border-accentB border-2 mr-4" type="submit">Save</button>
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
      <div className="sm:mt-20 sm:w-screen w-full px-4 mt-16 mb-6">
      <div className=" grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {categories.map(x=>(
          <div className="bg-main border-accentB border-4 rounded-2xl pl-4 py-4 pr-2" key={x.id}>
            <div>Name: {x.categoryName}</div>
            <div>Description: {x.categoryDescription}</div>
            <div className="bg-accentA border-accentB border-2 rounded-2xl px-2 mr-4 mt-4 py-2">
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
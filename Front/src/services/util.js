import { setTokenCategories } from "./categories"
import { setTokenOrder } from "./orders"
import { setTokenItems } from "./items"
import { setTokenUsers } from "./user"

export const setToken = (newToken) =>{
        setTokenCategories(newToken)
        setTokenItems(newToken)
        setTokenOrder(newToken)
        setTokenUsers(newToken)
}
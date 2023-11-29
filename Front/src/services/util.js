import { setTokenCategories } from "./categories"
import { setTokenOrder } from "./orders"
import { setTokenItems } from "./items"
import { setTokenUsers } from "./user"
import {setTokenCategoryItem} from "./categoryItem"
import { setTokenCart } from "./cart"
import {setTokenCartItem} from "./cartItem"
import { setTokenAddress } from "./address"
import { setTokenAddressOrder } from "./addressOrder"
import { setTokenOrderItem } from "./orderItem"
import { setTokenImages } from "./images"
import { setTokenReview } from "./review"



export const setToken = (newToken) =>{
        setTokenCategories(newToken)
        setTokenItems(newToken)
        setTokenOrder(newToken)
        setTokenUsers(newToken)
        setTokenCategoryItem(newToken)
        setTokenCart(newToken)
        setTokenCartItem(newToken)
        setTokenAddress(newToken)
        setTokenAddressOrder(newToken)
        setTokenOrderItem(newToken)
        setTokenImages(newToken)
        setTokenReview(newToken)
}
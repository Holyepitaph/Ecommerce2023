# Ecommerce2023
 First Attempt at FullStack Solo Project 11/10/23

npm i cors
if issues occur between front and back during dev


USES
address(
    GET
    POST   *addressType, street, city, state, zipcode, country
    PUT/:address_id *addressType, street, city, state, zipcode, country
    DELETE/:address_id
)

addressOrder(
    GET
    POST
    DELETE  ADMIN  *addressId, orderId
)

orders(
    GET ADMIN ALL ELSE Partial
    POST  
    PUT????????
    DELETE???????????
)

orderItem(
    POST  *orderId, itemId, quantity
    DELETE  IF ADMIN * itemId, cartId 
)

items(
    GET
     GET/:itemId
    POST *name, description, price, cost, highestPrice, lowestPrice, stock, image
    PUT  *name, description, price, cost, highestPrice, lowestPrice, stock, image
    DELETE/:itemId
)

cartItem(
    POST *itemId, quantity
    PUT/:itemId  
         ADMIN  *cartId, itemId, quantity
          ELSE *itemId, quantity
    DELETE/:itemId      *cartId
)

cart(
    GET   
    POST
    DELETE/:userId
)

categoryItem(
    POST  *itemId, categoryId
    DELETE  *itemId, categoryId
)

category(
    GET
    POST  *categoryDescription, categoryName
    PUT/:categoryId  *categoryName, categoryDescription
    DELETE/:categoryId 
)

login(
    POST *username, password, 
)

reviews(
    GET
    POST /:item_id *review, rating
    DELETE /:review_id 
)

users(
    GET  Admin only
    POST  *username, name, password
    PUT     /:username *email, phone, password **IF ADMIN then admin
    DELETE  /:username
)








To Do List

Make Controllers for each endpoint as described in Figma
Test each End Point




Controllers

                Functional

Users(Test????Display Cart/Order/Address)
Login
Items


Review (
    Get needs adjustment on available info
)
Address (
    Delete needs adjustement when attached to ORDER
)

Cart(
    GET displays all carts for admin and only Users for USER
    ???NEEDS to make cart for non user as well as still 
    save cart for USER
    ???Maybe NonUsers can have cart saved to Cookies or Storage rather than Backend
)

CartItem(
    GET needs removal later as its only for testing
)

CategoryItem

Category (
)

AddressOrder

OrderItem
(
    GET
    POST
    PUT
    DELETE
)

Order{
    Needs AddressOrder Active
    Needs OrderItem Active


}

                In Progress








                Broken











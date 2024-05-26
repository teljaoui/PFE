import { type } from "@testing-library/user-event/dist/cjs/utility/type.js"

export const addCartAction = (product) => {
    return {type: "Add_Cart", payload:product}
}
export const updateCartrAction = (product) => {
    return {type: "Update_Cart", payload:product}
}
export const deleteCartAction = (id) => {
    return {type: "Delete_Cart", payload:id}
}
export const addwishlistAction = (product) => {
    return {type: "Add_wishlist", payload:product}
}
export const deletewishlistAction = (id) => {
    return {type: "Delete_wishlist", payload:id}
}
export const searchAction = (search) =>{
    return {type: "Search" , payload:search }
}
export const deleteAllAction = () =>{
    return {type : "deleteAll"}
}
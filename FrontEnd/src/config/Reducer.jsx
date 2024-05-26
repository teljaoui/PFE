import Cart from '../pages/Cart';
import { addCartAction, deleteCartAction, updateCartAction, addWishlistAction, deleteWishlistAction } from './Action';

const CART_LOCAL_STORAGE_KEY = 'cart';
const WISHLIST_LOCAL_STORAGE_KEY = 'wishlist';

const initialState = {
    carts: JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY)) || [],
    wishlist: JSON.parse(localStorage.getItem(WISHLIST_LOCAL_STORAGE_KEY)) || [],
    search: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "Add_Cart":
            const updatedCartsAdd = [...state.carts, action.payload];
            localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(updatedCartsAdd));
            return { ...state, carts: updatedCartsAdd };

        case "Update_Cart":
            const updatedCartsUpdate = state.carts.map(item => {
                if (item.id === parseInt(action.payload.id)) {
                    return { ...item, quantity: action.payload.quantity };
                }
                return item;
            });
            localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(updatedCartsUpdate));
            return { ...state, carts: updatedCartsUpdate };

        case "Delete_Cart":
            const updatedCartsDelete = state.carts.filter(item => item.id !== parseInt(action.payload));
            localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(updatedCartsDelete));
            return { ...state, carts: updatedCartsDelete };

        case "Add_wishlist":
            const updatedWishlistAdd = [...state.wishlist, action.payload];
            localStorage.setItem(WISHLIST_LOCAL_STORAGE_KEY, JSON.stringify(updatedWishlistAdd));
            return { ...state, wishlist: updatedWishlistAdd };

        case "Delete_wishlist":
            const updatedWishlistDelete = state.wishlist.filter(item => item.id !== parseInt(action.payload));
            localStorage.setItem(WISHLIST_LOCAL_STORAGE_KEY, JSON.stringify(updatedWishlistDelete));
            return { ...state, wishlist: updatedWishlistDelete };

        case "Search":
            return { ...state, search: action.payload };
        case "deleteAll" :
            localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify([]));
            return { ...state, carts: [] };
        default:
            return state;
    }
}

export default reducer;

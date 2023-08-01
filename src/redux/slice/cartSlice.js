import { createSlice } from "@reduxjs/toolkit"

const initState = {
    item: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initState,
    reducers: {
        addtocart: (state, action) => {
            console.log( action);
            let item = state.item.some((v) => v.pid === action.payload.pid)
            console.log(item);

            if (item) {
                let index = state.item.findIndex((v) => v.pid === action.payload.pid)
                state.item[index].qty++;
            } else {
                state.item.push(action.payload)
            }
            state.item = state.item

        },

        incCartQty: (state, action) => {
            let index = state.item.findIndex((v) => v.pid === action.payload)
            state.item[index].qty++

            state.item = state.item
        },

        decCartQty: (state, action) => {
            let index1 = state.item.findIndex((v) => v.pid === action.payload)

            if (state.item[index1].qty > 1) {
                state.item[index1].qty--;
            }

            state.item = state.item
        },

        deleteToCart: (state, action) => {
            state.item = state.item.filter((v) => v.pid != action.payload)

            state.item = state.item
        }
    }
})

export const { addtocart, incCartQty, decCartQty, deleteToCart } = cartSlice.actions;
export default cartSlice.reducer
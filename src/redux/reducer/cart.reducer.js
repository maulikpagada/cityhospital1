import { act } from 'react-dom/test-utils';
import * as Actiontypes from '../ActionTypes'

const initState = {
    item: [],
    isloading: false,
    error: null
}

export const cartreducer = (state = initState, action) => {
    console.log(action);

    switch (action.type) {
        case Actiontypes.ADD_TO_CART:

            let item = state.item.some((v) => v.pid === action.payload.pid)

            if (item) {
                let index = state.item.findIndex((v) => v.pid === action.payload.pid)
                state.item[index].qty++;
            } else {
                state.item.push(action.payload)
            }

            console.log(state);
            console.log(item);

            return {
                item: state.item,
                isloading: false,
                error: null
            }

        case Actiontypes.INC_CART:
            let index = state.item.findIndex((v) => v.pid === action.payload)
            state.item[index].qty++

            return {
                item: state.item,
                isloading: false,
                error: null
            }

        case Actiontypes.DEC_CART:
            let index1 = state.item.findIndex((v) => v.pid === action.payload)

            if (state.item[index1].qty > 1) {
                state.item[index1].qty--;
            }


            return {
                item: state.item,
                isloading: false,
                error: null
            }

        case Actiontypes.REMOVE_CART:
            console.log(action.payload);
            return {
                ...state,
                item: state.item.filter((v) => v.pid != action.payload)
            }

        default:
            return state
    }
}
import * as ActionTypes from '../ActionTypes'

const initState = {
    item: [],
    loading: false,
    error: null,
}

export const myFavReducer = (state = initState, action) => {
    console.log(action);
    switch (action.type) {
        case ActionTypes.ADD_FAV:
            let item = state.item.find((v) => v.fid === action.payload.fid)
            console.log(item);
            let newD;
            if (item) {
                newD = state.item.filter((v) => v.fid !== action.payload.fid)
                state.item = newD
            } else {
                state.item.push(action.payload)
            }
            
            console.log(item, state , newD);

            return {
                item: state.item,
                error: null,
                loading: false
            }

            case ActionTypes.REMOVE_TO_FAV:
            return {
                item: state.item.filter((v) => v.fid !== action.payload),
                error: null,
                loading: false
            }

        default:
            return state;
    }
}
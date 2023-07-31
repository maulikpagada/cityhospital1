import * as ActionTypes from '../ActionTypes'

const initState = {
    item: []
}

export const myFavReducer = (state = initState, action) => {
    console.log(action.payload);
    switch (action.type) {
        case ActionTypes.ADD_FAV:
            let item = state.item.find((v) => v.fid === action.payload.fid)
            console.log(item);

            if (item) {

            } else {
                state.item.push(action.payload)
            }

            console.log(state.item);
            return {
                ...state,
            }

        default:
            return state;
    }
}
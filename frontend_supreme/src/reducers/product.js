import initialState from '../store/initialState';
import ActionTypes from '../constants/ActionTypes';

export default function (state = initialState.product, action) {
    switch (action.type) {
        case ActionTypes.GET_PRODUCTS:
            return _assign({}, state, {
                productList: action.payload,
            });;
        default:
            return state;
    }
}


import {GET_ARTICLES, SET_LOADING_STATUS} from "../actions/actionType";

const initState = {
    loading: false,
    articles: []
}


export const articleReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LOADING_STATUS:
            return{
                ...state,
                loading: action.status
            }
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload
            }
        default:
            return state
    }
}
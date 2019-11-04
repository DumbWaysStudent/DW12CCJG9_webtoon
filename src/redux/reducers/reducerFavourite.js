import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    favourites: [],
    favouritesSD: []
};

export default function reducerFavourite(state = initialState, action) {
    switch (action.type) {
        // GET MY FAVOURITE
        case `${types.GET_MY_FAVOURITE}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.GET_MY_FAVOURITE}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                favourites: action.payload.data
            }
        case `${types.GET_MY_FAVOURITE}_REJECTED`:
            alert("Can't load data, no internet connection")
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // ADD MY FAVOURITE
        case `${types.ADD_MY_FAVOURITE}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.ADD_MY_FAVOURITE}_FULFILLED`:
            state.favourites.push(action.payload.data)
            return {
                ...state,
                isLoading: false,
                isSuccess: true
            }
        case `${types.ADD_MY_FAVOURITE}_REJECTED`:
            alert("Can't load data, no internet connection")
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // DELETE MY FAVOURITE
        case `${types.DELETE_MY_FAVOURITE}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.DELETE_MY_FAVOURITE}_FULFILLED`:
            let newData = state.favourites.filter((item) => item.id != action.payload.data.id)
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                favourites: newData
            }
        case `${types.DELETE_MY_FAVOURITE}_REJECTED`:
            alert("Can't load data, no internet connection")
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state
    }
}

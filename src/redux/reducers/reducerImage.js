import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    images: []
};

export default function reducerImage(state = initialState, action) {
    switch (action.type) {
        // GET IMAGES
        case `${types.GET_IMAGES}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.GET_IMAGES}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                images: action.payload.data
            }
        case `${types.GET_IMAGES}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // ADD IMAGE
        case `${types.ADD_IMAGE}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.ADD_IMAGE}_FULFILLED`:
                state.images.push(action.payload.data)
            return {
                ...state,
                isLoading: false,
                isSuccess: true
            }
        case `${types.ADD_IMAGE}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // UPDATE IMAGE
        case `${types.UPDATE_IMAGE}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.UPDATE_IMAGE}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                images: action.payload.data
            }
        case `${types.UPDATE_IMAGE}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // DELETE IMAGE
        case `${types.DELETE_IMAGE}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.DELETE_IMAGE}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                images: action.payload.data
            }
        case `${types.DELETE_IMAGE}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state
    }
}

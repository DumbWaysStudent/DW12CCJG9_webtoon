import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    profile: []
};

export default function reducerProfile(state = initialState, action) {
    switch (action.type) {
        // GET PROFILE
        case `${types.GET_PROFILE}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.GET_PROFILE}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                profile: action.payload.data
            }
        case `${types.GET_PROFILE}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // UPDATE PROFILE
        case `${types.UPDATE_PROFILE}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.UPDATE_PROFILE}_FULFILLED`:
            console.log(action.payload.data)      
            // if (!action.payload.data.hasOwnProperty('profile_image') && !action.payload.data.hasOwnProperty('profile_image')) {
                if (!action.payload.data.hasOwnProperty('name')) {
                    state.profile.profile_image = action.payload.data.profile_image
                } else if (!action.payload.data.hasOwnProperty('profile_image')) {
                    state.profile.name = action.payload.data.name
                } else {
                    state.profile = action.payload.data
                }
            // }

            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                // profile: action.payload.data
            }
        case `${types.UPDATE_PROFILE}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // GET PROFILE NAME
        // case `${types.GET_PROFILE_NAME}_PENDING`:
        //     return {
        //         ...state,
        //         isLoading: true
        //     }
        // case `${types.GET_PROFILE_NAME}_FULFILLED`:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isSuccess: true,
        //         profile: action.payload.data
        //     }
        // case `${types.GET_PROFILE_NAME}_REJECTED`:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isError: true
        //     }

        // // UPDATE PROFILE NAME
        // case `${types.UPDATE_PROFILE_NAME}_PENDING`:
        //     return {
        //         ...state,
        //         isLoading: true
        //     }
        // case `${types.UPDATE_PROFILE_NAME}_FULFILLED`:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isSuccess: true,
        //         profile: action.payload.data
        //     }
        // case `${types.UPDATE_PROFILE_NAME}_REJECTED`:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isError: true
        //     }
        default:
            return state
    }
}

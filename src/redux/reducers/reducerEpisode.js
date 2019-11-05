import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    episodes: []
};

export default function reducerEpisode(state = initialState, action) {
    switch (action.type) {
        // GET EPISODES
        case `${types.GET_EPISODES}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.GET_EPISODES}_FULFILLED`:
            // console.log(action.payload.data)
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                episodes: action.payload.data
            }
        case `${types.GET_EPISODES}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // ADD EPISODE
        case `${types.ADD_EPISODE}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.ADD_EPISODE}_FULFILLED`:
            state.episodes.unshift(action.payload.data)
            alert('Episode Created!')
            return {
                ...state,
                isLoading: false,
                isSuccess: true
            }
        case `${types.ADD_EPISODE}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // UPDATE EPISODE
        case `${types.UPDATE_EPISODE}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.UPDATE_EPISODE}_FULFILLED`:
            let index = state.episodes.findIndex( x => x.id == action.payload.data.id)
            state.episodes[index] = action.payload.data
            return {
                ...state,
                isLoading: false,
                isSuccess: true
            }
        case `${types.UPDATE_EPISODE}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // DELETE EPISODE
        case `${types.DELETE_EPISODE}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.DELETE_EPISODE}_FULFILLED`:
                let newData = state.episodes.filter((item) => item.id != action.payload.data.id)
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                episodes: newData
            }
        case `${types.DELETE_EPISODE}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state
    }
}

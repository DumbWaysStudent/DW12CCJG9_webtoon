import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    webtoons: [],
    choicesWebtoons: [],
    popularWebtoons: [],
    myWebtoons: [],
    myWebtoonsEpisodes: []
};

export default function reducerWebtoon(state = initialState, action) {
    switch (action.type) {
        // GET - WEBTOONS
        case `${types.GET_WEBTOONS}_PENDING`:
            // alert('Loading...')
            return {
                ...state,
                isLoading: true
            }
        case `${types.GET_WEBTOONS}_FULFILLED`:
            // alert('Succeess')
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                webtoons: action.payload.data
            }
        case `${types.GET_WEBTOONS}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // GET - CHOICES
        case `${types.GET_CHOICES_WEBTOONS}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.GET_CHOICES_WEBTOONS}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                choicesWebtoons: action.payload.data
            }
        case `${types.GET_CHOICES_WEBTOONS}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // GET - POPULAR
        case `${types.GET_POPULAR_WEBTOONS}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.GET_POPULAR_WEBTOONS}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                popularWebtoons: action.payload.data
            }
        case `${types.GET_POPULAR_WEBTOONS}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // GET - MY WEBTOONS
        case `${types.GET_MY_WEBTOONS}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.GET_MY_WEBTOONS}_FULFILLED`:
            let data = action.payload.data,
                dataEp;
            dataEp = data.pop();
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                myWebtoons: data,
                myWebtoonsEpisodes: dataEp
            }
        case `${types.GET_MY_WEBTOONS}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // ADD WEBTOON
        case `${types.ADD_WEBTOON}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.ADD_WEBTOON}_FULFILLED`:
            state.webtoons.push(action.payload.data)
            // alert('Webtoon Created!')
            return {
                ...state,
                isLoading: false,
                isSuccess: true
            }
        case `${types.ADD_WEBTOON}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // ADD MY WEBTOON
        case `${types.ADD_MY_WEBTOON}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.ADD_MY_WEBTOON}_FULFILLED`:
            let data2 = action.payload.data,
                dataEp2;
            dataEp2 = data2.pop();
            state.myWebtoonsEpisodes.push(dataEp2)
            state.myWebtoons.push(action.payload.data[0])
            return {
                ...state,
                isLoading: false,
                isSuccess: true
            }
        case `${types.ADD_MY_WEBTOON}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // UPDATE WEBTOONS
        case `${types.UPDATE_WEBTOON}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.UPDATE_WEBTOON}_FULFILLED`:
            var index, index2;
            console.log(action.payload.data)

            // if (action.payload.data == true) {
                index = state.webtoons.findIndex(x => x.id == action.payload.data[0].id)
                index2 = state.myWebtoons.findIndex(x => x.id == action.payload.data[0].id)
            // } else {
            //     alert('Nothing Changed')
            // }
            // console.log(index, index2)
            if (index !== -1) {
                state.webtoons[index] = action.payload.data[0]
                state.myWebtoons[index] = action.payload.data[0]
            }

            return {
                ...state,
                isLoading: false,
                isSuccess: true
            }
        case `${types.UPDATE_WEBTOON}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // DELETE WEBTOONS
        case `${types.DELETE_WEBTOON}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.DELETE_WEBTOON}_FULFILLED`:
            let newData = state.webtoons.filter((item) => item.id != action.payload.data.id)
            let newData2 = state.myWebtoons.filter((item) => item.id != action.payload.data.id)
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                webtoons: newData,
                myWebtoons: newData2
            }
        case `${types.DELETE_WEBTOON}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state
    }
}

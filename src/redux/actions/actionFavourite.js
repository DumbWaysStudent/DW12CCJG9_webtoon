import * as types from './../types'
import axios from 'axios'

export const handleGetMyFavourite = (params) => ({
    type: types.GET_MY_FAVOURITE,
    payload: axios({
        method: 'get',
        url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/webtoons/favourite`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleAddMyFavourite = (params) => ({
    type: types.ADD_MY_FAVOURITE,
    payload: axios({
        method: 'post',
        url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/webtoon/${params.webtoonID}/favourite`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleDeleteMyFavourite = (params) => ({
    type: types.DELETE_MY_FAVOURITE,
    payload: axios({
        method: 'delete',
        url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/webtoon/${params.webtoonID}/favourite/${params.favouriteID}`,
        headers: {
            Authorization: params.token
        }
    })
})
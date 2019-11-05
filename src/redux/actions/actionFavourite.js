import * as types from './../types'
import axios from 'axios'
import { API_URL } from './../../services/rest-api'

export const handleGetMyFavourite = (params) => ({
    type: types.GET_MY_FAVOURITE,
    payload: axios({
        method: 'get',
        url: `${API_URL}/user/${params.userID}/webtoons/favourite`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleAddMyFavourite = (params) => ({
    type: types.ADD_MY_FAVOURITE,
    payload: axios({
        method: 'post',
        url: `${API_URL}/user/${params.userID}/webtoon/${params.webtoonID}/favourite`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleDeleteMyFavourite = (params) => ({
    type: types.DELETE_MY_FAVOURITE,
    payload: axios({
        method: 'delete',
        url: `${API_URL}/user/${params.userID}/webtoon/${params.webtoonID}/favourite/${params.favouriteID}`,
        headers: {
            Authorization: params.token
        }
    })
})
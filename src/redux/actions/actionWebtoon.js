import * as types from './../types'
import axios from 'axios'

export const handleGetWebtoons = (token) => ({
    type: types.GET_WEBTOONS,
    payload: axios({
        method: 'get',
        url: 'https://smoketoon-api.herokuapp.com/api/v1/webtoons',
        headers: {
            Authorization: token
        }
    })
})

export const handleGetChoicesWebtoons = (token) => ({
    type: types.GET_CHOICES_WEBTOONS,
    payload: axios({
        method: 'get',
        url: 'https://smoketoon-api.herokuapp.com/api/v1/webtoons/choices/',
        headers: {
            Authorization: token
        }
    })
})

export const handleGetPopularWebtoons = (token) => ({
    type: types.GET_POPULAR_WEBTOONS,
    payload: axios({
        method: 'get',
        url: 'https://smoketoon-api.herokuapp.com/api/v1/webtoons/popular',
        headers: {
            Authorization: token
        }
    })
})

export const handleGetMyWebtoons = (params) => ({
    type: types.GET_MY_WEBTOONS,
    payload: axios({
        method: 'get',
        url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/webtoons`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleAddWebtoon = (params) => ({
    type: types.ADD_WEBTOON,
    payload: axios({
        method: 'post',
        url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/webtoon`,
        data: {
            title: params.title,
            genre: params.genre,
            image: params.image,
            // childData: params.childData
        },
        headers: {
            Authorization: params.token
        }
    })
})

export const handleAddMyWebtoon = (params) => ({
    type: types.ADD_MY_WEBTOON,
    payload: axios({
        method: 'put',
        url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/webtoon/${params.webtoonID}`,
        data: {
            status: 'published'
        },
        headers: {
            Authorization: params.token
        }
    })
})

export const handleUpdateWebtoon = (params) => ({
    type: types.UPDATE_WEBTOON,
    payload: axios({
        method: 'put',
        url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/webtoon/${params.webtoonID}`,
        data: params.payload,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleDeleteWebtoon = (params) => ({
    type: types.DELETE_WEBTOON,
    payload: axios({
        method: 'delete',
        url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/webtoon/${params.webtoonID}`,
        headers: {
            Authorization: params.token
        }
    })
})
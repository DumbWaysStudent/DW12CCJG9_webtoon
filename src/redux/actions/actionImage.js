import * as types from './../types'
import axios from 'axios'
import { API_URL } from './../../services/rest-api'

export const handleGetImages = (params) => ({
    type: types.GET_IMAGES,
    payload: axios({
        method: 'get',
        url: `${API_URL}/webtoon/${params.webtoonID}/episode/${params.episodeID}`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleAddImage = (params) => ({
    type: types.ADD_IMAGE,
    payload: axios({
        method: 'post',
        url: `${API_URL}/user/${params.userID}/webtoon/${params.webtoonID}/episode/${params.episodeID}/image`,
        data: params.formData,
        headers: {
            Authorization: params.token
        }
    })
})

// export const handleUpdateImage = (params) => ({
//     type: types.UPDATE_IMAGE,
//     payload: axios({
//         method: 'put',
//         url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/webtoon/${params.webtoonID}/episode/${params.episodeID}/image/${params.imageID}`,
//         headers: {
//             Authorization: params.token
//         }
//     })
// })

export const handleDeleteImage = (params) => ({
    type: types.DELETE_IMAGE,
    payload: axios({
        method: 'delete',
        url: `${API_URL}/user/${params.userID}/webtoon/${params.webtoonID}/episode/${params.episodeID}/image/${params.imageID}`,
        headers: {
            Authorization: params.token
        }
    })
})
import * as types from './../types'
import axios from 'axios'

export const handleGetImages = (params) => ({
    type: types.GET_IMAGES,
    payload: axios({
        method: 'get',
        url: `https://smoketoon-api.herokuapp.com/api/v1/webtoon/${params.webtoonID}/episode/${params.episodeID}`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleAddImage = (params) => ({
    type: types.ADD_IMAGE,
    payload: axios({
        method: 'post',
        url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/webtoon/${params.webtoonID}/episode/${params.episodeID}/image`,
        data: {
            page: params.page,
            image: params.image
        },
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
        url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/webtoon/${params.webtoonID}/episode/${params.episodeID}/image/${params.imageID}`,
        headers: {
            Authorization: params.token
        }
    })
})
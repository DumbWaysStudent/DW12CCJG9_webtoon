import * as types from './../types'
import axios from 'axios'

export const handleGetEpisodes = (params) => ({
    type: types.GET_EPISODES,
    payload: axios({
        method: 'get',
        url: `https://smoketoon-api.herokuapp.com/api/v1/webtoon/${params.webtoonID}/episodes`,
        headers: {
            'Authorization': params.token
        }
    })
})

export const handleAddEpisode = (params) => ({
    type: types.ADD_EPISODE,
    payload: axios({
        method: 'post',
        url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/webtoon/${params.webtoonID}/episode`,
        data: {
            title: params.title,
            image: params.image,
            pages: params.pages
        },
        headers: {
            'Authorization': params.token
        }
    })
})

export const handleUpdateEpisode = (params) => ({
    type: types.UPDATE_EPISODE,
    payload: axios({ 
        method: 'put',
        url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/webtoon/${params.webtoonID}/episode/${params.episodeID}`,
        data: {
            title: params.title
        },
        headers: {
            'Authorization': params.token
        }
    })
})

export const handleDeleteEpisode = (params) => ({
    type: types.DELETE_EPISODE,
    payload: axios({
        method: 'delete',
        url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/webtoon/${params.webtoonID}/episode/${params.episodeID}`,
        headers: {
            'Authorization': params.token
        }
    })
})
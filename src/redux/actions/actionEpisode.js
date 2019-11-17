import * as types from './../types'
import axios from 'axios'
import { API_URL } from './../../services/rest-api'

export const handleGetEpisodes = (params) => ({
    type: types.GET_EPISODES,
    payload: axios({
        method: 'get',
        url: `${API_URL}/webtoon/${params.webtoonID}/episodes`,
        headers: {
            'Authorization': params.token
        }
    })
})

export const handleAddEpisode = (params) => ({
    type: types.ADD_EPISODE,
    payload: axios({
        method: 'post',
        url: `${API_URL}/user/${params.userID}/webtoon/${params.webtoonID}/episode`,
        data: params.data,
        headers: {
            'Authorization': params.token
        }
    })
})

export const handleUpdateEpisode = (params) => ({
    type: types.UPDATE_EPISODE,
    payload: axios({ 
        method: 'put',
        url: `${API_URL}/user/${params.userID}/webtoon/${params.webtoonID}/episode/${params.episodeID}`,
        data: {
            title: params.title,
            image: params.image
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
        url: `${API_URL}/user/${params.userID}/webtoon/${params.webtoonID}/episode/${params.episodeID}`,
        data: {
            epTitle: params.epTitle
        },
        headers: {
            'Authorization': params.token
        }
    })
})
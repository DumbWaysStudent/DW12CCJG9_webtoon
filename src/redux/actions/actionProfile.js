import * as types from './../types'
import axios from 'axios'
import { API_URL } from './../../services/rest-api'

export const handleGetProfile = (params) => ({
    type: types.GET_PROFILE,
    payload: axios({
        method: 'get',
        url: `${API_URL}/user/${params.userID}/profile`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleUpdateProfile = (params) => ({
    type: types.UPDATE_PROFILE,
    payload: axios({
        method: 'post',
        url: `${API_URL}/user/${params.userID}/profile`,
        data: params.payload.formData,
        headers: {
            Authorization: params.token
        }
    })
})

// export const handleGetProfileName = (userID) => ({
//     type: types.GET_PROFILE_NAME,
//     payload: axios.get(`https://smoketoon-api.herokuapp.com/api/v1/user/${userID}/profile/name`)
// })

// export const handleUpdateProfileName = (userID) => ({
//     type: types.UPDATE_PROFILE_NAME,
//     payload: axios.patch(`https://smoketoon-api.herokuapp.com/api/v1/user/${userID}/profile/name`)
// })
import * as types from './../types'
import axios from 'axios'

export const handleGetProfile = (params) => ({
    type: types.GET_PROFILE,
    payload: axios({
        method: 'get',
        url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/profile`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleUpdateProfile = (params) => ({
    type: types.UPDATE_PROFILE,
    payload: axios({
        method: 'post',
        url: `https://smoketoon-api.herokuapp.com/api/v1/user/${params.userID}/profile`,
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
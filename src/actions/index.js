import {auth, provider} from '../firebase'
import {SET_USER} from "./actionType";

const setUser = (payload) => ({type: SET_USER, user: payload})

export const signInAPI = () => (dispatch) => {
    auth.signInWithPopup(provider).then(res => {
        dispatch(setUser(res.user))
    }).catch(e => {
        console.log(e)
    })
}

export const getUserAuth = () => (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            dispatch(setUser(user))
        }
    })
}

export const signOutAPI = () => (dispatch) => {
    auth.signOut().then(() => {
        dispatch(setUser(null))
        console.log('signOut')

    }).catch(e => console.log(e))
}
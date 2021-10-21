import {auth, provider, storage, db} from '../firebase'
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

export const postArticleAPI = (payload) => (dispatch) => {
    if (payload.image) {
        const upload = storage.ref(`images/${payload.image.name}`).put(payload.image)
        upload.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`progress: ${progress}%`)
            if (snapshot.state === 'RUNNING') {
                console.log(`Progress: ${progress}%`)
            }
        }, error => console.log(error.code), async () => {
            const downloadURL = await upload.snapshot.ref.getDownloadURL();
            db.collection("articles").add({
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                video: payload.video,
                sharedImg: downloadURL,
                comments: 0,
                description: payload.description
            })
        })

    } else if(payload.video){
        db.collection("articles").add({
            actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: '',
            comments: 0,
            description: payload.description
        })
    }
}

export const signOutAPI = () => (dispatch) => {
    auth.signOut().then(() => {
        dispatch(setUser(null))
        console.log('signOut')

    }).catch(e => console.log(e))
}
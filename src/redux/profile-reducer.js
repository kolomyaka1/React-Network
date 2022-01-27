import {
    usersAPI,
    profileAPI
} from "../components/API/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'
const LIKE_POST = 'LIKE_POST'
const DISLIKE_POST = 'DISLIKE_POST'


let initialState = {
    postsData: [{
            id: 1,
            message: 'Hello, glad to see u on my page...',
            likesCounter: 15,
            isLiked : false,
        },
        {
            id: 2,
            message: 'Try to add new post!!',
            likesCounter: 7,
            isLiked : false,
        },
        {
            id: 3,
            message: 'Try to chek all users on users page',
            likesCounter: 9,
            isLiked : false,
        },
        {
            id: 4,
            message: 'U can like post!',
            likesCounter: 5,
            isLiked : false,
        },
    ],
    newPostText: '',
    profile: null,
    status: '',
    postId : 5,

}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: state.postId++,
                message: state.newPostText, // Берем данные сообщения из state.
                likesCounter: Math.floor(Math.random() * 20)
            };
            let stateCopy = {
                ...state
            };
            stateCopy.postsData = [...state.postsData];
            stateCopy.postsData.push(newPost); // Добавляем наш объект (сообщ) в state
            stateCopy.newPostText = ''; // Зачищаем наш textarea после ввода текста
            return stateCopy;
        }
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = {
                ...state
            };
            stateCopy.newPostText = action.text;
            return stateCopy;
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.id)
            }
        }
        case SAVE_PHOTO_SUCCESS : {
            return { ...state, profile : {...state.profile, photos : action.photos}}
        }
        case LIKE_POST : {
            return { 
                ...state,
                postsData : state.postsData.map(p => {
                    if (p.id === action.id) {
                        p.likesCounter++;
                        return {
                            ...p,
                            isLiked : true
                        }
                    }
                    return p
                })
            }
        }
        case DISLIKE_POST : {
            return {
                ...state,
                postsData : state.postsData.map(p => {
                    if (p.id === action.id) {
                        p.likesCounter--;
                        return {
                            ...p,
                            isLiked : false
                        }
                    }
                    return p
                })
            }
        }
        default:
            return state;
    }

}

export const addPostActionCreator = () => ({
    type: ADD_POST
})
export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    text
})
export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
})
export const setUserStatus = (status) => ({
    type: SET_USER_STATUS,
    status
})
export const deletePost = (id) => ({
    type: DELETE_POST,
    id
})

export const savePhotoSuccess = (photos) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
})

export const likePost = (id) => ({
    type: LIKE_POST,
    id
})

export const dislikePost = (id) => ({
    type: DISLIKE_POST,
    id
})

export const getProfile = (id) => {
    return (dispatch) => {
        usersAPI.getProfile(id)
            .then((data) => {
                dispatch(setUserProfile(data));
            });
    }
}

export const getUserStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setUserStatus(response.data))
            });
    }
}

export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}


export const savePhoto = (photos) => async (dispatch) => {
    
    let response = await profileAPI.updatePhoto(photos);
    
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export default profileReducer;
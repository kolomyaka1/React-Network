import { profileAPI } from './../components/API/profile-api';
import { usersAPI } from "../components/API/users-api";
import { PhotosType, PostType, ProfileType } from "../types/types";

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
            message: 'Try to check all users on users page',
            likesCounter: 9,
            isLiked : false,
        },
        {
            id: 4,
            message: 'U can like post!',
            likesCounter: 5,
            isLiked : false,
        },
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null,  // object Profile data 
    status: '',
    postId : 5 as number,
    isOwner : false
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action:any): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: state.postId++,  // При создании поста увеличиваем id на 1
                message: state.newPostText, // Берем данные сообщения из state.
                likesCounter: Math.floor(Math.random() * 20), 
                isLiked : false
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
            return { ...state, profile : {...state.profile, photos : action.photos} as ProfileType}
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



type addPostActionCreatorType = {
    type : typeof ADD_POST
}
export const addPostActionCreator = (): addPostActionCreatorType => ({
    type: ADD_POST
})


type updateNewPostTextActionCreatorType = {
    type : typeof UPDATE_NEW_POST_TEXT
    text : string
}
export const updateNewPostTextActionCreator = (text:string): updateNewPostTextActionCreatorType => ({
    type: UPDATE_NEW_POST_TEXT,
    text
})


type setUserProfileType = {
    type : typeof SET_USER_PROFILE
    profile : ProfileType
}
export const setUserProfile = (profile:ProfileType):setUserProfileType => ({
    type: SET_USER_PROFILE,
    profile
})


type setUserStatusType = {
    type : typeof SET_USER_STATUS
    status : string
}
export const setUserStatus = (status:string): setUserStatusType => ({
    type: SET_USER_STATUS,
    status
})


type deletePostType = {
    type : typeof DELETE_POST
    id : number
}
export const deletePost = (id:number): deletePostType => ({
    type: DELETE_POST,
    id
})


type savePhotoSuccessType = {
    type : typeof SAVE_PHOTO_SUCCESS
    photos : PhotosType
}
export const savePhotoSuccess = (photos:PhotosType): savePhotoSuccessType => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
})


type likePostType = {
    type : typeof LIKE_POST
    id : number
}
export const likePost = (id:number): likePostType => ({
    type: LIKE_POST,
    id
})


type dislikePostType = {
    type : typeof DISLIKE_POST
    id : number
}
export const dislikePost = (id:number): dislikePostType => ({
    type: DISLIKE_POST,
    id
})


export const getProfile = (id:number) => async (dispatch:any) => {
    let promise = await usersAPI.getProfile(id)
    dispatch(setUserProfile(promise))
}

export const getUserStatus = (userId:number) => async (dispatch:any) => {
    let promise = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(promise.data))            
}


export const updateUserStatus = (status:string) => async (dispatch:any) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}


export const savePhoto = (photos:any) => async (dispatch:any) => {   // thunk для сохранения фото(ава) в профиле
    let response = await profileAPI.updatePhoto(photos);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export default profileReducer;
import { PhotosType } from './../types/types';
import { profileAPI } from './../components/API/profile-api';
import { PostType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionTypes } from './redux-store';

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

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

export const actions = {   // Указываем наши actions в объект для типизации
    addPostActionCreator : () => ({ type: ADD_POST } as const),
    updateNewPostTextActionCreator : (text:string) => ({ type: UPDATE_NEW_POST_TEXT, text } as const),
    setUserProfile : (profile:ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
    setUserStatus : (status:string) => ({ type: SET_USER_STATUS, status } as const),
    deletePost : (id:number) => ({ type: DELETE_POST, id } as const),
    savePhotoSuccess : (photos:PhotosType) => ({ type: SAVE_PHOTO_SUCCESS, photos } as const),
    likePost : (id:number) => ({ type: LIKE_POST, id } as const),
    dislikePost : (id:number) => ({ type: DISLIKE_POST, id } as const),
}

type ActionsTypes = InferActionTypes<typeof actions> // Создаем типизацию для actions
type ThunkType = BaseThunkType<ActionsTypes>  // Создаем типизацию для thunk


export const getProfile = (id:number): ThunkType => async (dispatch) => {  // Thunk для загрузки профиля
    let promise = await profileAPI.getProfile(id)
    dispatch(actions.setUserProfile(promise))
}

export const getUserStatus = (userId:number): ThunkType => async (dispatch) => { // thunk для получения статуса в зависимости от загруженного пользователя
    let promise = await profileAPI.getStatus(userId)
    dispatch(actions.setUserStatus(promise.data))            
}

export const updateUserStatus = (status:string): ThunkType => async (dispatch) => {  // thunk для обновления статуса в профиле
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(actions.setUserStatus(status))
    }
}

export const savePhoto = (photos:string): ThunkType => async (dispatch) => {   // thunk для сохранения фото(ава) в профиле
    let response = await profileAPI.updatePhoto(photos);
    if (response.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.photos))
    }
}

export default profileReducer;
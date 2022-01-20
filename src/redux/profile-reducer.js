import { usersAPI, profileAPI } from "../components/API/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';


let initialState = {
    postsData:
        [
            { id: 1, message: 'Hi! How are u?!', likesCounter: 15 },
            { id: 2, message: 'It`s my first post', likesCounter: 7 },
            { id: 3, message: 'I wanna see u', likesCounter: 9 },
            { id: 4, message: 'Ye, we can do it tomorrow!!', likesCounter: 5 },
        ],
    newPostText: '',
    profile: null,
    status: 'Hello Everyone!',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,  // Берем данные сообщения из state.
                likesCounter: Math.floor(Math.random() * 10 + 5)
            };
            let stateCopy = { ...state };
            stateCopy.postsData = [...state.postsData];
            stateCopy.postsData.push(newPost); // Добавляем наш объект (сообщ) в state
            stateCopy.newPostText = ''; // Зачищаем наш textarea после ввода текста
            return stateCopy;
        }
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = { ...state };
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_USER_STATUS: {
            return { ...state, status: action.status }
        }
        default:
            return state;
    }

}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => (
    { type: UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status })


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

export const updateUserStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
        })
}

export default profileReducer;
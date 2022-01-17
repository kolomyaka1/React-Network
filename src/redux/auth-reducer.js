import {authAPI, usersAPI} from '../components/API/api'


const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {  // Указываем какие данные нам приходят от сервера
    userId : null,
    email : null,
    login : null,
    isFetching : false, // Loader
    isAuth : false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: // Указываем какой тип нам может возвращать AC
            return {
                ...state,  // Берем данные из state
                ...action.data,  // В action создаем объект data, в который закидываем наши данные с сервера
                isAuth : true,
            }
        default:
            return state;
    }

}

export const setAuthUserData = (userId, email, login, isAuth) => ({type : SET_USER_DATA, data: {userId, email, login, isAuth}})  // Сoздаем наш AC

export const getAuthUser = () => {
    return (dispatch) => {
        usersAPI.authMe()
        .then(data => {
            if (data.resultCode === 0) {      
                let {id,login,email} = data.data;
                dispatch(setAuthUserData(id,email,login,true));
            }
        });
    }
}

export const login = (email,password) => {
    return (dispatch) => {
        authAPI.login( email,password )
        .then(response => {
            debugger
            if (response.data.resultCode === 0) {
                dispatch(getAuthUser())
            } 
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null,false));
            }
        })
    } 
}


export default authReducer;
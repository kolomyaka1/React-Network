import { authAPI, usersAPI } from '../components/API/api'

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';

let initialState = {  // Указываем какие данные нам приходят от сервера
    userId: null,
    email: null,
    login: null,
    isFetching: false, // Loader
    isAuth: false,
    captcha: '',
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: // Указываем какой тип нам может возвращать AC
            return {
                ...state,  // Берем данные из state
                ...action.data,  // В action создаем объект data, в который закидываем наши данные с сервера
                isAuth: true,
            }
        case SET_CAPTCHA:
            return { ...state, captcha: action.captcha }
        default:
            return state;
    }

}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, data: { userId, email, login, isAuth } })  // Сoздаем наш AC
export const setCaptcha = (captcha) => ({ type: SET_CAPTCHA, captcha });

export const getAuthUser = () => (dispatch) => {
    return usersAPI.authMe()
        .then(data => {
            if (data.resultCode === 0) {
                let { id, login, email } = data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        });
    
}

export const getCaptcha = () => {
    return (dispatch) => {
        authAPI.getCaptcha()
            .then(response => {
                dispatch(setCaptcha(response.data.url))
            })
    }
}

export const login = (email, password, captcha) => {
    return (dispatch) => {
        authAPI.login(email, password, captcha)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUser())
                } else if (response.data.resultCode === 10) {
                    dispatch(getCaptcha())
                } else if (response.data.resultCode === 1) {
                    alert('Неверный Email или пароль')
                }
            })
    }
}

export const logout = () => {
    return (dispatch) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false));
                }
            })
    }
}


export default authReducer;
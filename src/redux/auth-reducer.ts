import { ThunkAction } from 'redux-thunk';
import { authAPI, usersAPI } from '../components/API/api'
import { AppStateType } from './redux-store';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';



let initialState = {  // Указываем какие данные нам приходят от сервера
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false, // Loader
    isAuth: false,
    captcha: '' as string | null,

}

export type InitialStateType = typeof initialState
type ActionsType = SetAuthUserDataActionType | setCaptchaActionType


const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: // Указываем какой тип нам может возвращать AC
            return {
                ...state,  // Берем данные из state
                ...action.data,  // В action создаем объект data, в который закидываем наши данные с сервера
                isAuth: true,
                userId: action.data.userId,
            }
        case SET_CAPTCHA:
            return { ...state, captcha: action.captcha }
        default:
            return state;
    }

}

// ===========================================  ACTIONS  =================================================


type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    data: SetAuthUserDataActionPayloadType
}

type setCaptchaActionType = {
    type: typeof SET_CAPTCHA
    captcha: string
}


export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({ type: SET_USER_DATA, data: { userId, email, login, isAuth } })  // Сoздаем наш AC
export const setCaptcha = (captcha: string): setCaptchaActionType => ({ type: SET_CAPTCHA, captcha });

// ===========================================  THUNKS ================================= 

type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getAuthUser = (): ThunksType => async (dispatch) => {
    let response = await usersAPI.authMe();
    if (response.resultCode === 0) {
        let { id, login, email } = response.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};


export const getCaptcha = (): ThunksType => async (dispatch) => {
    let response = await authAPI.getCaptcha();
    dispatch(setCaptcha(response.data.url))
}


export const login = (email:string, password:string, captcha:string): ThunksType =>  async (dispatch) => {
    let response = await authAPI.login(email, password, captcha);
        if (response.data.resultCode === 0) {
            dispatch(getAuthUser())
        } else if (response.data.resultCode === 10) {
            dispatch(getCaptcha())
        } else if (response.data.resultCode === 1) {
            alert('Неверный email или пароль')
        }
}

export const logout = (): ThunksType =>  async (dispatch:any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null,null,null,false))
    }
}


export default authReducer;
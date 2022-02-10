import { Dispatch } from 'react';
import { authAPI } from '../components/API/auth-api';
import { AppStateType, BaseThunkType, InferActionTypes } from './redux-store';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';

export type InitialStateType = typeof initialState
let initialState = {  // Указываем какие данные нам приходят от сервера
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false, // Loader
    isAuth: false,
    captcha: '' as string | null,
}


const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    
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

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>


type ActionsTypes = InferActionTypes<typeof actions>

export const actions = {  // Типизируаем наши actions (Санки сюда не добавляем!!)
    setAuthUserData : (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: SET_USER_DATA, data: { userId, email, login, isAuth }} as const),
    setCaptcha : (captcha: string) => ({ type: SET_CAPTCHA, captcha } as const),
} 


export const getAuthUser = (): ThunkType => async (dispatch) => {
    let response = await authAPI.authMe();
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
};


export const getCaptcha = (): ThunkType => async (dispatch) => {
    let response = await authAPI.getCaptcha();
    dispatch(actions.setCaptcha(response.url))
}


export const login = (email:string, password:string, captcha:string): ThunkType =>  async (dispatch) => {
    let response = await authAPI.login(email, password, captcha);
        if (response.resultCode === 0) {
            dispatch(getAuthUser())
        } else if (response.resultCode === 10) {
            dispatch(getCaptcha())
        } else if (response.resultCode === 1) {
            alert('Неверный email или пароль')
        }
}

export const logout = (): ThunkType =>  async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null,null,null,false))
    }
}


export default authReducer;
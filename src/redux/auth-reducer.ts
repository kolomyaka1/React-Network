import { authAPI } from '../components/API/auth-api';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';

export type InitialStateType2 = {
    userId: number | null
    email: string | null
    login: string | null
    isFetching: boolean 
    isAuth: boolean
    captcha: string | null
}

let initialState = {  // Указываем какие данные нам приходят от сервера
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false, // Loader
    isAuth: false,
    captcha: '' as string | null,

}

export type InitialStateType = typeof initialState


const authReducer = (state = initialState, action: any): InitialStateType2 => {
    
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

export const getAuthUser = ():any => async (dispatch: any) => {
    let response = await authAPI.authMe();
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};


export const getCaptcha = () => async (dispatch:any) => {
    let response = await authAPI.getCaptcha();
    dispatch(setCaptcha(response.data.url))
}


export const login = (email:string, password:string, captcha:string) =>  async (dispatch:any) => {
    let response = await authAPI.login(email, password, captcha);
        if (response.resultCode === 0) {
            dispatch(getAuthUser())
        } else if (response.resultCode === 10) {
            dispatch(getCaptcha())
        } else if (response.resultCode === 1) {
            alert('Неверный email или пароль')
        }
}

export const logout = () =>  async (dispatch:any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null,null,null,false))
    }
}


export default authReducer;
import { getAuthUser } from './auth-reducer'

const SET_INITIALIZED = 'SET_INITIALIZED';

export type InitialStateType = {
    initialized : boolean
}


let initialState : InitialStateType = {  // Указываем какие данные нам приходят от сервера
    initialized : false,
}

const appReducer = (state = initialState, action:any): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED : 
        return {
            ...state,
            initialized: true,
        }
        default:
            return state;
    }

}

type initializedSuccesActionType = {
    type : typeof SET_INITIALIZED
} 

export const initializedSuccess = (): initializedSuccesActionType => ({ type : SET_INITIALIZED });

export const initializeApp = () => (dispatch:any) => {
     let promise = dispatch(getAuthUser());  // Запрос асинхронный
     promise.then(() => {
        dispatch(initializedSuccess())
     });
}



export default appReducer;

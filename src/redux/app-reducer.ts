import { ThunkAction } from 'redux-thunk';
import { getAuthUser } from './auth-reducer'
import { AppStateType } from './redux-store';

const SET_INITIALIZED = 'SET_INITIALIZED';

export type InitialStateType = {
    initialized : boolean
}


let initialState : InitialStateType = {  // Указываем какие данные нам приходят от сервера
    initialized : false,
}

type ActionsType = initializedSuccesActionType

const appReducer = (state = initialState, action:ActionsType): InitialStateType => {
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

type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const initializeApp = (): ThunksType => 
    async (dispatch) => {
    let promise = dispatch(getAuthUser());  // Запрос асинхронный
    promise.then(() => {
        dispatch(initializedSuccess())
    });
}



export default appReducer;

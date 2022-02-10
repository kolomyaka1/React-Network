import { getAuthUser } from './auth-reducer'
import { InferActionTypes } from './redux-store';

const SET_INITIALIZED = 'SET_INITIALIZED';


let initialState = {  // Указываем какие данные нам приходят от сервера
    initialized : false,
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>


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


export const actions = {
    initializedSuccess : () => ({ type : SET_INITIALIZED })
    
}


export const initializeApp = () => (dispatch:any) => {
     let promise = dispatch(getAuthUser());  // Запрос асинхронный
     promise.then(() => {
        dispatch(actions.initializedSuccess())
     });
}



export default appReducer;

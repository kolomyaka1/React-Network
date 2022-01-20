import { getAuthUser } from "./auth-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

let initialState = {  // Указываем какие данные нам приходят от сервера
    initialized : false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED : 
        return {
            ...state,
            initialized: true
        }
        default:
            return state;
    }

}

export const initializedSuccess = () => ({ type : SET_INITIALIZED });

export const initializeApp = () => (dispatch) => {
     let promise = dispatch(getAuthUser());  // Запрос асинхронный
     promise.then(() => {
        dispatch(initializedSuccess())
     });
}



export default appReducer;
import {usersAPI} from '../components/API/api'


const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {  // Указываем какие данные нам приходят от сервера
    userId : null,
    email : null,
    login : null,
    isFetching : false, // Самост. работа
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

export const setAuthUserData = (userId, email, login) => ({type : SET_USER_DATA, data: {userId, email, login}})  // Сoздаем наш AC

export const getAuthUser = () => {
    return (dispatch) => {
        usersAPI.authMe()
        .then(data => {
            if (data.resultCode === 0) {      
                
                let {id,login,email} = data.data;
                dispatch(setAuthUserData(id,email,login));
            }
        });
    }
}


export default authReducer;
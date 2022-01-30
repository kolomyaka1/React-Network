import {
    usersAPI
} from "../components/API/api";
import { UserType } from "../types/types";
import { AppStateType } from "./redux-store";
import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TO_TOTAL_USERS_COUNT = 'SET_TO_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING';




let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowing: false,
    followed: false
};

export type InitialStateType = typeof initialState  // Указываем тип для нашего стейта в u-r


type ActionsType =  followSuccessType | unfollowSuccessType | setUsersType | setCurrentPageType |   // Указываем какие action может принимать наш reducer
                    setToTotalUsersCountType | toggleIsFetchingType | toggleIsFollowingType

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {  // Возвращаем новый массив и у пользователя на которого нажали меняем св-ва followed
                        return {
                            ...u,
                            followed: true
                        }
                    }
                    return u;
                }),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {  // Возвращаем новый массив и у пользователя на которого нажали меняем св-ва followed
                        return {
                            ...u,
                            followed: false
                        }
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {
                ...state, users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TO_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING:
            return {
                ...state, isFollowing: action.isFetching
            }
        default:
            return state;
    }

}

// ===========================================  ACTIONS  =================================================
// Способ типизирования Action
// 1. Создаем новый тип для каждого action
// 2. Указываем его type и значение которое принимает action
// 3. Привязываем наш созданный тип к action

type followSuccessType = {
    type: typeof FOLLOW
    userID: number
}
export const followSuccess = (userID: number): followSuccessType => ({
    type: FOLLOW,
    userID
})


type unfollowSuccessType = {
    type: typeof UNFOLLOW
    userID: number
}
export const unfollowSuccess = (userID: number): unfollowSuccessType => ({
    type: UNFOLLOW,
    userID
})


type setUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): setUsersType => ({
    type: SET_USERS,
    users
})


type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})


type setToTotalUsersCountType = {
    type: typeof SET_TO_TOTAL_USERS_COUNT
    totalCount: number
}
export const setToTotalUsersCount = (totalCount: number): setToTotalUsersCountType => ({
    type: SET_TO_TOTAL_USERS_COUNT,
    totalCount
})


type toggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({  // Переменная, которая вкл/выкл Loader
    type: TOGGLE_IS_FETCHING,
    isFetching
})


type toggleIsFollowingType = {
    type: typeof TOGGLE_IS_FOLLOWING
    isFetching: boolean
}
export const toggleIsFollowing = (isFetching: boolean): toggleIsFollowingType => ({
    type: TOGGLE_IS_FOLLOWING,
    isFetching
})


// ===========================================  THUNKS ================================= 
// Способ типизирования THUNKS 
// 1. Указываем в диспатч Dispatch< actions >
// 2. Указываем второй параметр у thusnkCreat => getState() : => Который возвращает наш state

// Либо указываем ThunkAction(Специально созданный тип уже самими разраб.)
// 1. Первый параметр указывает, что мы возвращаем
// 2. Указываем наш корневой state - AppStateType
// 3. Extra Arguments - пока не знаю что это.... но надо узнать!
// 4. Указываем наши actions

type GetStateType = () => AppStateType  // Создаем отдельный тип для thunks
type DispatchType = Dispatch<ActionsType>
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunksType => async (dispatch, getState) => {  // getState - возвращает state целиком
    dispatch(toggleIsFetching(true))  // Включаем Loader
    dispatch(setCurrentPage(currentPage));  // Функция для переключения страницы 
    let promise = await usersAPI.getUsers(currentPage, pageSize); // Создаем функцию thunk и убираем ее из UI и передаем в BLL
    // Прячем наш запрос в отдельный файл, для того чтобы наша компонента не выполняла запросы на сервер
    dispatch(toggleIsFetching(false));  // После получения запроса от сервера отключаем Loader
    dispatch(setUsers(promise.items)); // Загружаем пользователей
    dispatch(setToTotalUsersCount(promise.totalCount)); // Устанавливаем общ. кол-во пользователей
};



export const follow = (id: number): ThunksType =>
    async (dispatch, getState) => {
    let promise = await usersAPI.followUser(id)
    if (promise.resultCode === 0) {
        dispatch(followSuccess(id));  // Передаем информацию о подписке на пользователя
    }
};

export const unfollow = (id: number): ThunksType =>
    async (dispatch) => {
    let promise = await usersAPI.unfollowUser(id)
    if (promise.resultCode === 0) {
        dispatch(unfollowSuccess(id));  // Передаем информацию об отписке от пользователя
    }
};



export default usersReducer;
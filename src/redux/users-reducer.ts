import {
    usersAPI
} from "../components/API/api";
import { UserType } from "../types/types";

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
    followed : false
};

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
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


export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true))  // Включаем Loader
    let promise = await usersAPI.getUsers(currentPage, pageSize); // Создаем функцию thunk и убираем ее из UI и передаем в BLL
    // Прячем наш запрос в отдельный файл, для того чтобы наша компонента не выполняла запросы на сервер
    dispatch(toggleIsFetching(false));  // После получения запроса от сервера отключаем Loader
    dispatch(setUsers(promise.items)); // Загружаем пользователей
    dispatch(setToTotalUsersCount(promise.totalCount)); // Устанавливаем общ. кол-во пользователей
    dispatch(setCurrentPage(currentPage));  // Функция для переключения страницы 
};



export const follow = (id: number) => async (dispatch: any) => {
    let promise = await usersAPI.followUser(id)
    if (promise.resultCode === 0) {
        dispatch(followSuccess(id));  // Передаем информацию о подписке на пользователя
    }
};

export const unfollow = (id: number) => async (dispatch: any) => {
    let promise = await usersAPI.unfollowUser(id)
    if (promise.resultCode === 0) {
        dispatch(unfollowSuccess(id));  // Передаем информацию об отписке от пользователя
    }
};



export default usersReducer;
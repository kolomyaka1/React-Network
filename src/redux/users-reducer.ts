import { usersAPI } from "../components/API/users-api";
import { UserType } from "../types/types";
import { BaseThunkType, InferActionTypes } from "./redux-store";

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

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ThunkType = BaseThunkType<ActionsTypes>
type ActionsTypes = InferActionTypes<typeof actions>

export const actions = {
    followSuccess : (userID: number) => ({type: FOLLOW, userID} as const),
    unfollowSuccess : (userID: number) => ({ type: UNFOLLOW, userID } as const),
    setUsers : (users: Array<UserType>) => ({ type: SET_USERS, users } as const),
    setCurrentPage : (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
    setToTotalUsersCount : (totalCount: number) => ({ type: SET_TO_TOTAL_USERS_COUNT, totalCount } as const),
    toggleIsFetching : (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching } as const), // Переменная, которая вкл/выкл Loader
    toggleIsFollowing : (isFetching: boolean) => ({ type: TOGGLE_IS_FOLLOWING, isFetching } as const)
}


export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))  // Включаем Loader
    let promise = await usersAPI.getUsers(currentPage, pageSize); // Создаем функцию thunk и убираем ее из UI и передаем в BLL
    // Прячем наш запрос в отдельный файл, для того чтобы наша компонента не выполняла запросы на сервер
    dispatch(actions.toggleIsFetching(false));  // После получения запроса от сервера отключаем Loader
    dispatch(actions.setUsers(promise.items)); // Загружаем пользователей
    dispatch(actions.setToTotalUsersCount(promise.totalCount)); // Устанавливаем общ. кол-во пользователей
    dispatch(actions.setCurrentPage(currentPage));  // Функция для переключения страницы 
};



export const follow = (id: number):ThunkType => async (dispatch) => {  // Thunk для подписки на пользователя
    let promise = await usersAPI.followUser(id)
    if (promise.resultCode === 0) {
        dispatch(actions.followSuccess(id));  // Передаем информацию о подписке на пользователя
    }
};

export const unfollow = (id: number): ThunkType => async (dispatch) => {  // Thunk Для отписки от пользователя
    let promise = await usersAPI.unfollowUser(id)
    if (promise.resultCode === 0) {
        dispatch(actions.unfollowSuccess(id));  // Передаем информацию об отписке от пользователя
    }
};



export default usersReducer;
import {
    usersAPI
} from "../components/API/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TO_TOTAL_USERS_COUNT = 'SET_TO_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowing: false,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
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
                        if (u.id === action.userID) {
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

export const followSuccess = (userID) => ({
    type: FOLLOW,
    userID
})
export const unfollowSuccess = (userID) => ({
    type: UNFOLLOW,
    userID
})
export const setUsers = (users) => ({
    type: SET_USERS,
    users
})
export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
})
export const setToTotalUsersCount = (totalCount) => ({
    type: SET_TO_TOTAL_USERS_COUNT,
    totalCount
})
export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})
export const toggleIsFollowing = (isFetching) => ({
    type: TOGGLE_IS_FOLLOWING,
    isFetching
})

export const getUsersThunkCreator = (currentPage, pageSize) => {

    return (dispatch) => { // Создаем функцию thunk и убираем ее из UI и передаем в BLL
        dispatch(toggleIsFetching(true));

        usersAPI.getUsers(currentPage, pageSize).then(data => { // Прячем наш запрос в отдельный файл, для того чтобы наша компонента не выполняла запросы на сервер
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setToTotalUsersCount(data.totalCount));
            dispatch(setCurrentPage(currentPage));
        });
    }
}

export const follow = (id) => {
    return (dispatch) => {
        usersAPI.followUser(id)
        .then(data => {                              
            if(data.resultCode === 0) {
                dispatch(followSuccess(id));
            }
        });
    }
}

export const unfollow = (id) => {
    return (dispatch) => {
        usersAPI.unfollowUser(id)
        .then(data => {
            debugger;
            if(data.resultCode === 0) {
                dispatch(unfollow(id));
            }
        });
    }
}

export default usersReducer;
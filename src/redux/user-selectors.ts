
//  Селектор - функция, которая принимает state и возвращает нам нужные значения из state.
// Проблема состоит в том, что при каждом изменнении state наш mapStateToProps вызывается каждый раз, тем самым становиться сложнее дебажить и происходит множ. калькуляция.

import { AppStateType } from "./redux-store";

// Функция createSelector создает реселектор, она принимает в качесвте зависимостей простые селекты из стейта, при первом вызове ресел. значения заисимостей кешируются внутри реселекта, а при след.
// выозовах дергаются простые селекторы зависимости и их значения сравниваются с кешированными.
// Если изменений по сравнению с кегем нет, то сразу возвращается кешированный результат без запуска селектора.



export const getUsers = (state: AppStateType) => {    
    return state.usersPage.users;
}

export const getUsersSelector = (state: AppStateType) => {    
    return getUsers(state).filter(u => true);
}

export const getPageSize = (state: AppStateType) => {    
    return state.usersPage.pageSize;
}

export const getTotalusersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const getNews = (state: AppStateType) => {
    return state.news.newsData
}


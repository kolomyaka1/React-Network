import { createSelector } from 'reselect'

//  Селектор - функция, которая принимает state и возвращает нам нужные значения из state.
// Проблема состоит в том, что при каждом изменнении state наш mapStateToProps вызывается каждый раз, тем самым становиться сложнее дебажить и происходит множ. калькуляция.

// Функция createSelector создает реселектор, она принимает в качесвте зависимостей простые селекты из стейта, при первом вызове ресел. значения заисимостей кешируются внутри реселекта, а при след.
// выозовах дергаются простые селекторы зависимости и их значения сравниваются с кешированными.
// Если изменений по сравнению с кегем нет, то сразу возвращается кешированный результат без запуска селектора.



export const getUsers = (state) => {    
    return state.usersPage.users;
}

export const getUsersSelector = (state) => {    
    return getUsers(state).filter(u => true);
}

export const getUsersSuperSelector = createSelector(getUsers, (users) =>  {
    return users.filter(u => true);
})

export const getPageSize = (state) => {    
    return state.usersPage.pageSize;
}

export const getTotalusersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getIsFollowing = (state) => {
    return state.usersPage.isFollowing;
}

export const getIsAuth = (state) => {
    return state.auth.isAuth;
}


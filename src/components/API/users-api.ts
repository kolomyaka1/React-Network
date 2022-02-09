import { GetItemsType, instance, ResultCodesEnum } from "./api";


type FollowType = {
    resultCode : ResultCodesEnum
    messages : Array<string>
}

export const usersAPI = {
    getUsers(currentPage = 5, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);  // Нашим вызовом возвращаем не весь response, а только дата (Данные для UI-компоненты)
    },
    followUser(id:number) {
        return instance.post(`follow/${id}`)
        .then(response =>  response.data)
    },
    unfollowUser(id:number) {
        return instance.delete(`follow/${id}`)
        .then(response => response.data)
    },
    getProfile(id:number) {
        return instance.get(`profile/${id}`)
        .then(response => response.data)
    },
}
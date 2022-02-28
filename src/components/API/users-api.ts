import { GetItemsType, instance, ResponseType } from "./api";


export const usersAPI = {
    getUsers(currentPage = 5, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);  // Нашим вызовом возвращаем не весь response, а только дата (Данные для UI-компоненты)
    },
    followUser(id:number) {
        return instance.post<ResponseType>(`follow/${id}`)
        .then(response =>  response.data)
    },
    unfollowUser(id:number) {
        return instance.delete(`follow/${id}`)
        .then(response => response.data)
    },
}
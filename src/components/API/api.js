import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '8452f3f6-1c5f-4ee4-b81a-97b3e40f7066'
    },
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
})

export const usersAPI = {
    getUsers(currentPage = 5, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);  // Нашим вызовом возвращаем не весь response, а только дата (Данные для UI-компоненты)
    },
    followUser(id) {
        return instance.post(`follow/${id}`)
        .then(response =>  response.data)
    },
    unfollowUser(id) {
        return instance.delete(`follow/${id}`)
        .then(response => response.data)
    },
    getProfile(id) {
        return instance.get(`profile/${id}`)
        .then(response => response.data)
    },
    authMe() {
        return instance.get(`auth/me`)
        .then(response => response.data)
    },
}

export const profileAPI = {
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status : status});
    }
}

export const authAPI = {
    login(email,password,rememberMe = false) {
        return instance.post('auth/login', { email,password,rememberMe });
    },
    logout() {
        return instance.delete('auth/login');
    },
    getCaptcha() {
        return instance.get('security/get-captcha-url');
    }
}

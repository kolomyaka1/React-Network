import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '8452f3f6-1c5f-4ee4-b81a-97b3e40f7066',
    },
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
})



const news = axios.create({
    withCredentials : true,
    headers : {
        'API-KEY' : '1e41534e10f54fc69a549d79c3f15ed2'
    },
})

export enum ResultCodesEnum  {
    Succes = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}



export const usersAPI = {
    getUsers(currentPage = 5, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
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

type UpdateStatusType = {
    resultCode : ResultCodesEnum
    messages : Array<string>
    data : {
        status : string
    }
}

export const profileAPI = {
    getStatus(userId:number) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status:string) {
        return instance.put<UpdateStatusType>(`profile/status`, {status : status});
    },
    updatePhoto(photos:string) {
        const formData = new FormData();
        formData.append('image', photos);
        return instance.put(`profile/photo`, formData , {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        });
    },
}


type LoginResponseType = {
    resultCode : ResultCodesEnum
    messages : Array<string>
    data : {
        userId: number
    }
}

type AuthMeType = {
    data : {
        id : number
        login : string
        email : string
    }
    resultCode : number
    messages : Array<string>
}

type LogoutResponseType = {
    data : {
        id : null
        login : null
        email : null
    }
    resultCode : ResultCodesEnum
    messages : Array<string>
}

type GetCaptchaType = {
    url : string
}

export const authAPI = {
    login(email:string,password:string,captcha: null | string) {
        return instance.post<LoginResponseType>('auth/login', { email,password,captcha })
        .then(response => response.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>('auth/login');
    },
    getCaptcha() {
        return instance.get<GetCaptchaType>('security/get-captcha-url');
    },
    authMe() {
        return instance.get<AuthMeType>(`auth/me`)
    },
}

export const newsAPI = {
    getNews() {
        return axios.get('https://newsapi.org/v2/everything?q=Apple&from=2022-02-09&sortBy=popularity&apiKey=1e41534e10f54fc69a549d79c3f15ed2')
        .then(response => response.data)
    }
}
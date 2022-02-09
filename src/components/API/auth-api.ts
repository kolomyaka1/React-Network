import { instance, ResultCodesEnum } from "./api";


type ResponseType<D = {}> = {
    data : D
    messages : Array<string>
    resultCode : ResultCodesEnum
}

type LoginResponseType = {
        userId: number
}

type AuthMeType = {
        id : number
        login : string
        email : string
}

type LogoutResponseType = {
        id : null
        login : null
        email : null
}

type GetCaptchaType = {
    url : string
}



export const authAPI = {
    login(email:string,password:string,captcha: null | string) {
        return instance.post<ResponseType<LoginResponseType>>('auth/login', { email,password,captcha })
        .then(response => response.data)
    },
    logout() {
        return instance.delete<ResponseType<LogoutResponseType>>('auth/login');
    },
    getCaptcha() {
        return instance.get<GetCaptchaType>('security/get-captcha-url');
    },
    authMe() {
        return instance.get<ResponseType<AuthMeType>>(`auth/me`)
    },
}

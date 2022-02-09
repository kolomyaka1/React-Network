import axios, { AxiosResponse } from 'axios';
import { UserType } from '../../types/types';

export const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '8452f3f6-1c5f-4ee4-b81a-97b3e40f7066',
    },
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
})



export type GetItemsType = {
    items : Array<UserType>
    totalCount : number
    error : string | null
}

export enum ResultCodesEnum  {
    Succes = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}









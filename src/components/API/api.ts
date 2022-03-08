import axios from 'axios';
import { NewsItemType, UserType } from '../../types/types';

export const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '512f1d64-bb01-4102-8cd6-f2f8782ca6d1',
    },
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
})

export const newsItems = axios.create({
    headers : {
        'API-KEY' : '1e41534e10f54fc69a549d79c3f15ed2', 
    },
    
})


export type GetItemsType = {
    items : Array<UserType>
    totalCount : number
    error : string | null
}

export type getNewsType = {
    status : string
    totalResults : number
    articles : Array<NewsItemType>
}

export enum ResultCodesEnum  {
    Succes = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}

export type ResponseType<D = {}> = {
    data : D
    messages : Array<string>
    resultCode : ResultCodesEnum
}









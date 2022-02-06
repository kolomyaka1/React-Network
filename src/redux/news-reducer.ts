import { newsAPI } from "../components/API/api";
import { NewsType } from "../types/types";


const GET_NEWS = 'GET-NEWS';


let initialState = {
    newsData: [] as Array<NewsType>,
}

export type InitialStateType = typeof initialState

const newsReducer = (state = initialState, action:any):InitialStateType => {
    debugger
    switch (action.type) {
        case GET_NEWS : {
            return {
                ...state,
                newsData : action.newsData
            }
        }
        default : 
        return state;
    }
}

type getNewsSuccessType = {
    type : typeof GET_NEWS
    newsData : Array<NewsType>
}

export const getNewsSuccess = (newsData : Array<NewsType>): getNewsSuccessType => ({
    type : GET_NEWS,
    newsData
})

export const getNews = () => async (dispatch: any) => {
    let promise = await newsAPI.getNews();
    debugger
    dispatch(getNewsSuccess);
    console.log(promise);
    
}



export default newsReducer;
import { newsAPI } from "../components/API/news-api";
import { NewsItemType } from "../types/types";



const GET_NEWS = 'GET-NEWS';
const CHANGE_PAGE = 'CHANGE_PAGE';

let initialState = {
    newsData: [] as Array<NewsItemType>,
    totalResults : 0,
    currentPage : 1
}

export type InitialStateType = typeof initialState

const newsReducer = (state = initialState, action:any):InitialStateType => {
    
    switch (action.type) {
        case GET_NEWS : {
            return {
                ...state,
                newsData : action.newsData,
                totalResults : action.totalResults
            }
        }
        default : 
        return state;
        case CHANGE_PAGE : {
            return {
                ...state,
                currentPage : action.currentPage
            }
        }
    }
}



export const getNewsSuccess = (newsData : Array<NewsItemType>, totalResults: number) => ({
    type : GET_NEWS,
    newsData,
    totalResults
})

export const changePage = (currentPage: number) => ({ type : CHANGE_PAGE, currentPage})

export const getNews = (currentPage: number) => async (dispatch: any) => {
    let promise = await newsAPI.getNews(currentPage);
    dispatch(getNewsSuccess(promise.articles, promise.totalResults));
}



export default newsReducer;
import { newsAPI } from "../components/API/news-api";
import { NewsItemType } from "../types/types";



const GET_NEWS = 'GET-NEWS';


let initialState = {
    newsData: [] as Array<NewsItemType>,
}

export type InitialStateType = typeof initialState

const newsReducer = (state = initialState, action:any):InitialStateType => {
    
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



export const getNewsSuccess = (newsData : Array<NewsItemType>) => ({
    type : GET_NEWS,
    newsData
})

export const getNews = () => async (dispatch: any) => {
    let promise = await newsAPI.getNews();
    console.log(promise);
    
    dispatch(getNewsSuccess(promise.articles));
    
    
}



export default newsReducer;
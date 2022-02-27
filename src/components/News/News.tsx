// import s from './News.module.css';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../redux/news-reducer";
import { AppStateType } from "../../redux/redux-store";

let News = (props: any) => {

    const dispatch = useDispatch();

    
    const newsData = useSelector((state:AppStateType) => state.news.newsData);

    
    useEffect(() => {
        dispatch(getNews());
    }, [])


    return (
        <div>
            <div className="news__block">
                {
                    newsData && newsData.map((item, index) => {
                        console.log(item);
                        
                        
                    })
                }
            </div>
        </div>
    )
}

export default News;
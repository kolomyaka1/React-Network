// import s from './News.module.css';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../redux/news-reducer";
import { AppStateType } from "../../redux/redux-store";
import NewsItem from "./NewsItem";

let News = (props: any) => {

    const dispatch = useDispatch();

    
    const newsData1 = useSelector((state:AppStateType) => state.news.newsData);
    const newsData = newsData1;
    
    useEffect(() => {
        dispatch(getNews());
    }, [])

    console.log(newsData);
    
    return (
        <div>
            <div className="news__block">
                {
                    newsData && newsData.map((item:any, index) => {
                        return <NewsItem 
                        author={item.author}
                        content={item.content}
                        description={item.description}
                        publishedAt={item.publishedAt}
                        title={item.title}
                        url={item.url}
                        urlToImage={item.urlToImage}
                        source={item.source}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default News;
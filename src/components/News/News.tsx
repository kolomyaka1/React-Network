// import s from './News.module.css';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, getNews } from "../../redux/news-reducer";
import { AppStateType } from "../../redux/redux-store";
import NewsItem from "./NewsItem";

let News = (props: any) => {

    const dispatch = useDispatch();

    
    const newsData1 = useSelector((state:AppStateType) => state.news.newsData);
    const totalResults = useSelector((state: AppStateType) => state.news.totalResults);
    
    let itemsCount = 10;
    let pagesCount = Math.ceil(totalResults / itemsCount);
    
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        if (pages.length < 10) {
            pages.push(i);
        }
    }
    
    const onPageChanged = (p:number) => {
        dispatch(changePage(p))
    }
    const pageNumber = 1;
    const newsData = newsData1;
    
    useEffect(() => {
        dispatch(getNews(1));
    }, [])

    return (
        <div>
            <div className="news__block">
            <div>
                {pages.map(p => {
                    // @ts-ignore
                    return <span className={props.currentPage === p && s.selectedPage} onClick={(e) => { onPageChanged(p) }}>{p}</span>
                })}
            </div>
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
                        totalResults={totalResults}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default News;
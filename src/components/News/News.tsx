import s from './News.module.scss';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCountry, changePage, getNews } from "../../redux/news-reducer";
import { AppStateType } from "../../redux/redux-store";
import NewsItem from "./NewsItem";

let News = (props: any) => {

    const dispatch = useDispatch();

    const newsData = useSelector((state:AppStateType) => state.news.newsData);
    const totalResults = useSelector((state: AppStateType) => state.news.totalResults);
    const currentPage = useSelector((state: AppStateType) => state.news.currentPage);
    const currentCountry = useSelector((state: AppStateType) => state.news.currentCountry)

    let itemsCount = 5;
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
    
    useEffect(() => {
        dispatch(getNews(currentPage,currentCountry));
    }, [currentPage,currentCountry])

    const handleChange = (e:any) => {
        dispatch(changeCountry(e.target.value)) 
    }

    return (
        <div>
            <div className={s.news__block}>
                <div className={s.news__block_header}>
                    <div className='pagination'>
                        {pages.map(p => {
                            // @ts-ignore
                            return <button className={currentPage === p && 'pagination__active'} onClick={(e) => { onPageChanged(p) }}>{p}</button>
                        })}
                    </div>
                    <div className={s.news__block_country}>

                    <select value={currentCountry} onChange={handleChange}>  
                        <option value="ru">Россия</option>  
                        <option value="ua">Украина</option>  
                        <option value="us">США</option>
                    </select>

                    </div>
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
                        key={item.url}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default News;
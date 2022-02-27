import React from "react";
import { Navigate } from "react-router";
import s from './NewsItem.module.scss'

type PropsType = {
    author : string | null
    content : string
    description : string
    publishedAt : string
    title : string
    url : string
    urlToImage : string
    source : any

}

const NewsItem: React.FC<PropsType> = (props) => {

    console.log(props);
    console.log(props.url);
    
    
    let data = props.publishedAt.slice(0,10);
    
    return (
        <div className={s.news__item_wrapper}>
            <div className={s.news__item_block}>
                <div className={s.news__item_title}>
                    <h5>{props.title}</h5>
                </div>
                <div className={s.news__item_content}>
                    <div className={s.news__item_img}>
                        <img src={props.urlToImage} alt="" />
                    </div>
                    <div className={s.news__item_text}>
                        <div className={s.news__item_description}>
                            <span>{props.description}</span>
                        </div>
                        
                        <div className={s.news__item_footer}>
                            <span>{props.source.name}</span>
                            <span>{data}</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default NewsItem;
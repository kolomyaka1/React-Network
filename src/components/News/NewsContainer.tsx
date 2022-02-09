import React from "react";
import { connect } from "react-redux";
import { getNews } from "../../redux/news-reducer";
import { AppStateType } from "../../redux/redux-store";
import { NewsType } from "../../types/types";
import News from "./News";


type MapStateToPropsType = {
    newsData : Array<NewsType>
}


type MapDispatchToPropsType = {
    getNews : () => void
} 

type sourceType = MapDispatchToPropsType & MapStateToPropsType

class NewsContainer extends React.Component<sourceType>  {
    
    componentDidMount() {
        this.props.getNews()       
    }
    
    render() {
        return (
            <div>
                <News />
            </div>
        )
    }
}

let mapStateToProps = (state:AppStateType): MapStateToPropsType => {
    return {
        newsData : state.news.newsData,
    } 
}

let MapDispatchToProps = (dispatch:any): MapDispatchToPropsType => {
    return {
        getNews : () => {
            dispatch(getNews())
        },
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(mapStateToProps, MapDispatchToProps)(NewsContainer);
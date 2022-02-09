import { AppStateType } from "../../redux/redux-store"
import { connect } from "react-redux";
import News from "./News";

type PostsDataType = {
    id : number
    message : string
    author : string
}

type MapStateToPropsType = {
    newsPosts : Array<PostsDataType>
}

type MapDispatchToPropsType = {

}

let mapStateToProps = (state: AppStateType) => {
    return {
        newsPosts : state.news.postsData,
    }
}


let mapDispatchToProps = (state: AppStateType) => {
    return {

    }
}

const NewsContainer = connect(mapStateToProps, mapDispatchToProps)(News)

export default NewsContainer
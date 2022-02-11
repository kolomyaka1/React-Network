import MyPosts from "./MyPosts";
import { actions } from '../../../redux/profile-reducer'
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";


let mapStateToProps = (state: AppStateType) => {
    return {
        newPostText : state.profilePage.newPostText,
        profile : state.profilePage.profile,
        login : state.auth.login
    }
}

let mapDispatchToProps = (dispatch:any) => {
    return {
        updateNewPostText : (text:string) => {
            dispatch(actions.updateNewPostTextActionCreator(text))
        },
        addPost : () => {
            dispatch(actions.addPostActionCreator())
        },
        likePost : (id:number) => {
            dispatch(actions.likePost(id))
        },
        dislikePost : (id:number) => {
            dispatch(actions.dislikePost(id))
        },
        deletePost : (id:number) => {
            dispatch(actions.deletePost(id))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
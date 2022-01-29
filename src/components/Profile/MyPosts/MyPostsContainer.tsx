import MyPosts from "./MyPosts";
import {addPostActionCreator, deletePost, updateNewPostTextActionCreator, likePost,dislikePost} from '../../../redux/profile-reducer'
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { PostType, ProfileType } from "../../../types/types";

type MapStateToPropsType = {
    posts : Array<PostType>
    newPostText : string
    login : string | null
    profile : ProfileType | null
}

type MapDispatchToPropsType = {
    updateNewPostText : (text:string) => void
    addPost : () => void
    deletePost : (id:number) => void
    likePost : (id:number) => void
    dislikePost : (id:number) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts : state.profilePage.postsData,
        newPostText : state.profilePage.newPostText,
        login : state.auth.login,
        profile : state.profilePage.profile,
    }
}

let mapDispatchToProps = (dispatch:any): MapDispatchToPropsType => {
    return {
        updateNewPostText : (text:string) => {
            dispatch(updateNewPostTextActionCreator(text))
        },
        addPost : () => {
            dispatch(addPostActionCreator())
        },
        deletePost : (id:number) => {
            dispatch(deletePost(id))
        },
        likePost : (id:number) => {
            dispatch(likePost(id))
        },
        dislikePost : (id:number) => {
            dispatch(dislikePost(id))
        }
    }
}

const MyPostsContainer = connect<MapStateToPropsType,MapDispatchToPropsType,null,AppStateType>(mapStateToProps,mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
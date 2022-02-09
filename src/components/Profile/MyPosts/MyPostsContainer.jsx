import MyPosts from "./MyPosts";
import {addPostActionCreator, updateNewPostTextActionCreator, likePost, dislikePost, deletePost} from '../../../redux/profile-reducer'
import { connect } from "react-redux";


let mapStateToProps = (state) => {
    return {
        posts : state.profilePage.postsData,
        newPostText : state.profilePage.newPostText,
        profile : state.profilePage.profile
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText : (text) => {
            dispatch(updateNewPostTextActionCreator(text))
        },
        addPost : () => {
            dispatch(addPostActionCreator())
        },
        likePost : (id) => {
            dispatch(likePost(id))
        },
        dislikePost : (id) => {
            dispatch(dislikePost(id))
        },
        deletePost : (id) => {
            dispatch(deletePost(id))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
import MyPosts from "./MyPosts";
import {addPostActionCreator, deletePost, updateNewPostTextActionCreator} from '../../../redux/profile-reducer'
import { connect } from "react-redux";


let mapStateToProps = (state) => {
    
    return {
        posts : state.profilePage.postsData,
        newPostText : state.profilePage.newPostText,
        login : state.auth.login,
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
        deletePost : (id) => {
            dispatch(deletePost(id))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
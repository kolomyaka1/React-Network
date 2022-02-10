import MyPosts from "./MyPosts";
import { actions } from '../../../redux/profile-reducer'
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
            dispatch(actions.updateNewPostTextActionCreator(text))
        },
        addPost : () => {
            dispatch(actions.addPostActionCreator())
        },
        likePost : (id) => {
            dispatch(actions.likePost(id))
        },
        dislikePost : (id) => {
            dispatch(actions.dislikePost(id))
        },
        deletePost : (id) => {
            dispatch(actions.deletePost(id))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
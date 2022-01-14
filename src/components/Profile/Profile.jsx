import MyPostsContainer from './MyPosts/MyPostsContainer';

import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer';

let Profile = (props) => {
    return (
        <div>
            <ProfileInfoContainer profile={props.profile} updateUserStatus={props.updateUserStatus} status={props.status} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;
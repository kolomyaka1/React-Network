import MyPostsContainer from './MyPosts/MyPostsContainer';

import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer';

let Profile = (props) => {
    return (
        <div>
            <ProfileInfoContainer />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;
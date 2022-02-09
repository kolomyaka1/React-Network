import { FC } from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';

import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer';

type PropsType = {
    status : string
}

let Profile: FC<PropsType> = (props) => {
    
    return (
        <div>
            <ProfileInfoContainer status={props.status}  />
            {/* @ts-ignore */}
            <MyPostsContainer />
        </div>
    )
}

export default Profile;
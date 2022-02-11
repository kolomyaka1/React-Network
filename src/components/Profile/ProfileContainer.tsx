import Profile from './Profile';
import React from 'react';
import { connect } from 'react-redux';
import { getProfile, getUserStatus, updateUserStatus } from '../../redux/profile-reducer';
import { useMatch } from 'react-router-dom';
import { AuthRedirect } from '../../HOC/AuthRedirect';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

type OwnPropsTypeForComponent = {
    profile : ProfileType | null
    status : string | null
    match : any
    getProfile : (userId : number) => void
    getUserStatus : (userId : number) => void
    updateUserStatus : (status : string) => void
}


class ProfileContainer extends React.Component<OwnPropsTypeForComponent, AppStateType> {
    
    componentDidMount() {   
        
        let userId = this.props.match ? this.props.match.params.userId : '21430';
        this.props.getProfile(userId);
        this.props.getUserStatus(userId)
    }

    render() {
        return (
            <Profile />
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile : state.profilePage.profile,
    status : state.profilePage.status,
})

type OwnPropsType = {
    profile : ProfileType | null
    status : string | null
    getProfile : (userId : number) => void
    getUserStatus : (userId : number) => void
    updateUserStatus : (status : string) => void
    
}

const ProfileURLMatch = (props: OwnPropsType) => {
    
    const match = useMatch('/Profile/:userId/');
    
    return <AuthRedirectComponent {...props} match={match} />
}

let AuthRedirectComponent = AuthRedirect(ProfileContainer);

export default connect(mapStateToProps, { getProfile, getUserStatus, updateUserStatus })(ProfileURLMatch);
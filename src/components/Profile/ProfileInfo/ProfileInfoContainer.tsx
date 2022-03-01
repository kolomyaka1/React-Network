import { AuthRedirect } from '../../../HOC/AuthRedirect';
import ProfileInfo from './ProfileInfo';
import { connect } from 'react-redux';
import React from 'react';
import { getProfile, getUserStatus, updateUserStatus } from '../../../redux/profile-reducer'
import { AppStateType } from '../../../redux/redux-store';
import { ProfileType } from '../../../types/types';


type OwnPropsType = {
    match : any
    profile : ProfileType | null
    status : string
    userId : number
    getProfile : (userId: number) => void
    getUserStatus : (userId: number) => void
    updateUserStatus : (status : string) => void
}


class ProfileInfoContainer extends React.Component<OwnPropsType, AppStateType> {

    componentDidMount() {
        
        // let userId = this.props.match ? this.props.match.params.userId : '21430';
        if (this.props.userId) {
            this.props.getProfile(this.props.userId);
            this.props.getUserStatus(this.props.userId);
        } 

    }

    render() {
        return (
            <ProfileInfo profile={this.props.profile}  
            status={this.props.status}
            updateUserStatus={this.props.updateUserStatus}
            />
        )
    }
}


let AuthRedirectComponent = AuthRedirect(ProfileInfoContainer);

let mapStateToProps = (state: AppStateType) => ({
    profile : state.profilePage.profile,
    status : state.profilePage.status,
    isAuth : state.auth.isAuth,
    userId : state.auth.userId
})


export default connect(mapStateToProps, { getProfile, getUserStatus, updateUserStatus })(AuthRedirectComponent);
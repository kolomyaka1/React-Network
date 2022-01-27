import Profile from './Profile';
import React from 'react';
import { connect } from 'react-redux';
import { getProfile, getUserStatus, updateUserStatus } from './../../redux/profile-reducer';
import { useMatch } from 'react-router-dom';
import { AuthRedirect } from '../../HOC/AuthReducer';


class ProfileContainer extends React.Component {
    
    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : this.props.userId;
        this.props.getProfile(userId);
        this.props.getUserStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} 
            updateUserStatus={this.props.updateUserStatus} getProfile={this.props.getProfile}
            status={this.props.status}
            />
        )
    }
}

let mapStateToProps = (state) => ({
    profile : state.profilePage.profile,
    status : state.profilePage.status,
    userId : state.auth.userId
})



const ProfileURLMatch = (props) => {
    const match = useMatch('/Profile/:userId/');
    return <AuthRedirectComponent {...props} match={match} />
}

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
});

let AuthRedirectComponent = AuthRedirect(ProfileContainer);

AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent)


// let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getProfile, getUserStatus, updateUserStatus })(ProfileURLMatch);
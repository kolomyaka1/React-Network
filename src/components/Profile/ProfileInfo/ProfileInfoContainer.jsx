import { AuthRedirect } from '../../../HOC/AuthReducer';
import ProfileInfo from './ProfileInfo';
import { connect } from 'react-redux';
import React from 'react';
import { getProfile, getUserStatus, updateUserStatus } from '../../../redux/profile-reducer'


class ProfileInfoContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : '21430';
        this.props.getProfile(userId);
        this.props.getUserStatus(userId);

    }

    render() {
        
        return (
            <ProfileInfo {...this.props} profile={this.props.profile}  status={this.props.status} />
        )
    }
}


let AuthRedirectComponent = AuthRedirect(ProfileInfoContainer);

let mapStateToProps = (state) => ({
    profile : state.profilePage.profile,
    status : state.profilePage.status,
    isAuth : state.auth.isAuth,
    
})


// let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getProfile, getUserStatus, updateUserStatus })(AuthRedirectComponent);
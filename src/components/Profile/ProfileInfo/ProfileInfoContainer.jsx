import { AuthRedirect } from '../../../HOC/AuthReducer';
import ProfileInfo from './ProfileInfo';
import { connect } from 'react-redux';
import React from 'react';
import { getProfile, getUserStatus } from '../../../redux/profile-reducer'


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
    isAuth : state.auth.isAuth,
    status : state.profilePage.status,
})


// let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getProfile, getUserStatus })(AuthRedirectComponent);
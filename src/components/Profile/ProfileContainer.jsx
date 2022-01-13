import Profile from './Profile';
import React from 'react';
import { connect } from 'react-redux';
import { getProfile } from './../../redux/profile-reducer';
import { useMatch } from 'react-router-dom';
import { Navigate } from 'react-router';
import { AuthRedirect } from '../../HOC/AuthReducer';

class ProfileContainer extends React.Component {

    componentDidMount() {
        
        let userId = this.props.match ? this.props.match.params.userId : '21430';
        this.props.getProfile(userId);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} />
        )
    }
}

const ProfileURLMatch = (props) => {
    const match = useMatch('/Profile/:userId/');
    return <AuthRedirectComponent {...props} match={match} />
}

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
});

let AuthRedirectComponent = AuthRedirect(ProfileContainer);

let AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent)

let mapStateToProps = (state) => ({
    profile : state.profilePage.profile
})


// let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getProfile })(ProfileURLMatch);
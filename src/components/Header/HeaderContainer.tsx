import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store'

type MapStateToProps = {
    isAuth : boolean
    login : string | null
}

type MapDispatchPropsType = {
    logout : () => void
}
type sourceType = MapDispatchPropsType & MapStateToProps

class HeaderContainer extends React.Component<sourceType> {
    render() {
        return <Header isAuth={this.props.isAuth}
        login={this.props.login}
        logout={this.props.logout}
        />
    }
}

const mapStateToProps = (state:AppStateType): MapStateToProps => ({
    isAuth : state.auth.isAuth,
    login : state.auth.login,
});


export default connect<MapStateToProps, MapDispatchPropsType, null, AppStateType>(mapStateToProps, { logout })(HeaderContainer);


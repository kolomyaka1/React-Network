import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { getAuthUser, logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';


export type PropsTypeForHeader = {
    isAuth : boolean | null
    login : string | null
}

export type DispatchPropsTypeForHeader = {
    getAuthUser : () => void
    logout : () => void
}

class HeaderContainer extends React.Component<PropsTypeForHeader & DispatchPropsTypeForHeader> {

    componentDidMount() {
        this.props.getAuthUser();
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth : state.auth.isAuth,
    login : state.auth.login,
} as PropsTypeForHeader)

// @ts-ignore
export default connect(mapStateToProps, { getAuthUser, logout })(HeaderContainer);


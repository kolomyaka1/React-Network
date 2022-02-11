import React from "react"
import { Navigate } from 'react-router'
import { connect } from 'react-redux'

let mapStateToProps = (state) => ({
    isAuth : state.auth.isAuth
})

export const AuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render () {
            if (!this.props.isAuth) return <Navigate replace to='/Login' />
            
            return <Component {...this.props} />
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectedAuthRedirectComponent;
}
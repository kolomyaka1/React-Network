import React from "react"


export const AuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render () {
            if (!this.props.isAuth) return <RedirectComponent to='/Login ' />
            return <Component {...this.props} />
        }
    }
    return RedirectComponent;
}
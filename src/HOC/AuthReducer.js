import React from "react"


export const AuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render () {
            
            return <Component {...this.props} />
        }
    }
    return RedirectComponent;
}
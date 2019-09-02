import React from 'react'
import {Route, Redirect} from 'react-router-dom'

import authenticationService from '../utils/authenticationService'

class AuthenticatedRoute extends React.Component {
    render() {
        if(authenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to = '/login' />
        }
    }
}

export default AuthenticatedRoute
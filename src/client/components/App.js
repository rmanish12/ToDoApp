import React from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Header from './Header'
// import Footer from './Footer'
import AuthenticatedRoute from './AuthenticatedRoute'

import ToDo from './Todo'
import Login from './Login'
import Main from './Main'
import Logout from './Logout'

const App = () => {
    return (
        <BrowserRouter>
            <Header />

            <Switch>
                <Route path = '/' exact component = {Main}/>
                <Route path = '/login' exact component = {Login}/>
                <AuthenticatedRoute path = '/todo' exact component = {ToDo}/>
                <AuthenticatedRoute path = '/logout' exact component = {Logout} />
            </Switch>

            {/* <Footer /> */}
        </BrowserRouter>
    )
}

export default App
import React, {Component} from 'react'
import {withRouter} from 'react-router'

import { Link } from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'

import authenticationService from '../utils/authenticationService'

import '../styles/Header.css'

class Header extends Component {

    render() {

        const isUserLoggedIn = authenticationService.isUserLoggedIn()
        
        return(
            <div>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Link to='/' className='brand'>ToDo App</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
    
                        </Nav>
                        <Nav>
                            {!isUserLoggedIn && <Link to='/login' className='link'>Login</Link>}
                            {/* <Link to='/register' className='link'>Register</Link> */}
                            {isUserLoggedIn && <Link to='/logout' className='link' onClick = {authenticationService.logout}>Logout</Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default withRouter(Header)
import React, {Component} from 'react'

import autobind from 'react-autobind'
import axios from 'axios'
import {Container, Col, Row, Card, Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import authenticationService from '../utils/authenticationService'

import '../styles/Login.css'

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            enabled: false,
            emailId: '',
            password: '',
            error: false
        }

        autobind(this)
    }

    isNotEmpty() {
        const {emailId, password} = this.state

        if(emailId.length>0 && password.length>0) {
            this.setState({
                enabled: true
            })
        } else {
            this.setState({
                enabled: false
            })
        }
    }

    onemailIdChange(event) {
         this.setState({
            emailId: event.target.value
        }, () => this.isNotEmpty())   
    }

    onPasswordChange (event) {
        this.setState({
            password: event.target.value
        }, () => this.isNotEmpty())
    }

    //common event handler
    // onValueChange(event) {
    //     this.setState({[event.target.name]: event.target.value})
    // }

    onSubmit(event){
        event.preventDefault()

        const {emailId, password} = this.state

        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        
        axios.post('http://localhost:8000/user/login', {emailId, password}, headers)
            .then(response => {
                authenticationService.authenticateUser(response.data.emailId)
                this.props.history.push('/todo')
            })
            .catch(err => this.setState({error: true}))

        authenticationService.authenticateUser(emailId)

    }

    render() {
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col md = {6} xs={12} lg = {4}>
                        <div className='center'>
                            <div className='verticalCenter'>
                                <h4>Account Login</h4>
                                <hr/>
                                <Form>
                                    <Form.Group controlId="formBasicemailId">
                                        <Form.Control type="text" placeholder="Email" 
                                            name = "emailId"
                                            value = {this.state.emailId}
                                            onChange = {this.onemailIdChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Control type="password" placeholder="Password" 
                                            name = "password"
                                            value = {this.state.password}
                                            onChange = {this.onPasswordChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" className='button' type="submit"
                                        disabled={!this.state.enabled}
                                        onClick={this.onSubmit}
                                    >
                                        Sign In
                                    </Button>
                                </Form>
                                
                                <br/>

                                {this.state.error && <ErrorComponent />}

                                <div className='help'>
                                    Forgot Password? <Link to=''>Click Here</Link>
                                    <br/>
                                    Create an account? <Link to='/register'>Click Here</Link>
                                </div>
                            </div>
                        </div>                                   
                    </Col>
                    <Col></Col>
                </Row>
            </Container>                
        )
    }
}

function ErrorComponent() {
        return (
            <div className='invalid' >
                <p>Wrong credentials!!</p>
            </div>
        )
}

export default Login
import React from 'react'
import autobind from 'react-autobind'
import axios from 'axios'

import {Modal, Form, Button, Spinner} from 'react-bootstrap'

import CreateSuccess from './CreateSuccess'
import Success from '../assets/Success.png'

import '../styles/Todo.css'

class NewTodo extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            completionDate: '',
            status: '',
            show: true,
            error: false
        }

        autobind(this)
    }

    onNameChange(event) {
        this.setState({name: event.target.value})
    }

    onDateChange(event) {
        this.setState({completionDate: event.target.value})
    }

    onStatusChange(event) {
        this.setState({status: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault()

        console.log(this.state)

        this.setState({show: false})

        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }

        const {name, completionDate, status} = this.state

        axios.post('http://localhost:8000/todo/create', {name, completionDate, status}, headers)
            .then(response => { 
                console.log(response)

                //stopping spinner
                this.setState({show: true})
                this.props.onSuccess()
            })
            .catch(err => { 
                console.log(err)

                //stopping spinner and displaying error message
                this.setState({error: true, show: true})
            })
    }

    onHide() {
        this.props.onHide()
    }

    render() {
        return (
            <>
            <Modal
                show = {this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                close = "true"
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New Todo
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" 
                                name = "name"
                                value = {this.state.name}
                                onChange = {this.onNameChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicDate">
                            <Form.Label>Target Date</Form.Label>
                            <Form.Control type="date" placeholder="Completion Date" 
                                name = "completionDate"
                                value = {this.state.completionDate}
                                onChange = {this.onDateChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicDate">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" value = {this.state.status} onChange = {this.onStatusChange}>
                                <option value = ""></option>
                                <option value = "Completed">Completed</option>
                                <option value = "In Progress">In Progress</option>
                            </Form.Control>
                        </Form.Group>

                        <Spinner animation="border" hidden = {this.state.show} className = "spinner"/>

                        <br/>

                        {this.state.error && <div className = "invalid">Some Internal Error</div>}

                        <Button variant="primary" className='addButton' type="submit"
                            // disabled={this.state.buttonDisable}
                            onClick={this.onSubmit}
                        >
                            Add New Todo
                        </Button>
                        {/* <br /> */}
                        <Button
                            // variant = "danger"
                            style = {{width: '40%', backgroundColor: 'firebrick', position: 'absolute', right: '15px'}}
                            onClick={this.props.onHide}>Close</Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
    
                </Modal.Footer>
            </Modal>

            </>
        )
    }
}

export default NewTodo
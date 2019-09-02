import React from 'react'
import autobind from 'react-autobind'
import axios from 'axios'

import {Table, Button, Form} from 'react-bootstrap'
import NewTodo from './NewTodo'

import '../styles/Todo.css'
import CreateSuccess from './CreateSuccess';

class Todo extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            todos: null,
            updatable: true,
            success: false
        }

        autobind(this)
    }

    componentDidMount() {

        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }

        console.log(this.state)

        axios.get('http://localhost:8000/todo/getAll', headers)
            .then(response => {
                this.setState({todos: response.data})
            })
            .catch(err => console.log(err))
    }

    create(event) {
        event.preventDefault()
        console.log(this.state)
        this.setState({show: true})
    }

    onClose() {
        this.setState({show: false})
    }

    onStatusChange(id) {
        console.log(id)
    }

    onUpdate(event) {
        event.preventDefault()

        this.setState({updatable: !this.state.updatable})
    }

    onSuccess() {
        this.setState({show: false, success: true})
    }

    render() {
        return (
            <>
                <h2>Welcome to ToDo Application</h2>

                {this.state.success && <CreateSuccess />}

                <div className = "table">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Target Date</th>
                                <th>Status</th>
                                <th>Change Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.todos && this.state.todos.map((todo, key) => {
                                return (
                                    <tr key = {todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.name}</td>
                                        <td>{todo.completionDate}</td>
                                        <td>
                                        <Form.Control as="select" disabled={this.state.updatable} onChange = {() => this.onStatusChange(todo.id)}>
                                            <option>{todo.status}</option>
                                        </Form.Control>
                                        </td>
                                        <td><Button onClick = {this.onUpdate}>Update</Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                    <hr />

                    <Button className = "newTodo" onClick = {this.create}>Create New Todo</Button>

                    <NewTodo show = {this.state.show} onHide = {this.onClose} onSuccess={this.onSuccess}/>
                </div>               
            </>
        )
    }
}

export default Todo
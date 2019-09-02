import React from 'react'

import {Container, Col, Row} from 'react-bootstrap'

import successImg from '../assets/Success.png'

import '../styles/Todo.css'

function CreateSuccess() {
    return(
        <>
            <Container>
                <Row>
                    <Col></Col>
                    <Col md = {6} xs={12} lg = {4}>
                        <div className = "card">
                            <div>
                                <img className = "success" src={successImg} alt='Loading..'/>
                                <h2>Congratulations!!</h2>
                                <hr/>
                                <div className = "successMsg">Your Todo has been succesfully created.</div>
                                <br />
                            </div>
                        </div>                                   
                    </Col>
                    <Col></Col>
                </Row>
            </Container>

            <br/>
        </>
    )
}

export default CreateSuccess
import React from 'react'
import { Container, Row } from 'react-bootstrap';

function Footer() {
    return (
        <Container fluid className="bg-secondary">
            <Row className="d-flex justify-content-center align-items-center">
                <p className="text-light my-2">Footer</p>
            </Row>
        </Container>
    )
}

export default Footer

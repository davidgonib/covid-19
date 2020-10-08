import React from 'react';

import { Container, Row } from 'react-bootstrap';
import '../css/header.css';

function Header() {
    return (
        <Container fluid className="header bg-secondary">
            <Row className="d-flex justify-content-between align-items-center h-100 mx-2">
                <p className="text-light my-0">Covid 19</p>
                <p className="text-light my-0">Fecha actualización</p>
            </Row>
        </Container>
    )
}

export default Header

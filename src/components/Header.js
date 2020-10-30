import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import '../css/header.css';

/* Header */
function Header() {

    return (
        <Container fluid className="header bg-secondary">
            <Row className="d-flex justify-content-between align-items-center h-100 mx-2">
                <Col className="mx-0 px-0">
                    <h6 className="text-light my-0">COVID-19</h6>
                </Col>
            </Row>
        </Container>
    )
}

export default Header

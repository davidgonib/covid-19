import React, { useState, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { formatData } from '../util';
import '../css/header.css';

function Header() {
    const [date, setDate] = useState([]);

    useEffect(() => {
        fetch('https://corona-api.com/timeline')
        .then(response => response.json())
        .then(data => {
            const globaldata = data.data.shift();
            setDate(formatData(globaldata.updated_at));
        })
    }, []);

    return (
        <Container fluid className="header bg-secondary">
            <Row className="d-flex justify-content-between align-items-center h-100 mx-2">
                <Col className="mx-0 px-0">
                    <h6 className="text-light my-0">COVID-19</h6>
                </Col>
                <Col xs="auto" className="mx-0 px-0">
                    <p className="text-light text-center font-weight-bold my-0">Fecha actualización:</p>
                    <p className="text-light text-center my-0">{date}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Header

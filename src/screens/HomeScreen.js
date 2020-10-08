import React from 'react'

import { Container, Row, Col } from 'react-bootstrap';

function HomeScreen () {
    return (
        <Container fluid className="">
            <Row className="">
                <p>Select Pais</p>
            </Row>
            <Row>Boxes de Información</Row>
            <Row>
                <Col>Tabla</Col>
                <Col>Gráfico</Col>
            </Row>
            <Row>Mapa</Row>
        </Container>
    )
}

export default HomeScreen;
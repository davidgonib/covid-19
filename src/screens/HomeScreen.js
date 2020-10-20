import React, { useState, useEffect } from 'react'

import { Container, Row, Col, Form } from 'react-bootstrap';
import { formatData } from '../util';
import '../css/homeScreen.css';

function HomeScreen () {
    //Variables
    const [date, setDate] = useState([]);
    const [countries, setCountries] = useState([]); // Todos los países
    const [country, setCountry] = useState('wordlwide'); // País seleccionado con el select
    const [countryInfo, setCountryInfo] = useState({})

    // Obtención de los datos globales
    useEffect(() => {
        fetch('https://corona-api.com/timeline')
        .then(response => response.json())
        .then(data => {
            const globaldata = data.data.shift();
            setDate(formatData(globaldata.updated_at));
            setCountryInfo(globaldata)
        })
    }, []);
   
    //Obtención listado de países para poner en el select
    useEffect(() => {
        const getCountriesData = async () => {
            await fetch('https://corona-api.com/countries')
            .then((response) => response.json())
            .then((data) => {
                const countries = data.data.map((country) => (
                    {
                        name: country.name, //Spain
                        value: country.code //ES
                    } 
                ));
                setCountries(countries);
            })
        }
        getCountriesData(); 
    }, [])

    // Función que se ejecuta cuando se selecciona un país con el select
    const onCountryChange = async (event) => {
        const countryCode = event.target.value;

        // Obtención de los datos del país
        const url = countryCode === 'wordlwide'
            ? 'https://corona-api.com/timeline'
            : `https://corona-api.com/countries/${countryCode}`; 
            await fetch(url)
        .then(response => response.json())
        .then(data => {
            setCountry(countryCode);
            // Opción seleccionada: wordlwide
            if(countryCode === 'wordlwide') {
                const info = data.data.shift();
                setCountryInfo(info);
                setDate(formatData(info.updated_at));
            // Opción seleccionada: cualquier país
            } else {
                // Para países sin datos
                if (data.data.timeline.length <= 0) {
                    const info = {
                        updated_at: 0,
                        new_confirmed: 0,
                        confirmed: 0,
                        new_recovered: 0,
                        recovered: 0,
                        new_deaths: 0,
                        deaths: 0,
                    }
                    setCountryInfo(info);
                    setDate(formatData(info.updated_at));
                // Para países con datos
                } else {
                    const info = data.data.timeline.shift();
                    setCountryInfo(info);
                    setDate(formatData(info.updated_at));
                }
            }         
        });
        
    }

    return (
        <Container fluid>      
            <Row className="justify-content-sm-center justify-content-md-between align-items-md-center mx-0 mx-md-0 my-3">
                <Col xs={12} sm={6} md={4} className="mb-2 mb-md-0 px-0">
                    <Form.Control as="select" size="sm" className="select px-0 mx-0" onChange={onCountryChange} value={country}>
                        <option value="wordlwide">Wordlwide</option>
                        {countries.map(country => (
                            <option value={country.value}>{country.name}</option>
                        ))}
                        <option>Spain</option>
                    </Form.Control>
                </Col>
                <Col xs={12} md="auto" className="mx-0 px-0">
                    <p className="text-dark text-center font-weight-bold my-0">Fecha actualización:</p>
                    <p className="text-dark text-center my-0">{date}</p>
                </Col>
            </Row>
            <Row className="mt-3">Mapa</Row>
            <Row className="mt-3">{countryInfo.deaths}</Row>
            <Row className="mt-3 mb-3">
                <Col>Tabla</Col>
                <Col>Gráfico</Col>
            </Row>
        </Container>
    )
}

export default HomeScreen;
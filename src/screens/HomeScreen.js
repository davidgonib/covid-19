import React, { useState, useEffect } from 'react'

import InfoBox from '../components/InfoBox';
import LineGraph from '../components/LineGraph';
import TableCountries from '../components/TableCountries';
import Map from '../components/Map';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { formatData, sortData, cleanMapData } from '../util';
import '../css/homeScreen.css';
import numeral from 'numeral';

function HomeScreen () {
    //Variables
    const [date, setDate] = useState([]); // Fecha del último dato
    const [countries, setCountries] = useState([]); // Lista de todos los países
    const [country, setCountry] = useState('wordlwide'); // País seleccionado con el select
    const [countryInfo, setCountryInfo] = useState([]); // Todos los datos desde el inicio de la pandemia
    const [previousCountryInfo, setPreviousCountryInfo] = useState({}); // Penúltimo dato
    const [currentCountryInfo, setCurrentCountryInfo] = useState({}); // Último dato 
    const [typeData, setTypeData] = useState('acumulado'); // Tipo de dato: acumulado o nuevos
    const [typeCases, setTypeCases] = useState('confirmed'); // Tipo de caso: confirmado, recuperado, fallecido
    const [dataTable, setDataTable] = useState([]); // Datos para la tabla
    const [mapCenter, setMapCenter] = useState({ lat: 34.80745, lng: -40.4796 }); // Coordenadas para centrar el mapa
    const [mapZoom, setMapZoom] = useState(2); // Valor del zoom para el mapa
    const [mapCountries, setMapCountries] = useState([]); // Datos para posicionar en el mapa

    // Obtención de los datos globales
    useEffect(() => {
        fetch('https://corona-api.com/timeline')
        .then(response => response.json())
        .then(data => {     
            const info = data.data; // Todos los datos
            const currentInfo = data.data[0]; // Dato actual
            const previousInfo = data.data[1]; // Dato previo
            setDate(formatData(currentInfo.updated_at)); // Fecha del último dato
            setCountryInfo(info)
            setCurrentCountryInfo(currentInfo);
            setPreviousCountryInfo(previousInfo); // Datos Globales
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
                const sortedData = sortData(data.data);
                setDataTable(sortedData)

                // Datos para posicionar en el mapa
                const mapData = data.data.map((country) => (
                    {
                        name: country.name,
                        latitude: country.coordinates.latitude,
                        longitude: country.coordinates.longitude,
                        confirmed: country.latest_data.confirmed,
                        recovered: country.latest_data.recovered,
                        deaths: country.latest_data.deaths
                    }
                ))
                const mapDataClean = cleanMapData(mapData); // Eliminar los datos nulos
                setMapCountries(mapDataClean);
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
                const info = data.data;
                const currentInfo = data.data[0];
                const previousInfo = data.data[1];
                setDate(formatData(currentInfo.updated_at));
                setCountryInfo(info)
                setCurrentCountryInfo(currentInfo);
                setPreviousCountryInfo(previousInfo); // Datos Globales
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
                    const currentInfo = {
                        updated_at: 0,
                        new_confirmed: 0,
                        confirmed: 0,
                        new_recovered: 0,
                        recovered: 0,
                        new_deaths: 0,
                        deaths: 0,
                    }
                    const previousInfo = {
                        updated_at: 0,
                        new_confirmed: 0,
                        confirmed: 0,
                        new_recovered: 0,
                        recovered: 0,
                        new_deaths: 0,
                        deaths: 0,
                    }                  
                    setCountryInfo(info)
                    setCurrentCountryInfo(currentInfo);
                    setPreviousCountryInfo(previousInfo);
                    setDate(formatData(currentInfo.updated_at));
                // Para países con datos
                } else {
                    const info = data.data.timeline;
                    const currentInfo = data.data.timeline[0];
                    const previousInfo = data.data.timeline[1];
                    setCountryInfo(info)
                    setCurrentCountryInfo(currentInfo);
                    setPreviousCountryInfo(previousInfo);
                    setDate(formatData(currentInfo.updated_at));
                }
            }         
            // establecer las coordenadas del pais seleccionado
            setMapCenter([data.data.coordinates.latitude, data.data.coordinates.longitude]);
            // Establecer zoom
            setMapZoom(4);
        });      
    }
    
    // Función ejecutada cuando se cambia el tipo de dato (acumulado, nuevos)
    const onTypeDataChange = async (event) => {
        const typeData = event.target.value;
        setTypeData(typeData);
    }

    return (
        <Container fluid>      
            <Row className="justify-content-sm-center justify-content-md-between align-items-md-center mx-0 mx-md-0 my-3">
                <Col xs={12} sm={6} md={4} className="mb-2 mb-md-0 px-0">
                    {/* Select para seleccionar un país */}
                    <Form.Control as="select" size="sm" className="select mb-2 px-0 mx-0" onChange={onCountryChange} value={country}>
                        <option value="wordlwide">Wordlwide</option>
                        {countries.map(country => (
                            <option value={country.value}>{country.name}</option>
                        ))}
                    </Form.Control>
                    {/* Select para seleccionar el tipo de dato */}
                    <Form.Control as="select" size="sm" className="select px-0 mx-0" onChange={onTypeDataChange}>
                        <option value="acumulado">Acumulado</option>
                        <option value="nuevos">Nuevos</option>
                    </Form.Control>
                </Col>
                {/* Fecha del último dato */}
                <Col xs={12} md="auto" className="mx-0 px-0">
                    <p className="text-dark text-center font-weight-bold my-0">Fecha actualización:</p>
                    <p className="text-dark text-center my-0">{date}</p>
                </Col>
            </Row>
            <Row className="justify-content-sm-center align-items-md-start mx-0 mx-md-0 my-3">
                {/* Boxes y Gráficos */}
                <Col xs={12} md={6} xl={12} className="order-0 px-0">
                    <Row className="mx-0">
                        <Col className="d-flex flex-column justify-content-xl-around flex-xl-row px-0">
                            {/* Casos Positivos */}
                            <div>
                                {typeData === 'acumulado' 
                                /* Casos Positivos Acumulados */
                                ? <div>
                                        {/* Info Card*/}
                                        <InfoBox 
                                            title="Casos Positivos Acumulados"
                                            typeCases="confirmed"
                                            currentCases={numeral(currentCountryInfo.confirmed).format("0,0")}
                                            previousCases={numeral(previousCountryInfo.confirmed).format("0,0")}
                                            increasePercentCases={numeral((currentCountryInfo.confirmed - previousCountryInfo.confirmed) / previousCountryInfo.confirmed).format("0.0%")}                                         
                                            currentDate={currentCountryInfo.date}
                                            previousDate={previousCountryInfo.date}
                                            onClick={(e) => (
                                                setTypeCases('confirmed')
                                            )}                                                                         
                                        />   
                                        {/* Gráfica*/}
                                        {Array.isArray(countryInfo)
                                            ? <LineGraph
                                                data={countryInfo}
                                                typeCases="confirmed"
                                                backgroundColor="rgba(204, 16, 52, 0.5)"
                                            />
                                            : <Alert variant="danger" className="text-center">
                                                !No hay datos para este país¡
                                            </Alert>
                                        }
                                    </div>      
                                /* Casos Positivos Nuevos */            
                                : <div>
                                        {/* Info Card*/}
                                        <InfoBox 
                                            title="Casos Positivos Nuevos"
                                            typeCases="confirmed"
                                            currentCases={numeral(currentCountryInfo.new_confirmed).format("0,0")}
                                            previousCases={numeral(previousCountryInfo.new_confirmed).format("0,0")}
                                            increasePercentCases={numeral((currentCountryInfo.new_confirmed - previousCountryInfo.new_confirmed) / previousCountryInfo.new_confirmed).format("0.0%")}                                        
                                            currentDate={currentCountryInfo.date}
                                            previousDate={previousCountryInfo.date}
                                            onClick={(e) => setTypeCases('confirmed')}     
                                        />    
                                        {/* Gráfica*/}
                                        {Array.isArray(countryInfo)
                                            ? <LineGraph
                                                data={countryInfo}
                                                typeCases="new_confirmed"
                                                backgroundColor="rgba(204, 16, 52, 0.5)"
                                            />
                                            : <Alert variant="danger" className="text-center">
                                                !No hay datos para este país¡
                                            </Alert>
                                        }
                                    </div>
                                }
                            </div>
                            {/* Casos Recuperados */}
                            <div>
                                {typeData === 'acumulado' 
                                    /* Casos Recuperados Acumulados */ 
                                    ? <div>
                                        {/* Info Card*/}
                                        <InfoBox 
                                            title="Casos Recuperados Acumulados"
                                            typeCases="recovered"
                                            currentCases={numeral(currentCountryInfo.recovered).format("0,0")}
                                            previousCases={numeral(previousCountryInfo.recovered).format("0,0")}
                                            increasePercentCases={numeral((currentCountryInfo.recovered - previousCountryInfo.recovered) / previousCountryInfo.recovered).format("0.0%")}                                        
                                            currentDate={currentCountryInfo.date}
                                            previousDate={previousCountryInfo.date}
                                            onClick={(e) => setTypeCases('recovered')}                                                           
                                        />   
                                        {/* Gráfica*/}
                                        {Array.isArray(countryInfo)
                                            ? <LineGraph
                                                data={countryInfo}
                                                typeCases="recovered"
                                                backgroundColor="rgba(125, 215, 29, 0.5)"
                                            />
                                            : <Alert variant="danger" className="text-center">
                                                !No hay datos para este país¡
                                            </Alert>
                                        }
                                        
                                    </div>    
                                    /* Casos Recuperados Nuevos */                   
                                    : <div>
                                        {/* Info Card*/}
                                        <InfoBox 
                                            title="Casos Recuperados Nuevos"
                                            typeCases="recovered"
                                            currentCases={numeral(currentCountryInfo.new_recovered).format("0,0")}
                                            previousCases={numeral(previousCountryInfo.new_recovered).format("0,0")}
                                            increasePercentCases={numeral((currentCountryInfo.new_recovered - previousCountryInfo.new_recovered) / previousCountryInfo.new_recovered).format("0.0%")}                                        
                                            currentDate={currentCountryInfo.date}
                                            previousDate={previousCountryInfo.date}
                                            onClick={(e) => setTypeCases('recovered')}   
                                        /> 
                                        {/* Gráfica*/}   
                                        {Array.isArray(countryInfo)
                                            ? <LineGraph
                                                data={countryInfo}
                                                typeCases="new_recovered"
                                                backgroundColor="rgba(125, 215, 29, 0.5)"
                                            />
                                            : <Alert variant="danger" className="text-center">
                                                !No hay datos para este país¡
                                            </Alert>
                                        }
                                    </div>   
                                }
                            </div>
                            {/* Casos Fallecidos */}
                            <div>
                                {typeData === 'acumulado' 
                                /* Casos Fallecidos Acumulados */
                                    ? <div>
                                        {/* Info Card*/}
                                        <InfoBox 
                                            title="Casos Falledidos Acumulados"
                                            typeCases="deaths"
                                            currentCases={numeral(currentCountryInfo.deaths).format("0,0")}
                                            previousCases={numeral(previousCountryInfo.deaths).format("0,0")}
                                            increasePercentCases={numeral((currentCountryInfo.deaths - previousCountryInfo.deaths) / previousCountryInfo.deaths).format("0.0%")}                                        
                                            currentDate={currentCountryInfo.date}
                                            previousDate={previousCountryInfo.date}
                                            onClick={(e) => setTypeCases('deaths')}                                                                        
                                        />   
                                        {/* Gráfica*/}
                                        {Array.isArray(countryInfo)
                                            ? <LineGraph
                                                data={countryInfo}
                                                typeCases="deaths"
                                                backgroundColor="rgba(165, 165, 165, 0.5)"
                                            />
                                            : <Alert variant="danger" className="text-center">
                                                !No hay datos para este país¡
                                            </Alert>
                                        }
                                    </div>   
                                    /* Casos Fallecidos Nuevos */                   
                                    : <div>     
                                        {/* Info Card*/}
                                        <InfoBox 
                                            title="Casos Falledidos Nuevos"
                                            typeCases="deaths"
                                            currentCases={numeral(currentCountryInfo.new_deaths).format("0,0")}
                                            previousCases={numeral(previousCountryInfo.new_deaths).format("0,0")}
                                            increasePercentCases={numeral((currentCountryInfo.new_deaths - previousCountryInfo.new_deaths) / previousCountryInfo.new_deaths).format("0.0%")}                                        
                                            currentDate={currentCountryInfo.date}
                                            previousDate={previousCountryInfo.date}
                                            onClick={(e) => setTypeCases('deaths')}     
                                        />     
                                        {/* Gráfica*/} 
                                        {Array.isArray(countryInfo)
                                            ? <LineGraph
                                                data={countryInfo}
                                                typeCases="new_deaths"
                                                backgroundColor="rgba(165, 165, 165, 0.5)"
                                            />
                                            : <Alert variant="danger" className="text-center">
                                                !No hay datos para este país¡
                                            </Alert>
                                        }
                                    </div>  
                                }
                            </div>
                        </Col>
                    </Row>
                </Col>
                
                {/* Mapa */}
                <Col xs={12} xl={8} className="map order-1 order-md-2 order-xl-1 px-0">
                    <Map
                        center={mapCenter}
                        zoom={mapZoom}
                        typeCases={typeCases}
                        countries={mapCountries}
                    />
                    
                </Col>
                {/* Tabla */}
                <Col xs={12} md={6} xl={4} className="tabla order-2 order-md-1 order-xl-2 px-0">
                    <Row className="d-flex flex-column align-self-start align mx-0">
                        { ((typeCases === 'confirmed') && <h5 className="text-center mt-3 mt-md-0">Casos Positivos Acumulados</h5>)
                          || ((typeCases === 'recovered') && <h5 className="text-center mt-3 mt-md-0">Casos Recuperados Acumulados</h5>)
                          ||  <h5 className="text-center mt-3 mt-md-0">Casos Fallecidos Acumulados</h5>
                        }                       
                        <TableCountries 
                            typeCases={typeCases}
                            countries={dataTable} 
                        />
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeScreen;

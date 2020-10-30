import React from 'react';
import { Table } from 'react-bootstrap';
import numeral from 'numeral';

import '../css/tableCountries.css';

/* Tabla con los datos por paises */
function TableCountries({ countries, typeCases }) {
    return (
        <Table borderless striped hover size="sm" className="dataTable overflow-auto w-100">
            <tbody className="mx-3">
            { countries.map(( { name, latest_data }) => (
                <tr key={name}>
                    <td>{name}</td>
                    <td>{numeral(latest_data[typeCases]).format('0,0')}</td>
                </tr>
            ))} 
            </tbody>
        </Table>
    )
}

export default TableCountries

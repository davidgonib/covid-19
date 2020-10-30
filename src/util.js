import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

// Opciones en función del tipo de caso
const casesTypeColors = {
    confirmed: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52)",
        multiplier: 800
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        multiplier: 1200
    },
    deaths: {
        hex: "#000",
        rgb: "rgb(165, 165, 165)",
        multiplier: 2000
    }
};

//Formatear una fecha
export const formatData = date => {
    if (date === 0) {
        return 'No hay datos';
    } else {
        // Fecha en número: 2020-09-27
        const numDate = date.slice(0, 10);
        // Fecha en numero en array: [2020, 09, 27]
        const numsDate = numDate.split('-');
        // Pasar el numero del mes a nombre del mes
        const mounths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const nameMounth = mounths[parseInt(numsDate[1]) - 1];
        // Fecha en frase
        const sentenceDate = numsDate[2] + ' de ' + nameMounth + ' de ' + numsDate[0];
        
        //Hora: 07:41:05
        const numTime = date.slice(12, 19);


        return sentenceDate + ' ' + numTime; 
    }
};

// Ordenar de mayor a menor los datos de la tabla
export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a,b) => a.latest_data.confirmed > b.latest_data.confirmed ? -1 : 1);
};

// Obtener la diferencia en días entre las fechas del último y penúltimo dato
export const getDays = (currentDate, previousDate) => {
    const currentDateMoment = moment(currentDate);  
    const previousDateMoment = moment(previousDate);
    const numberDays = currentDateMoment.diff(previousDateMoment, 'days');
    return numberDays;
}

// Limpiar los paises con coordenadas igual a 0.
export const cleanMapData = data => {
    const dataCleaned = data.filter(country => (country.longitude !== 0 && country.longitude !== null))
    return dataCleaned
}

// Dibujar círculos en el mapa 
export const showDataOnMap = (data, typeCases='confirmed') => (
    data.map(country => (
        <Circle
             center={[country.latitude, country.longitude]}
             fillOpacity={0.4}
             color={casesTypeColors[typeCases].hex}
             fillColor={casesTypeColors[typeCases].hex}
             radius={
                 Math.sqrt(country[typeCases])* casesTypeColors[typeCases].multiplier
             }
         >
             <Popup>
                 <div className="">
                     <div className="font-weight-bold">{country.name}</div>
                     <div className="">Confirmados: {numeral(country.confirmed).format("0,0")}</div>
                     <div className="">Recuperados: {numeral(country.recovered).format("0,0")}</div>
                     <div className="">Fallecidos: {numeral(country.deaths).format("0,0")}</div>
                 </div>
             </Popup>
         </Circle>     
    ))
);
import React from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

// Opciones de la gráfica
const options = {
    legend: {
        display: false, // Sin leyenda
    },
    elements: {
        point: {
            radius: 1 // Radio del punto que representa un dato
        },
    },
    maintainAspectRadio: false,
    tooltips: {
        mode: "index",
        interserct: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    parser: "YYYY-MM-DD",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    }
};  

/* Gráfica */
function LineGraph(props) {

    // Extraer los datos (fecha y cantidad en función del tipo de caso)
    const buildChartData = (data, typeCases) => {   
        const chartData = [];
        data.forEach(day => {
            const newDataPoint = {
                x: day.date,
                y: day[typeCases]
            }
            chartData.push(newDataPoint);
        });
        
        return chartData;
    }
    
    const chartData = buildChartData(props.data, props.typeCases);

    return (
        <div className="w-100 mb-5">
            {chartData?.length > 0 && (
                <Line 
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: props.backgroundColor,
                                data: chartData,
                            }
                        ]
                    }}
                />
            )}
        </div>
    )
}

export default LineGraph

/*
setCountryCode(country);

        const fetchData = async () => {
            if (countryCode !== 'wordlwide' ) {
                console.log(countryCode)
                await fetch('https://corona-api.com/timeline')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let chartData = buildChartData(data.data, casesType);
                    setData(chartData);
                })
            } else {
                await fetch(`https://corona-api.com/countries/${countryCode}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const dataline = data.data;  
                })
            }           
        };
        fetchData();

*/
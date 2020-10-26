

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

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a,b) => a.latest_data.confirmed > b.latest_data.confirmed ? -1 : 1);
};
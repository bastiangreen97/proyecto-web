var arrayProfundidad = [];
var arraySismos = [];
arrayProfundidad = ['uno','dos'];
arraySismos = [2,3];
const apiSis2 = new APISismos();

apiSis2.forEach(element => {
    arraySismos.push(element);
});

arraySismos.map(o =>{
    let prof = '';
    prof = parseFloat(o.Profundidad);
    arrayProfundidad.push(prof);
});

const chartline = document.getElementById('lineChart2');

let lineChart = new Chart(chartline, {
    type: 'line',
    data: {
        labels: ['Uno, Dos, Tres'],
        datasets: [
            {
                label: "My First dataset",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75, 192, 192, 0.4)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHitRadius: 10,
                data: arrayProfundidad,
            }
        ]}
});




        




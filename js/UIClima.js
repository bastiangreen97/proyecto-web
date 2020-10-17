class UIClima{
    constructor(){
        this.api = new APIClima();
    }

    showContent(){
        this.api.getInformation().then(info => {
            const result = info.resultJSON;
            this.showCards(result);
            this.showChart(result);
            this.showChart2(result);
        });
    }

    showCards(info){
        let cards = '';
        let auxtemp = '';
        
        info.forEach(element => {
            auxtemp = '';
            
            const {Estacion, HoraUpdate, Temp, Humedad, Estado} = element;

            if(Temp < 0){
                auxtemp = 'indigo darken-4';
            }
            else if(Temp < 12){
                auxtemp = 'blue darken-1';
            }
            else if(Temp >= 12 && Temp < 20){
                auxtemp = 'light-green darken-2';
            }
            else if(Temp >= 20 && Temp < 27 ){
                auxtemp = 'orange';
            }
            else if(Temp >= 27){
                auxtemp = 'red';
            }

            cards += `
                <div class="col s12 m6 l4">
                    <div class="card ${auxtemp} darken-1">
                        <div class="card-content white-text z-depth-4">
                            <span class="card-title">${Estacion}</span>
                            <p class="full-width truncate"><i class="material-icons left">timer</i>Hora: ${HoraUpdate}</p>
                            <p class="full-width truncate"><i class="material-icons left">graphic_eq</i>Temperatura: ${Temp}</p>
                            <p class="full-width truncate"><i class="material-icons left">bubble_chart</i>Humedad: ${Humedad}</p>
                            <p class="full-width truncate"><i class="material-icons left">transform</i>Estado: ${Estado}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById('div-cards-weather').innerHTML = cards;
    }

    showChart(info){
        const chartbar = document.getElementById('barChartClima');
        const chartbar2 = document.getElementById('barChartClima2');

        const xs = [];
        const ys = [];
        const color = [];
        const hum = [];

        info.forEach(elements => {
                const {Estacion, Temp, Humedad} = elements;
                xs.push(Estacion);
                ys.push(Temp);
                if(Temp < 0){
                    color.push('#3445C5');
                }
                else if(Temp < 12){
                    color.push('orange');
                }
                else if(Temp >= 12 && Temp < 20){
                    color.push('red');
                }
                else if(Temp >= 20 && Temp < 27 ){
                    color.push('yellow');
                }
                else if(Temp >= 27){
                    color.push('pink');
                }
                hum.push(Humedad);
            })


        let horizontalBar1 = new Chart(chartbar, {
            type: 'horizontalBar',
            data: {
                labels: xs,
                datasets: [{
                    label: 'Temperatura en º Celsius',
                    backgroundColor: color,
                    barPercentage: 1,
                    barThickness: 9,
                    maxBarThickness: 8,
                    minBarLength: 3,
                    data: ys,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
            });
    }

    showChart2(info){
        const chartbar = document.getElementById('barChartClima2');
        const xs = [];
        const color = [];
        const hum = [];

        info.forEach(elements => {
                const {Estacion, Humedad} = elements;
                xs.push(Estacion);
                hum.push(Humedad);
            })


        let horizontalBar1 = new Chart(chartbar, {
            type: 'horizontalBar',
            data: {
                labels: xs,
                datasets: [{
                    label: 'Humedad en %',
                    backgroundColor: 'blue',
                    barPercentage: 1,
                    barThickness: 9,
                    maxBarThickness: 8,
                    minBarLength: 3,
                    data: hum,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
            });
    }
}
class UIClima{
    constructor(){
        this.api = new APIClima();
    }

    showContent(){
        this.api.getInformation().then(info => {
            const result = info.resultJSON;
            this.showCards(result);
        });
    }

    showCards(info){
        let cards = '';
        let auxtemp = '';
        
        info.forEach(element => {
            auxtemp = '';
            
            const {Estacion, HoraUpdate, Temp, Humedad, Estado} = element;

            if(Temp <= 15){
                auxtemp = 'blue';
            }else if(Temp > 15 && Temp < 25){
                auxtemp = 'purple';
            }
            else if(Temp >= 25){
                auxtemp = 'red';
            }

            cards += `
                <div class="col s12 m6 l4">
                    <div class="card ${auxtemp} darken-1">
                        <div class="card-content white-text z-depth-4">
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
}
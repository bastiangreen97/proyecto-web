class UISismos{
    constructor(){
        /* Instanciar clase de APISismos */
        this.api = new APISismos();
        /* Crear una capa de grupo para ubicar los marcadores/pines de ubicación, utilizando los elementos y componentes del framework Leaflet */
        this.markers = new L.LayerGroup();
        /* Iniciar mapa de Leaflet en el html */
        this.mapDiv = this.startMap();
    }

    startMap(){
        /* Crear mapa en el div contenedor, punto de inicio: Santiago de Chile, con zoom de 4*/
        const map = L.map('div-map').setView([-33.4372, -70.6506], 5);
        /* Atribuciones */
        const mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map);
        return map;
    }

    showContent(){
        /* Mostrar las ubicaciones obtenidas desde la API */
        this.api.getInformation().then(info => {
            const result = info.resultJSON;
            this.showPinsAndCards(result);
        });
    }

    showPinsAndCards(info){
        /* Limpiar capas con ubicaciones anteriores */
        this.markers.clearLayers();
        let cards = '';
        let infotable = '';
        /* Extraer atributos especificos (Destructuring) */
        info.forEach(elements => {
            const {Fecha, Latitud, Longitud, Profundidad, Magnitud, RefGeografica} = elements;
            const popUpOptions = L.popup().setContent(`<p>Fecha: ${Fecha}</p>
                <p>Profundidad: ${Profundidad}</p>
                <p>Magnitud: ${Magnitud}</p>
                <p>Ref.Geografica: ${RefGeografica}</p>`);

            const marker = new L.marker([
                parseFloat(Latitud),
                parseFloat(Longitud)
            ]).bindPopup(popUpOptions);

            this.markers.addLayer(marker); 

            cards += `<div class="col s12 m6 l6">
                        <div class="card indigo lighten-1">
                        <div class="card-content white-text z-depth-4">
                            <span class="card-title">Fecha: ${Fecha}</span>
                            <p>Profundidad: ${Profundidad}</p>
                            <p>Magnitud: ${Magnitud}</p>
                            <p>Ref.Geografica: ${RefGeografica}</p>
                        </div>
                    </div>
                </div>`;

            infotable += `<tr>
                                <td>${Fecha}</td>
                                <td>${Profundidad} km</td>
                                <td>${Magnitud}</td>
                                <td>${RefGeografica}</td>
                            </tr>`;
        
        });
        document.getElementById('div-cards').innerHTML = cards;
        document.getElementById('table-information').innerHTML = infotable;

        this.markers.addTo(this.mapDiv);
    }

}
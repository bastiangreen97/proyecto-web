class APISismos{
    async getInformation(){
        /* Se extraen los datos e información desde la API Gael */
        const infos = await fetch('https://api.gael.cl/general/public/sismos');
        const resultJSON = await infos.json();
        /* Retornar el resultado en formato JSON */
        return{
            resultJSON
        }
    }
}
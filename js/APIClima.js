class APIClima{
    async getInformation(){
        const info = await fetch('https://api.gael.cl/general/public/clima');
        const resultJSON = await info.json();
        return {
            resultJSON
        }
    }
}
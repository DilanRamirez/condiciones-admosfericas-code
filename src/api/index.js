import axios from 'axios';

const url = 'https://api.datos.gob.mx/v1/condiciones-atmosfericas';

export const fetchData = async () => {
    try {
        const data = await axios.get(url);
        const dataStarted = data.data;
        console.log(data)
    
        const parsedData = {

            name: dataStarted.results.map((item) => item.name),
            state: dataStarted.results.map((item) => item.state),
            probabilityofprecip: dataStarted.results.map((item) => item.probabilityofprecip),
            skydescriptionlong: dataStarted.results.map((item) => item.skydescriptionlong), 
            tempc: dataStarted.results.map((item) => item.tempc), 
            latitude: dataStarted.results.map((item) => item.latitude),
            longitude: dataStarted.results.map((item) => item.longitude)
        }

        

        return parsedData;
    } catch (error) {
        console.error(error)
    }
}
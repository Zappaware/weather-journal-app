/* Global Variables */

const myAppId = `23eaaf61fab62a2f43f0fc31f3893e2a`;
const baseUrl = `api.openweathermap.org/data/2.5/weather?`;
const zipCode = document.getElementById('zip');
const countryCode = document.getElementById('country');
const submitButton = document.getElementById('generate');
 
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ d.getMonth()+'.'+ d.getFullYear();


/* Function called by event listener */


/* Function to GET Web API Data*/
const getWeather = async ()=>{
    let url = `http://${baseUrl}${zipCode},${countryCode}&appid=${myAppId}`;
    const response = await fetch(url);
    try {
        const apiData = await response.json;
        return apiData;
    }catch(error){
        console.log('error', error);
    }

};

/* Function to POST data */


/* Function to GET Project Data */


// Event listener to add function to existing HTML DOM element

submitButton.addEventListener('click', getWeather);

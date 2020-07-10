/* Global Variables */
const myAppId = `23eaaf61fab62a2f43f0fc31f3893e2a`;
const baseUrl = `api.openweathermap.org/data/2.5/weather?`;
/*I am using the .value property and in Mozilla works fine, but I'm getting problems across browser compatibility because I'm not fetching nothing, 
thus nothing works, I really would like feedback here because I want the code to work in all browsers*/ 
const zipCode = document.getElementById('zip').value;
const countryCode = document.getElementById('country').value;
const userResponse = document.getElementById('feelings').value;
const submitButton = document.getElementById('generate');

 
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ d.getMonth()+'.'+ d.getFullYear();


/* Function called by event listener */
const getAll = (e) => {
    //Right here works just fine in Mozilla, but in other browsers the url it is not working
    getWeather(baseUrl, zipCode, countryCode, myAppId)
    .then((tempData)=>{postUserResponse('/add', {temperature: tempData, date: newDate, userFeelings: userResponse})})
    .then(getData('/all'));
}

/* Function to GET Web API Data*/
const getWeather = async (base, zip, country, appId)=>{
    let url = `http://${base}zip=${zip},${country}&appid=${appId}`;
    const response = await fetch(url);
    try {
        const apiData = await response.json();
        const tempData = apiData.main.temp;
        return tempData
    }catch(error){
        console.log('error', error);
    }

};

/* Function to POST data */

const postUserResponse = async (url='', data = {})=> {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData
    } catch(error) {
        console.log('error', error);
    }
};


/* Function to GET Project Data */
const getData = async (url='') => {
    const request = await fetch(url);

    try{
        const allData = await request.json();
        console.log(allData)
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}`;
        //Even with the userFeelings part the .value property doesn't work well.
        document.getElementById('content').innerHTML = `Feelings: ${allData.userFeelings}`;
    }catch(error){
        console.log("error",error)
    }
}

// Event listener to add function to existing HTML DOM element

submitButton.addEventListener('click', getAll);

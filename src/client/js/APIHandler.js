function handleAPIRequest(event) {
    //event.preventDefault()

    /* Global Variables */
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
    const apiKey ='a8a8a7f0f58e508352c6ba7878555297';
    zip_code='19081';

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    client.checkForName(formText)

    //set a click listener on the form's submit button
    document.getElementById('get_weather_data_btn').addEventListener('click', performAction);

    function performAction(e){
        const data = getWeatherData(baseURL, zip_code, apiKey)
        .then(function(data){
            updateUI(data)
        })
    }

    //client-side get weather data request
    const getWeatherData = async (baseURL, zip_code, apiKey) => {
    const response = await fetch(baseURL + zip_code + "&appid=" + apiKey + "&units=imperial");
    try{
        const weather_data = await response.json();
        console.log('Retrieved weather data: ' + weather_data); 
        return weather_data;
      }catch(error){
          console.log("error", error);
      }
  }

  const updateUI = async (data) => {
    try{
      console.log('GET temperature: ' + data.main.temp);
      document.getElementById('api_results').innerHTML = data.main.temp;
    }catch(error){
      console.log("error", error);
    }
  }
}

export { handleAPIRequest }
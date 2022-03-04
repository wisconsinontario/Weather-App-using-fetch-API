const cityForm = document.querySelector('form');
const card = document.querySelector('.card')
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
    //a function that will update the ui
    const updateUI = (data) => {

        // const cityDets = data.cityDets;
        // const weather = data.weather;

        //Destructuring properties
        const {cityDets, weather } = data;

        //update details template

        details.innerHTML = `
            <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.value}</span>
                    <span>&deg;C</span>
                </div>
        `;
        //remove d-none class
        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        }
    };
const updateCity = async (city) => {
    
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets, weather };
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim(); //just incase there are white spaces
    cityForm.reset();

            //update ui with new city
            updateCity(city)
            .then(data => updateUI(data))
            .catch(err => console.log(err));

});
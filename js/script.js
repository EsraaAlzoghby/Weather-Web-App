const search = document.getElementById("search");
const find = document.getElementById("find");
let fallDataWeather = {};
getApl("cairo");
async function getApl(inputSearch) {
    if (inputSearch.length > 2) {
        try {
            let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${inputSearch}&days=3&key=9c152279d3794200a0151225242312`);
            response = await response.json();
            fallDataWeather = response;
            dataWeather(fallDataWeather.forecast.forecastday);
        } catch (error) {
            console.log(error);
        }
    }
}
search.addEventListener('input', function (e) {
    let inputSearch = e.target.value;
    getApl(inputSearch);
});
function dataWeather(displayData) {
    let finalData = '';
    for (let i = 0; i < displayData.length; i++) {
        let { days, months, daysNum } = getDate(displayData[i].date);
        finalData += `
            <div class="col-lg-4">
                <div class="show bg-footer text-white-50 pb-4">
                    <div class="date d-flex justify-content-between align-items-center px-3 py-2">
                        ${
                            i == 0 ? `<span>${days}</span> 
                        <span>${daysNum} ${months}</span> ` :`<span>${days}`
                        }
                    </div>
                    <div class="ps-3 mt-4 fs-5 fw-bold text-white text-capitalize">${ i==0 ?`${fallDataWeather.location.name}` : ``}</div>
                    <div class="temperature d-flex justify-content-between align-items-center px-2 ms-2">
                        <p class="fw-bold text-white">${displayData[i].day.maxtemp_c}<sup>o</sup>C</p>
                        <a href="https://www.weatherapi.com/">
                            <img src="https:${i==0 ? `${displayData[i].day.condition.icon}` : ``}" class="w-100" alt="">
                        </a>
                    </div>
                    <div class="custom ms-2 ps-2 mb-4 text-info fs-5">${displayData[i].day.condition.text}</div>
                    <div class="details ms-3 px-2 pb-4">
                        <span class=""><img src="img/icon-umberella.png" alt="#"> ${displayData[i].day.daily_chance_of_rain} %</span>
                        <span class="ms-3"><img src="img/icon-wind.png" alt="#"> ${displayData[i].day.maxwind_kph} km/h</span>
                        <span class="ms-3"><img src="img/icon-compass.png" alt="#"> ${displayData[i].day.condition.text}</span>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById("partOfHeader").innerHTML = finalData;
}
function getDate(allDate) {
    const endData = new Date(allDate);
    let days = endData.toLocaleString('en-us', { weekday: 'long' });
    let months = endData.toLocaleString('en-us', { month: 'long' });
    let daysNum = endData.toLocaleString('en-us', { day: "numeric" });
    return { days, months, daysNum };
}

window.navigator.geolocation.getCurrentPosition(
    (information) => {
        let locationLatitude = information.coords.latitude;
        let locationLongitude = information.coords.longitude;
        console.log(locationLatitude);
        console.log(locationLongitude);
        getApl(`${locationLatitude},${locationLongitude}`);
    },
    (error) => {
        getApl("cairo");
    }
);



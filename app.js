// form
const formData = document.querySelector("form")
// section
const section = document.querySelector(".Weather")

formData.addEventListener("submit", async (event) =>{
    event.preventDefault()
    let city = await  document.querySelector(".city").value
    getCityCoordinates(city)
    section.innerHTML = " "
})

const getCityCoordinates = async (city) => {
    try{
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
        const data = await response.json()
        const latitude = data.results[0].latitude
        const longitude = data.results[0].longitude
        const country = data.results[0].name
        const population = data.results[0].population
        getWeather(longitude,latitude,city,country,population)
    }
    catch(err){
        const error = document.createElement("p")
        error.textContent = "No city was found reload the page and try again"
        error.classList.add("error")
        document.querySelector("body").innerHTML = " "
        document.querySelector("body").append(error)
    }
}

const getWeather = async(longitude, latitude, city, country, population) => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`)
    const data = await response.json()
    generateHtml(data, city, country, population)
}

const generateHtml = async (data, city, country, population) =>{
    section.innerHTML= `
    <div class="img">   
        <h1>${city}</h1>
        <h1>${data.current.temperature_2m}${data.current_units.temperature_2m}</h1>
    </div class="table">
        <div class ="row">
            <h2>Country:</h2>
            <p>${country}</p>
        </div>
        <div class ="row">
            <h2>Timezone:</h2>
            <p>${data.timezone}</p>
        </div>
        <div class ="row">
            <h2>Population:</h2>
            <p>${population}</p>
        </div>
        <div class ="row">
            <h2>Tomorrow's Forecast:</h2>
            <div class="tomorrow_W">
                <p>Min: ${data.daily.temperature_2m_min}${data.daily_units.temperature_2m_min}</p>
                <p>Max: ${data.daily.temperature_2m_max}${data.daily_units.temperature_2m_max}</p>
            <div>
        </div>
    <div>
    `
    if(data.current.is_day == 0){
        document.querySelector("input").classList.add("input_n")
        document.querySelector(".img").classList.add("nigth")
        document.querySelector("button").classList.add("btn_n")
        const text = document.querySelectorAll("h2")
        document.querySelector("body").classList.add("n_body")
        document.querySelector(".tomorrow_W").classList.add("n")
        const responcedata = document.querySelectorAll("p")
        responcedata.forEach(p =>{
            p.classList.add("n")
        })
        text.forEach(element => {
            element.classList.add("n")
        });
    }
    else{
        document.querySelector("input").classList.remove("input_n")
        document.querySelector(".img").classList.remove("nigth")
        document.querySelector("button").classList.remove("btn_n")
        const text = document.querySelectorAll("h2")
        document.querySelector("body").classList.remove("n_body")
        document.querySelector(".tomorrow_W").classList.remove("n")
        const responcedata = document.querySelectorAll("p")
        responcedata.forEach(p =>{
            p.classList.remove("n")
        })
        text.forEach(element => {
            element.classList.remove("n")
        });
    }
}
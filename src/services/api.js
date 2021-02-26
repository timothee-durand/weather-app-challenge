import axios from "axios";

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
    baseURL: "https://cors-anywhere-timothee-durand.herokuapp.com/https://www.metaweather.com/api/location/",
    headers: {
        "X-Requested-With": "*"
    }
});

function getTown(town) {
    return axiosAPI.get("search/?query=" + town).then(data => {
        console.log("town", data.data)
        return data.data
    }).catch(e => {
        console.log(e)
    })
}


function getWeather(woeid) {
    return axiosAPI.get(woeid.toString()).then(data => {
        console.log("weather", data.data)
        console.log("day", data.data.consolidated_weather[0])
        return data.data
    }).catch(e => {
        console.log(e)
    })
}

export const api = {
    getTown,
    getWeather
}

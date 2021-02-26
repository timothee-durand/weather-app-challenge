<script>
    import Search from "./Search.svelte";
    import ImgWeather from "./ImgWeather.svelte";
    import moment from "moment";

    let weather = {
        consolidated_weather: [{
            air_pressure: 1035.5,
            applicable_date: "2021-02-26",
            created: "2021-02-26T15:40:04.829806Z",
            humidity: 67,
            id: 6045067300044800,
            max_temp: 12.215,
            min_temp: 6.575,
            predictability: 75,
            the_temp: 11.594999999999999,
            visibility: 13.149146484530343,
            weather_state_abbr: "lr",
            weather_state_name: "Light Rain",
            wind_direction: 8,
            wind_direction_compass: "N",
            wind_speed: 6.308625945534081,

        }],
        title: "loading"
    };

    $: dayWeather = weather.consolidated_weather[0];
    $: nextDayWeather = weather.consolidated_weather.slice(1, weather.consolidated_weather.length - 1);

    let sign = "°C"

    let openSearch = false;

    function openSearchClick() {
        openSearch = true;
    }

    function getDateFormated(date) {
        return moment(date).format("ddd D MMM")
    }

    function getTemperature(temp, addSign = false) {
        if (addSign) {
            return parseInt(temp) + "°C";
        } else {
            return parseInt(temp);
        }

    }
</script>
<div id="app">

    <button type="button" on:click={openSearchClick} class="button-open-search">Search for place</button>

    <Search bind:weather={weather} bind:open={openSearch}/>
    {#if "title" in weather}
        <main class="flex-column flex">
            <section class="today-section">
                <ImgWeather nameImage="{dayWeather.weather_state_name}"/>
                <p><span class="bug-temp">{getTemperature(dayWeather.the_temp)}</span> <span class="temp-sign">°C</span>
                </p>
                <p class="weather-name">{dayWeather.weather_state_name}</p>
                <p class="weather-day">Today &middot; {dayWeather.applicable_date}</p>
                <p class="town-presentation"><span class="material-icons">place</span>   {weather.title}</p>
            </section>

            <section class="main-section">
                <section class="grid next-day-section">
                    {#each nextDayWeather as day}
                        <div class="card-next-day card flex flex-column items-center space-between">
                            <p>{getDateFormated(day.applicable_date)}</p>
                            <ImgWeather nameImage="{day.weather_state_name}"/>
                            <div class="flex space-between w-75">
                                <p>{getTemperature(dayWeather.max_temp, true)}</p>
                                <p class="color-dark">{getTemperature(dayWeather.min_temp, true)}</p>
                            </div>
                        </div>
                    {/each}
                </section>
                <div class="second-section">
                    <h3>Today's Highlihts</h3>
                    <section class="hightlights-section">


                    <article class="card flex flex-column space-between w-75 items-center">
                        <h4 class="card-tile">Wind status</h4>
                        <p class="card-highlits">{getTemperature(dayWeather.wind_speed)} <span>mph</span></p>
                        <div class="flex space-between w-75 items-center">
                            <i class="material-icons card-tile" style="transform: rotate({dayWeather.wind_direction}deg)">navigation</i>
                            <p>{dayWeather.wind_direction_compass}</p>
                        </div>
                    </article>

                    <article class="card flex flex-column space-between w-75 items-center">
                        <h4 class="card-tile">Humidity</h4>
                        <p class="card-highlits">{getTemperature(dayWeather.humidity)} <span>%</span></p>
                        <progress value="{parseInt(dayWeather.humidity)}" max="100"></progress>
                    </article>

                    <article class="card flex flex-column space-between w-75 items-center">
                        <h4 class="card-tile">Visibility</h4>
                        <p class="card-highlits">{parseFloat(dayWeather.visibility).toFixed(1)} <span>miles</span></p>
                    </article>

                    <article class="card flex flex-column space-between w-75 items-center">
                        <h4 class="card-tile">Air pressure</h4>
                        <p class="card-highlits">{parseFloat(dayWeather.air_pressure).toFixed(1)} <span>mb</span></p>
                    </article>

                </section>
                </div>

            </section>

        </main>
    {/if}


    <p class="color-dark text-presentation">Created by Timothée DURAND - devChallenges.io</p>
</div>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700&display=swap&family=Material+Icons');

    :root {
        --darkblue: #1E213A;
        --black: #100E1D;
        --lightgrey: #E7E7EB;
        --darkgrey: #A09FB1;
        --blue: #3C47E9;
    }


    #app {
        width: 100%;
        min-height: 100vh;
        font-family: Raleway, sans-serif;
        font-size: 1.6rem;
        font-weight: 500;
        background-color: var(--black);
        color: var(--lightgrey);
        position: relative;
    }

    .button-open-search {
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: 5;
        background-color: var(--darkgrey);
        color: var(--lightgrey);
    }


    .today-section {
        position: relative;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 20px 0;
    }

    .today-section::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("../images/Cloud-background.png");
        -webkit-background-size: 150%;
        background-size: 150%;
        background-repeat: repeat-x;
        background-position: center center;
        opacity: 0.2;
    }

    .town-presentation {
        display: inline-flex;
        align-items: center;
        color: var(--darkgrey);
    }

    .today-section p {
        margin: 0;
    }

    .bug-temp {
        font-size: 14.4rem;
        font-weight: 500;
        line-height: 16.9rem;
    }

    .temp-sign {
        font-size: 4.8rem;
        font-weight: 100;
        line-height: 5.6rem;
        color: var(--darkgrey);
    }

    .weather-name {
        font-weight: 600;
        font-size: 3.6rem;
        line-height: 4.2rem;
        text-align: center;
        color: var(--darkgrey);
    }

    .weather-day {
        font-weight: 500;
        font-size: 1.8rem;
        line-height: 2.1rem;
        color: var(--darkgrey);
    }

    .next-day-section {
        display: grid;
        padding: 50px;
        grid-template-columns: repeat(auto-fit, 120px );
        grid-gap: 20px;
    }

    .card {
        background-color: var(--darkblue);
        width: 100%;
        padding: 10px;
        text-align: center;
    }

    .card-next-day {
        font-weight: 500;
        font-size: 1.6rem;
        text-align: center;
        line-height: 1.9rem;
    }

    .hightlights-section {
        display: grid;

        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr) );
        grid-gap: 20px;
    }

    .second-section{
        padding: 20px;
    }

    .card-tile {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 1.9rem;
        margin: 10px;
    }

    .card-highlits {
        font-weight: bold;
        font-size: 64px;
        line-height: 75px;
        margin: 1rem 0;
    }

    progress {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 80%;
        height: 10px;
        margin: 20px;
        position: relative;
    }

    progress::-webkit-progress-bar {
        background: var(--lightgrey);
        border-radius: 80px;
    }

    progress::-webkit-progress-value {
        background: #FFEC65;
        border-radius: 80px;
    }

    progress::after {
        content: "%";
        position: absolute;
        right: 0;
        bottom: -2rem;
    }

    .text-presentation {
        margin: 0;
        padding: 10px;
        text-align: center;
    }

    main {
        flex-direction: column;
    }

    @media (min-width: 800px) {
        main {
            flex-direction: row !important;
        }

        .today-section {
            width: 25%;
        }
        .main-section {
            width: 75%;
        }
        .hightlights-section {
            grid-template-columns: repeat(2, 0.5fr);
            grid-gap: 50px;
        }
        .next-day-section {
            grid-template-columns: repeat(auto-fill, 1fr);
            grid-gap: 50px;
            justify-content: center;
            align-items: center;
        }
        .next-day-section > * {
            justify-self: center;
            align-self: center;
        }
    }
</style>

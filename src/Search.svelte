<script>
    import {api} from "./services/api.js";
    export let weather;
    let resultSearch = [];
    let town;

    export let open = true;

    function handleClickTown(woeid){
        weather = {consolidated_weather:[]};
        api.getWeather(woeid).then(data => {
            weather = data;
            resultSearch = [];
            close()
        })
    }

    handleClickTown(615702)

    function handleSearch() {
        api.getTown(town).then(data => {
            resultSearch = data;

        })
    }

    function close(){
        console.log("open", open)
        open = false;
    }

    function openSearch(){
        console.log("open", open)
        open = true;
    }
</script>

<div class:open={open} class="search">
    <button class="button-close" on:click={close}>
        <i class="material-icons">close</i>
    </button>
    <form on:submit|preventDefault={handleSearch} >
        <input type="text" bind:value={town} on:focus={openSearch} on:change={handleSearch} placeholder="Search location"/>
        <button type="submit" class="button-search border-hover">Search</button>
    </form>

    {#each resultSearch as result, i}
        <p  class="result border-hover" on:click="{handleClickTown(result.woeid)}">{result.title}</p>
    {/each}
</div>

<style>
    .search {
        width: 100%;
        height:100vh;
        position: absolute;
        z-index: 10;
        left: 0;
        top: 0;
        background-color: var(--darkblue);
        display: flex;
        flex-direction: column;
        padding: 60px 13px;
        transform: translateY(-100%);
        transition: transform ease 300ms;
    }

    .open {
        transform: none;
    }


    form {
        width: 100%;
        margin: 0;
        display: flex;
    }

    .button-search {
        background-color: var(--blue);
        color:var(--lightgrey);
        margin-left: 10px;
    }

    .border-hover {
        border: 1px solid transparent;
        transition: border ease 200ms;
    }

    .border-hover:hover, .border-hover:focus {
        border: 1px solid var(--lightgrey);
    }

    .button-close {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0.5rem;
        cursor: pointer;
        background-color: transparent;
        color:var(--lightgrey);
    }


    input {
        border: 1px solid var(--lightgrey);
        background-color: transparent;
        padding: 15px;
        color:var(--lightgrey);
        width: 100%;
    }

    .result {
        cursor: pointer;
        width: 100%;
        padding: 20px 12px;
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
    }

    .result::after {
        content: ">";
        opacity: 0;
        transition: opacity ease 200ms;
    }

    .result:hover::after {
        opacity: 1;
    }
    @media (min-width: 800px) {
        .search {
            width: 25%;
        }
    }


</style>

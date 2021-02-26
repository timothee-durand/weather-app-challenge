<img {src} alt="sign for {nameImage}">

<script>
    export let nameImage="loading";

    $:src = `images/${nameImage.split(' ').join('')}.png`
</script>

<style>
    img {
        max-width: 100%;
    }
</style>

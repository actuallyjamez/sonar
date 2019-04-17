<template>
    <div id="help" class="bezier" :class="{ hidden: hidden }">
        <h1>Select Sonar Player from "Available Devices" in the Spotify app.</h1>
    </div>
</template>

<script>
    export default {
        name: "Help",
        props: {
            hidden: Boolean
        }
    }
</script>

<style scoped>
    .bezier {
        -webkit-transition: all 2000ms cubic-bezier(0.655, 0.010, 0.115, 0.975);
        -moz-transition: all 2000ms cubic-bezier(0.655, 0.010, 0.115, 0.975);
        -o-transition: all 2000ms cubic-bezier(0.655, 0.010, 0.115, 0.975);
        transition: all 2000ms cubic-bezier(0.655, 0.010, 0.115, 0.975); /* custom */
        -webkit-transition-timing-function: cubic-bezier(0.655, 0.010, 0.115, 0.975);
        -moz-transition-timing-function: cubic-bezier(0.655, 0.010, 0.115, 0.975);
        -o-transition-timing-function: cubic-bezier(0.655, 0.010, 0.115, 0.975);
        transition-timing-function: cubic-bezier(0.655, 0.010, 0.115, 0.975); /* custom */
    }

    #help {
        position: absolute;
        z-index: 3;
        font-weight: bold;
        bottom: 60px;
        right: 60px;
        font-size: 24px;
    }

    .hidden {
        opacity: 0 !important;
    }
</style>

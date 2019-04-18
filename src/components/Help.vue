<template>
    <div id="help" class="bezier" :class="{ hidden: hidden }">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             height="64" width="64">
            <defs>
                <ellipse id="ellipse-1" opacity="1" rx="32" ry="32" cx="32" cy="32"></ellipse>
                <mask id="mask-2" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0"
                      y="0">
                    <rect opacity="1" x="0" y="0" width="64" height="64" fill="black"></rect>
                    <use xlink:href="#ellipse-1" fill="white"></use>
                </mask>
            </defs>
            <g opacity="1">
                <use xlink:href="#ellipse-1" fill-opacity="0" stroke="rgb(255,255,255)"
                     stroke-opacity="1"
                     stroke-width="20" stroke-linecap="butt" stroke-linejoin="miter"
                     mask="url(#mask-2)"></use>
            </g>
        </svg>
        <h1>Select "Sonar Player" from Available Devices in the Spotify app.</h1>
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
        font-size: 24px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

    }

    /*noinspection CssUnusedSymbol*/
    .hidden {
        opacity: 0 !important;
    }

    h1 {
        margin-top: 25px;
    }
</style>

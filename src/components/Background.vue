<template>
    <div>
        <div id="background" :style="{ 'background-image': 'url(' + currentImage + ')' }"
             :class="{ in: viewIn, out: viewOut, paused: paused }" class="bezier">
        </div>
        <div id="overlay-1"></div>
        <div id="overlay-2"></div>
    </div>
</template>

<script>
    export default {
        name: "Background",
        data() {
            return {
                currentImage: null,
                viewIn: true,
                viewOut: false,
            }
        },
        props: {
            image: String,
            paused: Boolean
        },
        watch: {
            image: function (newVal, oldVal) {
                this.update(newVal)
            },
            paused: function (newVal, oldVal) {
                console.log(newVal)
                this.playerPaused = newVal
            }
        },
        methods: {
            update(i) {
                const updateBackground = () => {
                    this.currentImage = i
                    this.viewIn = false
                    this.viewOut = false
                    setTimeout(showBackground, 2000)
                }

                const showBackground = () => {
                    this.viewIn = true
                }

                this.viewOut = true
                setTimeout(updateBackground, 2000)
            }
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

    #background {
        height: 100vh;
        background-size: cover;
        z-index: -1;
        background-position: 50% 50%;
        opacity: 0;
        overflow: hidden;
        transform: translateX(50px) scale(1.07, 1.07);
    }

    .in {
        opacity: 1 !important;
        transform: scale(1.12, 1.12) !important;
    }

    .out {
        transform: translateX(-50px) scale(1.07, 1.07) !important;
        opacity: 0 !important;
    }

    #overlay-1 {
        position: absolute;
        background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%);
        width: 100vw;
        height: 100vh;
        bottom: 0;
    }

    #overlay-2 {
        position: absolute;
        background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%);
        width: 100vw;
        height: 100vh;
        bottom: 0;
    }

    .paused {
        opacity: .2 !important;
        transform: scale(1, 1) !important;
        /*filter: blur(32px);*/
        /*-webkit-filter: blur(32px);*/
    }
</style>

<template>
    <div id="app">
        <div id="icon">
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
        </div>
        <slide-y-down-transition>
            <div v-show="show">
                <div id="background" v-bind:style="{ 'background-image': 'url(' + image + ')' }">

                    <div id="overlay-1"></div>
                    <div id="overlay-2"></div>

                    <div id="player">
                        <h3 id="now-playing">NOW PLAYING</h3>
                        <h2 id="artist">{{song_artist}}</h2>
                        <h1 id="track">{{song_title}}</h1>
                    </div>
                </div>
            </div>
        </slide-y-down-transition>
    </div>

</template>
<script>
    import initSpotify from "./spotify"
    import {SlideYDownTransition} from 'vue2-transitions'

    export default {
        name: 'app',
        components: {
            SlideYDownTransition
        },
        "data"() {
            return {
                song_title: '',
                song_artist: '',
                log: '',
                image: '',
                show: false
            }
        },
        methods: {
            update(title, artist, image) {
                this.show = false
                const thing = () => {
                    this.song_artist = artist
                    this.song_title = title
                    this.image = image
                    this.show = true
                }
                setTimeout(thing, 1000)
                // Create a new Promise and resolve after 2 seconds
                // and do the other stuff here...
            },
        },
        beforeMount() {
            window.setTimeout(() => {
                initSpotify()
                    .then(player => {
                        if (!player) console.warn("failed to init player")

                        // Playback status updates
                        player.addListener("player_state_changed", state => {
                            const currentTrack = state.track_window.current_track
                            if (currentTrack.name !== this.song_title || currentTrack.artists[0].name !== this.song_artist) {
                                this.update(currentTrack.name, currentTrack.artists[0].name, currentTrack.album.images[2].url)
                            }
                            // this.log = state.track_window.current_track
                            console.log(state)
                        })

                        // Error handling
                        player.addListener("authentication_error", this.errorHandler)
                        player.addListener("initialization_error", this.errorHandler)
                        player.addListener("account_error", this.errorHandler)
                        player.addListener("initialization_error", this.errorHandler)

                        this.$__player = player
                        this.error = undefined
                    })
                    .catch(e => console.warn(e))
            }, 5000)
        },
    }
</script>

<style>
    #app {
        font-family: 'Open Sans', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #fff;
        width: 100vw;
        height: 100vh;
    }

    #background {
        width: 100vw;
        height: 100vh;
        background-size: cover;
        position: absolute;
        z-index: -1;
        background-position: 100% 50%;
    }

    #player {
        position: absolute;
        z-index: 3;
        /*position: absolute;*/
        /*position: sticky;*/
        bottom: 60px;
        left: 60px;
    }

    #artist {
        font-size: 64px;
        font-weight: bold;
    }

    #track {
        font-size: 36px;
        font-weight: bold;
        padding-top: 18px;

    }

    #now-playing {
        font-size: 20px;
        font-weight: bolder;
        padding-bottom: 15px;
    }

    #overlay-1 {
        /*background: rgb(0,0,0);*/
        position: absolute;
        background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%);
        width: 100vw;
        height: 100vh;
    }

    #overlay-2 {
        /*background: rgb(0,0,0);*/
        z-index: 2;

        background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%);
        width: 100vw;
        height: 100vh;
    }

    #icon {
        position: absolute;
        z-index: 2;
        top: 60px;
        left: 60px;
    }

</style>

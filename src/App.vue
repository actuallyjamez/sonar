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
        <div id="background" :style="{ 'background-image': 'url(' + image + ')' }"
             :class="{ in: backgroundIn, out: backgroundOut, bezier: backgroundBezier }">
        </div>

        <div id="overlay-1"></div>
        <div id="overlay-2"></div>


        <Box :pose="playerVisible ? 'visible': 'hidden'">
            <div id="player">
                <Item>
                    <h3 id="now-playing">NOW PLAYING</h3>
                </Item>
                <Item>
                    <h2 id="artist">{{song_artist}}</h2>
                </Item>
                <Item>
                    <h1 id="track">{{song_title}}</h1>
                </Item>
            </div>
        </Box>
    </div>

</template>
<script>
    import initSpotify from "./spotify"
    import posed from 'vue-pose'

    export default {
        name: 'app',
        components: {
            Box: posed.div({
                visible: {
                    opacity: 1,
                    staggerChildren: 250,
                    beforeChildren: true,
                },
                hidden: {
                    opacity: 0,
                    // x: '-100%',
                }
            }),
            Item: posed.div({
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        ease: [0.655, 0.010, 0.115, 0.975],
                        duration: 1333
                    }
                },
                hidden: {
                    opacity: 0,
                    y: 40,
                    transition: {
                        ease: [0.655, 0.010, 0.115, 0.975],
                        duration: 1333
                    }
                }
            })
        },
        "data"() {
            return {
                song_title: '',
                song_artist: '',
                log: '',
                image: '',
                backgroundIn: false,
                backgroundOut: false,
                backgroundBezier: true,
                playerVisible: false
            }
        },
        methods: {
            update(title, artist, image) {
                const updateBackground = () => {
                    // this.backgroundBezier = false
                    this.backgroundIn = false
                    this.backgroundOut = false
                    this.backgroundBezier = true
                    this.playerVisible = false
                    setTimeout(showBackground, 2000)
                }

                const showBackground = () => {
                    this.image = image
                    this.backgroundIn = true
                    this.playerVisible = true
                }

                this.backgroundOut = true
                setTimeout(updateBackground, 2000)

                const thing = () => {
                    this.song_artist = artist
                    this.song_title = title
                    this.image = image
                    // this.playerVisible = true
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
                                let biggestImageWidth = 0
                                let biggestImageUrl = null
                                currentTrack.album.images.forEach((item) => {
                                    if (item.width > biggestImageWidth) {
                                        biggestImageWidth = item.width
                                        biggestImageUrl = item.url
                                    }
                                })

                                this.update(currentTrack.name, currentTrack.artists[0].name, biggestImageUrl)
                            }
                            // this.log = state.track_window.current_track
                            console.log(state)
                        })

                        // Error handling
                        player.addListener("authentication_error", this.errorHandler)
                        player.addListener("initialization_error", this.errorHandler)
                        player.addListener("account_error", this.errorHandler)
                        player.addListener("initialization_error", this.errorHandler)

                        // this.$__player = player
                        // this.error = undefined
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
        /*width: 100%;*/
        height: 100vh;
        background-size: cover;
        /*position: absolute;*/
        z-index: -1;
        background-position: 50% 50%;
        /*margin-right: 100px;*/
        opacity: 0;
        overflow: hidden;
        transform: translateX(50px) scale(1.1, 1.1);
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
        bottom: 0;
    }

    #overlay-2 {
        /*background: rgb(0,0,0);*/
        z-index: 1;
        position: absolute;
        background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%);
        width: 100vw;
        height: 100vh;
        bottom: 0;
    }

    #icon {
        position: absolute;
        z-index: 2;
        top: 60px;
        left: 60px;
    }


    body {
        padding: 0;
        margin: 0;
        background-color: black;
        position: relative;
        overflow: hidden;;
    }

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

    .in {
        opacity: 1 !important;
        transform: scale(1.12, 1.12) !important;
    }

    .out {
        transform: translateX(-50px) scale(1.1, 1.1) !important;
        opacity: 0 !important;
    }
</style>

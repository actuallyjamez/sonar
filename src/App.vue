<template>
    <div id="app">
        <div id="icon">
        <ProgressLogo  :progress="progress"></ProgressLogo>
        </div>
        <background :image="image" :paused="playerPaused"></background>
        <Player :title="song_title" :artist="song_artist" :image="image" :paused="playerPaused"></Player>
        <NextUp :title="next_song_title" :artist="next_song_artist"></NextUp>
        <Help :hidden="helpHidden"></Help>
    </div>
</template>
<script>
    import initSpotify from "./spotify"
    import ProgressLogo from "@/components/ProgressLogo"
    import background from "@/components/Background"
    import Player from "@/components/Player"
    import Help from "@/components/Help"
    import NextUp from "@/components/NextUp"

    export default {
        name: 'app',
        components: {
            ProgressLogo,
            background,
            Player,
            Help,
            NextUp
        },
        "data"() {
            return {
                song_title: '',
                song_artist: '',
                next_song_title: '',
                next_song_artist: '',
                image: '',
                playerPaused: true,
                progress: null,
                trackDuration: null,
                trackPostion: null,
                helpHidden: false

            }
        },
        methods: {
            update(title, artist, image) {
                this.helpHidden = true
                this.image = image
                this.song_artist = artist
                this.song_title = title
                document.title = `${artist} with ${title} through sonar`
            },
        },
        mounted() {
            setInterval(() => {
                if (!this.playerPaused && this.progress < 100)
                    this.trackPostion += 1000
                this.progress += 1
                this.progress = this.trackPostion / this.trackDuration
            }, 1000)
        },
        beforeMount() {
            window.setTimeout(() => {
                initSpotify()
                    .then(player => {
                        if (!player) console.warn("failed to init player")
                        player.addListener("player_state_changed", state => {
                            const currentTrack = state.track_window.current_track
                            const nextTrack = state.track_window.next_tracks
                            if (currentTrack.name !== this.song_title || currentTrack.artists[0].name !== this.song_artist) {
                                let biggestImageWidth = 0
                                let biggestImageUrl = null
                                currentTrack.album.images.forEach((item) => {
                                    if (item.width > biggestImageWidth) {
                                        biggestImageWidth = item.width
                                        biggestImageUrl = item.url
                                    }
                                })
                                this.update(currentTrack.name, currentTrack.artists[0].name, biggestImageUrl, this.playerPaused)
                            }
                            if (nextTrack.length !== 0) {
                                this.next_song_artist = nextTrack[0].artists[0].name
                                this.next_song_title = nextTrack[0].name
                            } else {
                                this.next_song_artist =''
                                this.next_song_title = ''
                            }
                            this.trackDuration = state.duration
                            this.trackPostion = state.position
                            this.progress = state.position / state.duration
                            this.playerPaused = state.paused
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
</style>

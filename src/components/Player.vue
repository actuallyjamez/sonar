<template>
    <div id="player-frame" class="bezier" :class="{ visible: playerFrameVisible }">
        <Box :pose="playerVisible ? 'visible': 'hidden'">
            <div id="player" style="display: flex;">
<!--                <div style="width: 200px; margin-right: 20px">-->
<!--                    <Item>-->
<!--                        <img style="width: 100%" :src="imageValue" alt="">-->
<!--                    </Item>-->
<!--                </div>-->
                <div style="flex-grow: 1; align-self: flex-end;">
                    <Item>
                        <h3 id="now-playing">{{paused ? 'PAUSED': 'NOW PLAYING'}}</h3>
                    </Item>
                    <Item>
                        <h2 id="artist">{{artistValue}}</h2>
                    </Item>
                    <Item>
                        <h1 id="track">with {{titleValue}}</h1>
                    </Item>
                </div>
            </div>
        </Box>
    </div>
</template>

<script>
    import posed from 'vue-pose'

    export default {
        name: "Player",
        data() {
            return {
                titleValue: '',
                artistValue: '',
                imageValue: '',
                playerFrameVisible: true,
                playerVisible: false
            }
        },
        components: {
            Box: posed.div({
                visible: {
                    opacity: 1,
                    staggerChildren: 250,
                    beforeChildren: true,
                },
                hidden: {
                    opacity: 0,

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
                }
            }),
        },
        props: {
            title: String,
            artist: String,
            image: String,
            paused: Boolean
        },
        watch: {
            title: function (newVal) {
                this.update(newVal, this.artist, this.image)
            },
            artist: function (newVal) {
                this.update(this.title, newVal, this.image)
            },
            image: function (newVal) {
                this.update(this.title, this.artist, newVal)
            }
        },
        methods: {
            update(title, artist, image) {
                const updatePlayer = () => {
                    // this.backgroundBezier = false
                    if (!this.playerFrameVisible) this.playerVisible = false
                    this.imageValue = image
                    this.titleValue = title
                    this.artistValue = artist
                    this.playerFrameVisible = true
                    setTimeout(showPlayer, 2000)
                }

                const showPlayer = () => {
                    this.playerVisible = true
                }

                this.playerFrameVisible = false
                setTimeout(updatePlayer, 2000)
            },
        },
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

    #player-frame {
        opacity: 0;
    }

    #player {
        position: absolute;
        z-index: 600;
        bottom: 60px;
        left: 60px;
    }

    #artist {
        font-size: 3.4em;
        font-weight: bold;
    }

    #track {
        font-size: 1.7em;
        font-weight: bold;
        padding-top: 18px;

    }

    #now-playing {
        font-size: 1em;
        font-weight: bolder;
        padding-bottom: 15px;
    }

    /*noinspection CssUnusedSymbol*/
    .visible {
        opacity: 1 !important;
    }
</style>

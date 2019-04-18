<template>
    <div id="container" class="bezier" :class="{ visible: visible }"></div>
</template>

<script>
    import * as ProgressBar from "progressbar.js"
    import BezierEasing from 'bezier-easing'

    export default {
        name: "ProgressLogo",
        components: {},
        data() {
            return {
                bar: null,
                animating: false,
                cache: null,
                currentCache: null,
                visible: false

            }
        },
        props: {
            progress: Number
        },
        watch: {
            progress: function (newVal) { // watch it
                if (this.animating) {
                    this.cache = newVal
            } else {
                    this.visible = true
                    this.updateProgress(newVal)
                }
            }
        },
        methods: {
            updateProgress(value) {
                this.bar.animate((value === 0) ? 0.01 : value, () => {
                    this.animating = false
                    if (this.cache !== this.currentCache) {
                        this.currentCache = this.cache
                        this.updateProgress(this.currentCache)
                    }
                })
            }
        },
        mounted() {
            this.bar = new ProgressBar.Circle(container, {
                strokeWidth: 15,
                easing: BezierEasing(0.655, 0.010, 0.115, 0.975),
                // easing: 'easeInOut',
                duration: 1400,
                color: '#fff',
                trailColor: '#282828',
                /* trailWidth: 1, */
                svgStyle: {
                    "stroke-linecap": "round",
                    'width': '64'
                }
            })
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

    #container {
        opacity: 0;
    }

    /*noinspection CssUnusedSymbol*/
    .visible {
        opacity: 1 !important;
    }
</style>

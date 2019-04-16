<template>
    <div id="container"></div>
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
                currentCache: null

            }
        },
        props: {
            progress: Number
        },
        watch: {
            progress: function (newVal, oldVal) { // watch it
                console.log('Prop changed: ', newVal, ' | was: ', oldVal)
                if (this.animating) {
                    this.cache = newVal
                } else {
                    this.updateProgress(newVal)
                }
            }
        },
        methods: {
            updateProgress(value) {
                this.animating = true
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
    /*#container {*/
    /*    width: 64px;*/
    /*}*/
</style>

import loadJS from "load-js"

const token = ''

let player = undefined
const initPlayer = () => {
    console.log(player)
    if (player) return Promise.resolve(player)
    player = new Spotify.Player({
        name: "Sonar",
        getOAuthToken: cb => {
            cb(token)
        }
    })

    // Error handling
    // player.addListener("initialization_error", ({ message }) => {
    //   console.error(message);
    //   return Promise.reject(message);
    // });
    // player.addListener("authentication_error", ({ message }) => {
    //   console.error(message);
    //   return Promise.reject(message);
    // });
    // player.addListener("account_error", ({ message }) => {
    //   console.error(message);
    //   return Promise.reject(message);
    // });
    // player.addListener("playback_error", ({ message }) => {
    //   console.error(message);
    //   return Promise.reject(message);
    // });

    // Ready
    player.addListener("ready", ({device_id}) => {
        console.log("Ready with Device ID", device_id)
        return Promise.resolve(player)
    })

    // Connect to the player!
    player.connect()
}

const initSpotify = function () {
    // Define callback
    window.onSpotifyWebPlaybackSDKReady = initPlayer
    return loadJS(["https://sdk.scdn.co/spotify-player.js"])
}

export default () => {
    return initSpotify()
        .then(() => {
            return initPlayer()
        })
        .catch(e => console.warn(e))
};

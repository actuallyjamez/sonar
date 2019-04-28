import loadJS from "load-js"

// Get the hash of the url
const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
        if (item) {
            const parts = item.split('=')
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;

const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = '58b89a14e594425eaa7f1ce3e16c57ed';
// const redirectUri = 'http://localhost:8080/';
const redirectUri = 'https://sonarapp.netlify.com';
const scopes = ["streaming", "user-read-birthdate", "user-read-email", "user-read-private"];

if (!_token) {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}

let player = undefined
const initPlayer = () => {
    // console.log(player)
    if (player) return Promise.resolve(player)
    player = new Spotify.Player({
        name: "Sonar App",
        getOAuthToken: cb => {
            cb(_token)
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
            const iframe = document.querySelector('iframe[src="https://sdk.scdn.co/embedded/index.html"]');

            if (iframe) {
                iframe.style.display = 'block';
                iframe.style.position = 'absolute';
                iframe.style.top = '-1000px';
                iframe.style.left = '-1000px';
            }
            return initPlayer()
        })
        .catch(e => console.warn(e))
};

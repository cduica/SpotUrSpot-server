import SpotifyWebApi from 'spotify-web-api-node'
import config from '../../../config.json';
import http from 'http'
import Spot from '../models/spot.model';

var scopes = ['user-read-private', 'user-read-email', 'user-modify-playback-state'],
    redirectUri = 'https://example.com/callback',
    clientId = '<put it here>',
    state = 'some-state-of-my-choice';


const spotifyApi = new SpotifyWebApi({
    clientId : config.SPOTIFY_CLIENT_ID,
    clientSecret : config.SPOTIFY_CLIENT_SECRET,
    redirectUri : 'http://www.example.com/callback'
});

var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

console.log(authorizeURL);
var code = '<get authorize code>'
spotifyApi.authorizationCodeGrant(code)
  .then(function(data) {
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);

    // Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
// var access_token;

refresh();
setInterval(function() {
  refresh();
}, 1800000)

function refresh() {
   spotifyApi.refreshAccessToken()
  .then(function(data) {
    console.log('The access token has been refreshed!');

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Could not refresh access token', err);
  });
}

function load(req, res, next, id) {
    Spot.get(id)
      .then((spot) => {
        req.spot = spot; // eslint-disable-line no-param-reassign
        return next();
      })
      .catch(e => next(e));
}

// // Retrieve an access token.
// spotifyApi.clientCredentialsGrant()
// .then(function(data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);

//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//     access_token = data.body['access_token'];
// }, function(err) {
//         console.log('Something went wrong when retrieving an access token', err);
// });

function getPlaylists(req, res){

    // Get a user's playlists
    spotifyApi.getUserPlaylists(config.SPOTIFY_USER)
    .then(function(data) {
        res.json(data.body);
    },function(err) {
        console.log('Something went wrong!', err);
    });
}

// function getTracks(req, res, next) {
//     spotifyApi.getPlaylistTracks('crisd54321', '5zm7OWXg8NsYqljv7G2cDT', { 'offset' : 1, 'limit' : 20, 'fields' : 'items' })
//     .then((data) => {
//         res.json(data.body);
//     }, function(err) {
//         console.log('Something went wrong!', err);
//     });
// }

function getTracks(req, res, next) {
    spotifyApi.play({'context_uri': 'spotify:album:0dAMC0nNikIjhD8LeRZfhH', offset: {"position": 9}}, 
    function(response) {
        console.log(response);
        res.send(200);
    })
}

function changePlaylist(req, res, next) {
    const spot = req.spot;
    spotifyApi.play({'context_uri': spot.playlistURL, offset: {"position": 0}}, 
    function(response) {
        console.log(response);
        res.send(200);
    });
}

export default {getPlaylists, getTracks, changePlaylist, load}


'use strict';

import React from 'react';


export default class PubMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null,
      pic: null
      // olat: null,
      // olng: null
    };
    window.lineCoords = [];
    window.markers = [];
    window.checkpointsLoaded = false; 
    window.colorGenerator = function () {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    window.count = 0;

    // edwin's attempt at players
    // object of arrays where player name is the key and lineCoords is the value
    window.players = {};
  }

  componentDidMount() {


    this.pubnubConnect();

    this.getCurrentLocation((ready) => {
      if (ready) {
        // one time map render on page ready
        this.renderMap();
      }
    });

    // watch for location changes
    setInterval(() => {
      this.getCurrentLocation();
    // }, 3000);
    }, 5000);
  }

  componentDidUpdate() {
    window.currentLocation = [this.state.lat, this.state.lng];
    // console.log(window.currentUser);
    // when current location in state changes, redraw map with path
    pubnub.publish({
      channel: pnChannel, 
      message: {
        player: window.currentUser,
        pic: window.currentUserPic,
        lat: this.state.lat,
        lng: this.state.lng, 
        markers: this.props.markers,
        race: this.props.raceName
      }
    });
  }

  renderMap() {
    let currLoc = {lat: this.state.lat, lng: this.state.lng};
    // let currLoc1 = {lat: this.state.olat, lng: this.state.olng};

    lineCoords.push(new google.maps.LatLng(this.state.lat, this.state.lng));
    // save map to window to be able to redraw as current location changes
    window.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: currLoc

    });
    window.marker = new google.maps.Marker({
      position: currLoc,
      icon: window.currentUserPic,
      map: map
    });
    marker.setAnimation(google.maps.Animation.BOUNCE);

    // marker1.setAnimation(google.maps.Animation.BOUNCE);
    // window.marker1 = new google.maps.Marker({
    //   position: currLoc1,
    //   map: map
    // });

  }

  getCurrentLocation(cb) {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition((location) => {
      this.setState({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });

      if (cb) {
        cb('Done fetching location, ready.');
      }
    }, (err) => {
      console.log('error occurred: ', err);
    }, options);
  }

  redrawMap(payload) {

    console.log(payload.message.race)
    console.log('payload ', payload.message.player);
    console.log('updating current location marker');
    let lat = payload.message.lat;
    let lineCoordinatesPath;
    let lng = payload.message.lng;
    let player = payload.message.player;
    let pic = payload.message.pic;
    let race = payload.message.race;

    if (payload.message.markers && !window.checkpointsLoaded) {
      let markersArr = this.generateMarkersArray(payload.message.markers);

      // clear out old checkpoint markers first
      if (window.markers.length) {
        while (markers.length) {
          markers[0].setMap(null);
          markers.shift();
        }
      }

      // add most recent search checkpoints
      markersArr.forEach((location, order) => {
        this.createMarker(location, order);
      });

      window.checkpointsLoaded = true;
    }


    // if there's is a new player add it to the list and create a new marker.
    if (race === this.props.raceName) {

      if (window.players[player] === undefined ) {
        window.players[player] = {lineCoords: [], userPic: pic};
        if (player !== window.currentUser && race === this.props.raceName) {
          window.players[player].color = window.colorGenerator();
          // trying to make player marker dynamic
          window.players[player].marker = new google.maps.Marker({
            position: {lat: this.state.lat, lng: this.state.lng},
            icon: pic,
            map: map
          });
          window.players[player].marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      } 

      (window.players[player].lineCoords).push(new google.maps.LatLng(lat, lng));
      console.log('tha players', players);
    }

    if (player === window.currentUser) {
      map.setCenter({lat: lat, lng: lng, alt: 0});
      marker.setPosition({lat: lat, lng: lng, alt: 0});
      lineCoordinatesPath = new google.maps.Polyline({
        // path: window.lineCoords,
        path: window.players[player].lineCoords,
        geodesic: true,
        strokeColor: '#2E10FF'
      });

    } else {

      if ( race === this.props.raceName ) {

        window.players[player].marker.setPosition({lat: lat, lng: lng, alt: 0});
        lineCoordinatesPath = new google.maps.Polyline({
          path: window.players[player].lineCoords,
          geodesic: true,
          strokeColor: window.players[player].color
        }); 

      }

    }


    if (player === window.currentUser) {
      lineCoordinatesPath.setMap(map);
    } else {
      if ( race === this.props.raceName) {
        lineCoordinatesPath.setMap(map);
      }
    }
  }

  createMarker(location, order) {
    order += 1;
    let contentString = `<p> Checkpoint ${order}</p>`;

    // create popup window to be shown on marker click
    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    let checkpointMarker = new google.maps.Marker({
      position: location,
      title: `Checkpoint ${order}`
    });

    checkpointMarker.addListener('click', () => {
      infoWindow.open(map, checkpointMarker);
    });

    checkpointMarker.setMap(map);
    window.markers.push(checkpointMarker);
  }

  generateMarkersArray(markers) {
    let markersArr = [];
    markers.start = JSON.parse(markers.start);
    markers.checkpoints = JSON.parse(markers.checkpoints);
    markers.finish = JSON.parse(markers.finish);

    // push start
    markersArr.push({lat: markers.start.Latitude, lng: markers.start.Longitude});

    // push all checkpoints
    markers.checkpoints.forEach((marker) => {
      marker = JSON.parse(marker);
      markersArr.push({lat: marker.Latitude, lng: marker.Longitude});
    });

    // push finish
    markersArr.push({lat: markers.finish.Latitude, lng: markers.finish.Longitude});

    return markersArr;
  }

  pubnubConnect() {
    window.pnChannel = 'map-channel';
    window.pubnub = new PubNub({
      // Han's key
      publishKey: 'pub-c-dd6d2deb-fd96-42f8-a675-e81b9f52d69f',
      subscribeKey: 'sub-c-b760f0c6-13ed-11e7-a9ec-0619f8945a4f'

      // One that was there originally 
      // publishKey: 'pub-c-1e471fcb-f49a-481a-84ae-32b4e950ffa8',
      // subscribeKey: 'sub-c-00a667ae-0a73-11e7-9734-02ee2ddab7fe'
    });
    pubnub.addListener({message: this.redrawMap.bind(this)});
  //   pubnub.addListener({
  //   status: function(statusEvent) {
  //     if (statusEvent.category === "PNConnectedCategory") {
  //       // play();
  //       // this.redrawMap.bind(this); // added this instead of play
  //       this.renderMap();// added this

  //     } else if (statusEvent.category === "PNUnknownCategory") {
  //       var newState = {
  //         new: 'error'
  //       };
  //       pubnub.setState(
  //         {
  //           state: newState 
  //         },
  //         function (status) {
  //           console.log(statusEvent.errorData.message)
  //         }
  //       );
  //     } 
  //   },
  //   message: function(message) {
  //     checkGameStatus(message);
  //     updateUI(message);
  //   }
  // });

    pubnub.subscribe({channels: [pnChannel]});
  }

  render() {
    return (
      <div id="map">
      </div>
    );
  }

}


'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
//if geolocation is allowed
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //get the latitude and the longitude
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      //set the map to the users location
      const coords = [latitude, longitude];
      //map is an object generated by leaflet
      var map = L.map('map').setView(coords, 13);
      //load the map via leaflet library that uses openstreet map
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
      //we don't use eventListener because leafled has its own build in function on
      map.on('click', function (mapEvent) {
        //we want to get the new latitude and longitude of the clicked position, they are stored in the latlng object
        const { lat, lng } = mapEvent.latlng;

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup('A pretty CSS popup.<br> Easily customizable.')
          .openPopup();
      });
    },
    function () {
      alert('Could not get position.');
    }
  );
}

const bounds =
    [
        [27.9, 40.7], // sol alt
        [30, 41.7] // sağ üst
    ];
const map = new maplibregl.Map({
    container: 'map', // container id
    style:
        'https://api.maptiler.com/maps/streets/style.json?key=aVIF46VV8VEMda1xrLgm',
    center: [28.979530, 41.015137], // starting position
    zoom: 9.5, // starting zoom
    maxBounds: bounds

});
map.addControl(
    new maplibregl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
       })

    );
map.addControl(new maplibregl.NavigationControl());

function updateClock() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://worldtimeapi.org/api/timezone/Europe/Istanbul");
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var response = JSON.parse(this.responseText);
            var currentTime = new Date(response.datetime);
            var hours = currentTime.getHours().toString().padStart(2, '0');
            var minutes = currentTime.getMinutes().toString().padStart(2, '0');
            var seconds = currentTime.getSeconds().toString().padStart(2, '0');
            var istanbulTime = hours + ":" + minutes + ":" + seconds;
            document.getElementById("time").textContent = istanbulTime;
        }
    };
    xhr.send();
}

updateClock();

setInterval(updateClock, 1000);


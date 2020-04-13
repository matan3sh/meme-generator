'use-strict';

const API_KEY = 'AIzaSyAu4wgjOGVqaz0cBDpsLy8EX2hp-uCh4lE';

function initMap() {
    let lat = 31.25181
    let lng = 34.7913
    return connectToGoogle()
        .then(() => map = new google.maps.Map($('#map').get(0), { center: { lat, lng }, zoom: 14 }))
}

function connectToGoogle() {
    let googleScript = document.createElement('script');
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    googleScript.async = true;
    document.body.append(googleScript);
    return new Promise((resolve, reject) => {
        googleScript.onload = resolve;
        googleScript.onerror = () => reject('Google script failed to load')
    })
}
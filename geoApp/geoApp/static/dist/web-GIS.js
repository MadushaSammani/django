// Change the zoom in and zoom out position
map.zoomControl.setPosition('topright');

// Add the scale bar
L.control.scale().addTo(map);

// Get the latitude and longitude of the mouse moving points
map.on('mousemove',function(e){
console.log(e);
// Round latitude and longitude values to four decimal places
const lat = e.latlng.lat.toFixed(4);
const lng = e.latlng.lng.toFixed(4);
// Update the HTML content with the rounded values
$('.coordinate').html(`Lat: ${lat} || Long: ${lng}`);
});

// Leaflet Search
var geocoder = L.Control.geocoder({
defaultMarkGeocode: true,
markGeocode: true
}).addTo(map);

// Zoom to layer
$('.zoom-to-layer').click(function(){
map.setView([38.1, -98],6)
});

// Full Screen
var mapId = document.getElementById('map');
function fullscreenview(){
    if(document.fullscreenElement){
        document.exitFullscreen()
    }else{
        mapId.requestFullscreen();
    }
    
}


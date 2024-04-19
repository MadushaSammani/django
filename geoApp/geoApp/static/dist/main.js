

var map = L.map('map', {
    center: [38.1, -98],
    zoom: 6,
    crs: L.CRS.EPSG3857
});

// Map Print
L.control.browserPrint({position:'topright'}).addTo(map);

var OSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const RI5M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_geoApp/wms", {
layers: 'OSM_geoApp:RI5M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RI5M"
});
const RI4M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_geoApp/wms", {
layers: 'OSM_geoApp:RI4M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RI4M"
});
const RI3M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_geoApp/wms", {
layers: 'OSM_geoApp:RI3M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RI3M"
});
const RI2M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_geoApp/wms", {
layers: 'OSM_geoApp:RI2M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RI2M"
});
const RI1M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_geoApp/wms", {
layers: 'OSM_geoApp:RI1M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RI1M"
});
const RD5M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_geoApp/wms", {
layers: 'OSM_geoApp:RD5M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RD5M"
});
const RD4M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_geoApp/wms", {
layers: 'OSM_geoApp:RD4M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RD4M"
});
const RD3M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_geoApp/wms", {
layers: 'OSM_geoApp:RD3M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RD3M"
});
const RD2M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_geoApp/wms", {
layers: 'OSM_geoApp:RD2M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RD2M"
});
const RD1M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_geoApp/wms", {
layers: 'OSM_geoApp:RD1_OSMV1',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RD1M"
});
const RT = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_geoApp/wms", {
layers: 'OSM_geoApp:RT',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RT"
});



// Define your basemaps
var baseMaps = {
    "OpenStreetMap": OSM,
};

var RImaps = {
    "RI1 Maps": L.layerGroup([RI1M]),
    "RI2 Maps": L.layerGroup([RI2M]),
    "RI3 Maps": L.layerGroup([RI3M]),
    "RI4 Maps": L.layerGroup([RI4M]),
    "RI5 Maps": L.layerGroup([RI5M]),
    "RD1 Maps": L.layerGroup([RD1M]),
    "RD2 Maps": L.layerGroup([RD2M]),
    "RD3 Maps": L.layerGroup([RD3M]),
    "RD4 Maps": L.layerGroup([RD4M]),
    "RD5 Maps": L.layerGroup([RD5M]),
};

// Add the first layer from RImaps to the map
Object.values(RImaps)[0].addTo(map);

// Define the GeoServer URL
var geoserverUrl = 'http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=OSM_geoApp:RD2M';


// Function to create a legend control for a layer
function addLegend() {
    var legendImg = '<img src="' + geoserverUrl + '" alt="Legend">';
    return legendImg;
}

// Rest of your code to initialize the map and layers ...

// Create a legend control
var legendControl = L.control({position: 'topleft'});

// Define what happens when the control is added to the map
legendControl.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML = addLegend(); // Call the addLegend function
    return div;
};

// Add the legend control to the map
legendControl.addTo(map);

var layerControl = L.control.layers(baseMaps, RImaps, { collapsed: false, position: 'topleft' }).addTo(map);

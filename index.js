const api = "at_w6kSXs6ci7EA0CEpfOS0w6VcdlusS";
const baseURL = "https://geo.ipify.org/api/v1?apiKey=at_w6kSXs6ci7EA0CEpfOS0w6VcdlusS"

const form = document.querySelector('form');
const ip = document.getElementById('current_ip');
const city = document.getElementById('current_town');
const tz = document.getElementById('current_zone');
const isp = document.getElementById('current_isp');

const defaultLatLng = L.latLng(48.853450342427564, 2.348776314097173);
const myMap = L.map("mapid",{
    center: defaultLatLng,
    zoom: 15,
    zoomControl: false,
})
const myIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [46,56],
    iconAnchor: [23,56],
})
L.control.zoom({position:"bottomleft"}).addTo(myMap)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mymap)

const findLoc = async query =>{
    const loc = await fetch(baseURL + query)
    const data = await loc.json()
    const position = L.latLng(data.location.lat, data.location.lng)

    myMap.panTo(position)
    L.marker(position,{icon:myIcon}).addTo(myMap)

    ip.innerText = data.ip
    city.innerText = data.location.city
    tz.innerText = "UTC " + data.location.timezone
    isp.innerText = data.isp
}

form.onsubmit = e =>{
    let query = ""
    e.preventDefault()
    query = "&domain=" + e.target[0].value + "&ipAddress=" + e.target[0].value
    fintLoc(query)
}

window.onload = findLoc("")
let selectors=()=>{
  let appSelectors = {
      mapDisplay: '#mapid',
      ipValue: '#ip',
      locationValue: '#city',
      timezoneValue: '#zone',
      ispValue: '#isp',
      searchBar: '#searchBar',
      searchBtn: '.btn'
  }

  return{
      appSelectors
  }
}



let displayMap=(lat, long)=>{

  var container = L.DomUtil.get('mapid');
      if(container != null){
      container._leaflet_id = null;
  }

  let map = L.map('mapid').setView([lat, long], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  let myIcon = L.icon({
      iconUrl: "../images/icon-location.svg",
      iconAnchor: [lat, long],
  });

  L.marker([lat, long]).addTo(map);   
}


let getIpDetails=(ip)=>{

  let key = 'at_w6kSXs6ci7EA0CEpfOS0w6VcdlusS';

  fetch(`https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${ip}`)
  .then(resp=>resp.json())
  .then(data=>{

      document.querySelector(selectors().appSelectors.ipValue).innerText = data.ip;
      document.querySelector(selectors().appSelectors.locationValue).innerText = `${data.location.city}, ${data.location.country}`;
      document.querySelector(selectors().appSelectors.timezoneValue).innerText = `UTC ${data.location.timezone}`;
      document.querySelector(selectors().appSelectors.ispValue).innerText = data.isp;
      displayMap(data.location.lat, data.location.lng)
  })
}

let getUserIpAddress=(()=>{
  fetch("https://api.ipify.org?format=json")
  .then(resp=>resp.json())
  .then(data=>{
      getIpDetails(data.ip)
  })
})()

let eventsHandlers=(()=>{
  let ipInput = document.querySelector(selectors().appSelectors.searchBar)
  let searchBtn = document.querySelector(selectors().appSelectors.searchBtn);

  ipInput.addEventListener('change', ()=>{
      getIpDetails(ipInput.value)
  })

  searchBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      getIpDetails(ipInput.value)
  })
})()


// Get request https://geo.ipify.org/api/v2/country,city?apiKey=at_HgPtCMxjCMQeaSPQjjphEqJPtm3zz&ipAddress=8.8.8.8

let object
function getLocation(inputIP) {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_HgPtCMxjCMQeaSPQjjphEqJPtm3zz&ipAdress=${inputIP}`)
        // .then(window.alert(inputIP))
        .then(response => response.json())
        .then(data => object = data) // Assign object
        .catch(error => alert("Error: " + error + "\nTry disabling your adblocker")) // Catch errors
        .then(() => document.getElementById("ipAddress").innerHTML = `${object.ip}`)
        .then(() => document.getElementById("location").innerHTML = `${object.location.country}, ${object.location.city}`)
        .then(() => document.getElementById("timezone").innerHTML = `UTC ${object.location.timezone}`)
        .then(() => document.getElementById("isp").innerHTML = `${object.isp}`)
        .then(() => {var lat = object.location.lat
            var lng = object.location.lng
            var map = L.map('map').setView([lat, lng], 13)
            // Add location marker svg
            var locMarker = L.divIcon({html: `<svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>`, className: "", iconSize: [46, 56]})
            // Add marker to map
            L.marker([lat, lng], { icon: locMarker }).addTo(map);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoiZmlsaXBuciIsImEiOiJja3d6OWpwcTcwNGhyMnFxbDI2MWp6NG9zIn0.OxDpaqSG-lO087eYXDpDOA'
        }).addTo(map);
        })
        // Create map
        
}

let inputIP // Define inputIP variable

// Add event listener to form and append the input to inputIP
document.querySelector(".formIP").addEventListener('submit', e => {
    inputIP = document.getElementById("inputIP").value // Store input ip into the variable
    e.preventDefault();
    alert(e.currentTarget.inputIP.value);
    document.getElementById("ipAddress").innerHTML = `${inputIP}`
    
    getLocation();
    
})

// Submit from on button
let myForm = document.querySelector(".formIP");
document.getElementById("btnSubmit").addEventListener('onclick', function() {
    myForm.submit() // Calls the form function
})

window.onload = getLocation
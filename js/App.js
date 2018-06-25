


var map;
/* API Google map */
function initMap() {
  var lyon = {lat: 45.750000, lng: 4.850000};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: lyon
  });

  initMarkers();

  if(sessionStorage) {
    if(sessionStorage.getItem('station')) {
      qs('.reservation').style.display = 'none';
      qs('#time_remaining').style.display = 'block';
      var cpt = new Timer ({
        secTime: sessionStorage.getItem('secTime'),
        minTime: sessionStorage.getItem('minTime'), 
        elmHtml: qs("#time_remaining"),
        name: sessionStorage.getItem('station'),
        callback: () => {
        },
      });
    }
  }

      
  // });

}

let diapo = new Slideshow("mySlides");

function initMarkers() {

  /**
   *  API JCDecaux 
   */
  
  /**
   *  creating an HTTP request
  */
  var position = new XMLHttpRequest();
  var url = "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=735de06c997408518dc4cd634de3470958e5aa92";
  // loading an object (event)
  position.onload = function () {
    // Turn the answer into an array of JavaScript objects
    var data = JSON.parse(this.responseText);
    // here the data are usable 
    console.log('retour : ', data);
    for (var i = 0; i < data.length; i++) {
      var lat = data[i].position.lat;
      var lng = data[i].position.lng;
      var stationInfos = {
        name : data[i].name,
        address : data[i].address,
        bike_stands : data[i].bike_stands,
        available_bikes : data[i].available_bikes,
        status : data[i].status,
      }
      var marker = new MarkerStation(map,lat,lng,stationInfos);     
    }
  };
  
  position.onerror = function (data) {
    console.log('Erreur ...');
  };
  position.open('GET', url, true);
  position.send(null);
};


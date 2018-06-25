    //use button and timer 
    var buttonElt = qs("#button");
    var minuteurElt = qs("#time_remaining");
    var button_cancellationElt = qs("#button_cancellation");
    var statutElt = qs(".reservation");

    //Station information
class MarkerStation {

  constructor(map,lat,lng,stationInfosObj) {
//stationInfosObj.{app.js (var stationInfos)}
    this.name = stationInfosObj.name;
    this.address = stationInfosObj.address;
    this.bike_stands = stationInfosObj.bike_stands;
    this.available_bikes =stationInfosObj.available_bikes;
    this.status = stationInfosObj.status;


    this.marker = new google.maps.Marker({
      position: {lat:lat , lng:lng },
      map: map,
    }); 
    
    // Zoom on the station
    var instructionElt = qs(".details_instruction");
    this.marker.addListener('click', () => {
    instructionElt.style.display="none";
	  map.setZoom(18);
	  map.setCenter(this.marker.getPosition());
    this.updateInfo();
    button_cancellationElt.style.display = "none";
    });

    //color of the markers according to the availability of the bike 
    if (this.available_bikes !== 0) {
      this.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
    }
    else {this.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
      };     
  }
     
  updateInfo() {


    // Adding information in the text box for each station
    qs(".details_name").textContent = this.name;
    qs(".details_address").textContent = "Adresse: " + this.address;
    qs(".details_stands").textContent = this.bike_stands + " place(s) disponible(s)" ;
    qs(".details_available").textContent = this.available_bikes + " Vélo'v disponible(s)";
    qs(".details_status").textContent = "Station : " + this.status;
    qs("#button").style.display = "block";
  
      
    // HTML5 Canvas Signature {canvas.js}
    var canvasElt = qs("#canvas");
    var canvas_allElt = qs(".canvas_all");
    var canvas_validationElt = qs(".canvas_validation");
    var canvas_cancellationElt = qs(".canvas_cancellation");
		
    
//changes of the appearance of buttons using CSS
    buttonElt.style.display="none";

      if ((this.available_bikes == 0) || (this.status == "CLOSE")) {
        buttonElt.style.display="none";
      } else { 
        buttonElt.style.display="block";
        buttonElt.onclick = () => {
          canvasElt.style.display = "block";
          canvas_allElt.style.display = "block";
          qs(".details_all").style.display = "none";
          buttonElt.style.display="none";               
        }

        
        canvas_validationElt.onclick = () => {
          statutElt.style.display= "none";
          minuteurElt.style.display = "block";
          button_cancellationElt.style.display = "block";
          canvasElt.style.display = "none";
          canvas_allElt.style.display = "none";
          qs(".details_all").style.display = "block";
          qs(".details_available").textContent = this.available_bikes-1 + " vélo'v disponible(s)";
          if(timerId) window.clearInterval(timerId);
          var cpt = new Timer ({
            secTime: 59,
            minTime: 19, 
            elmHtml: qs("#time_remaining"),
            name: this.name,
            callback: () => {
              //aplication vélo'v
              statutElt.style.display= "block";
              canvasElt.style.display= "none";
              canvas_allElt.style.display= "none";
              qs(".details_all").style.display = "block";
              qs(".details_available").textContent = this.available_bikes + " vélo'v disponible(s)";
              buttonElt.style.display="block";
              button_cancellationElt.style.display="none";
              console.log('end !!!!');
            },
              
          });
      }
    
        



        canvas_cancellationElt.onclick= () => {
          statutElt.style.display= "block";
          canvasElt.style.display= "none";
          canvas_allElt.style.display= "none";
          qs(".details_all").style.display = "block";
          qs(".details_available").textContent = this.available_bikes + " vélo'v disponible(s)";
          buttonElt.style.display="block";
          
          console.log('end !!!!');
          
          
          
        }


          
      }
  }



  

}


var timerId;
// timer for a reservation
class Timer {

	constructor(parametres,stationInfos){
// parametres.{elements from Markerstation.js (var cpt = new Timer)}
		this.secTime = parametres.secTime;
		this.minTime = parametres.minTime;
		this.elmHtml = parametres.elmHtml;
		this.callback = parametres.callback;
		this.name = parametres.name;
		
		this.loop();
	}

	updateView() {
		this.elmHtml.textContent = "Il vous reste " + this.minTime + " minute(s) et " + this.secTime + " seconde(s) avant expiration de votre réservation. ( Station " + this.name + " ).";
		sessionStorage.setItem("minTime", this.minTime);
		sessionStorage.setItem("secTime", this.secTime);
	}
  

	loop() {
    var buttonElt = qs("#button");
		var button_cancellationElt = qs("#button_cancellation");
		var storage;

		if(window.sessionStorage) {
			sessionStorage.setItem("station", this.name);
			sessionStorage.setItem("minTime", this.minTime);
			sessionStorage.setItem("secTime", this.secTime);
		}
		
		timerId = setInterval( () => {

			this.updateView()
		
		  --this.secTime;
			
			if ((this.minTime > 0) && (this.secTime ==0 )) {
				--this.minTime;	
				this.secTime = 59 ;                
			}
			if ((this.minTime == 0) && (this.secTime ==0 )) {
				this.elmHtml.style.display = "none";
				window.clearInterval(timerId);
				sessionStorage.clear();
				
				alert("Fin de la réservation");
				// callback from MarkerStation.js (var cpt = new Timer)
				this.callback(); 
				
			}
		
			
		
		// Cancellation of the reservation		  
		button_cancellationElt.onclick= () => {
			this.callback();
			button_cancellationElt.style.display = "none";
			window.clearInterval(timerId);
			this.elmHtml.style.display = "none";
			sessionStorage.clear();
		}


	}, 1000);
	}
}


  







/**
 * Slideshow - the Slideshow class
 */
class Slideshow {

    constructor(slidesClass) {

        this.index = 0;
        this.slides = qsa("."+slidesClass);
        this.buttonNext = qs(".next");
        this.buttonPrev = qs(".prev");
        this.autoplay();
        this.controls();    
    }

    /**
     * next - move to the next slide (add remove "active" class) 
     */
    next() {
        this.slides[this.index].classList.remove("active");
         //opérateur ternaire
        (this.index == this.slides.length-1) ? this.index = 0 : this.index++;

        this.slides[this.index].classList.add("active");
    }

     /**
     * previous - move to the previous slide (add remove "active" class) 
     */
    previous() {
        this.slides[this.index].classList.remove("active");
         //opérateur ternaire
        (this.index == this.slides.length-1) ? this.index = 0 : this.index++;

        this.slides[this.index].classList.add("active");
    }
    
    /**
     * Slideshow control
     */
  
    controls() {

      document.addEventListener('keydown', (event) => {

        const keyName = event.key;
        if(keyName == "ArrowRight") {
          this.next();
        };
        if(keyName == "ArrowLeft") {
          this.previous();
        };
       });


      this.buttonNext.addEventListener("click", () => {
        this.next();
      });

      this.buttonPrev.addEventListener("click", () => {
        this.previous();
      });
     
    }

    // change the images automatically every 5 seconds
    autoplay() {
      setInterval( () => {
        this.next();
       }, 5000);
       
    }
};

  
   

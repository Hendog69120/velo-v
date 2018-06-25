class CanvasSignature {

    constructor(){
        this.empty = true;
        this.mouseDown = false;
        this.canvas = document.getElementById("canvas");
        console.log(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.clear();
        
        if (!this.context) {
            alert("Failed to get canvas' 2d context");
        }

        this.lastX = -1;
        this.lastY = -1;

        this.canvas.addEventListener('mousedown', this.on_mousedown.bind(this), false);
        this.canvas.addEventListener('mousemove', this.on_mousemove.bind(this), false); 
        this.canvas.addEventListener('touchstart', this.on_touchstart.bind(this), false);
        this.canvas.addEventListener('touchmove', this.on_touchmove.bind(this), false); 

        this.canvas.addEventListener('touchend', ()=>{
            this.mouseDown = false;
            this.lastX = -1;
        }, false);
        this.canvas.addEventListener('mouseup', ()=>{
            this.mouseDown = false;
            this.lastX = -1;
        }, false);

        var clientX, clientY;
    }

    drawLine(x, y) {

        console.log(x,y);
        

        if (this.lastX == -1) {
            this.lastX = x;
            this.lastY = y;
        }

        this.context.strokeStyle = "#45505b";
        this.context.lineCap = "round";

        this.context.beginPath();

        this.context.moveTo(this.lastX, this.lastY);

        this.context.lineTo(x, y);

        this.context.lineWidth = 4;
        this.context.stroke();

        this.context.closePath();

        this.lastX = x;
        this.lastY = y;
    }


    on_mousedown(e) {
        e.preventDefault();
        e.stopPropagation();

        this.mouseDown = true;
        this.drawLine(e.offsetX, e.offsetY);
    }

    on_mousemove(e) {
        if (this.mouseDown == true) {
            this.drawLine(e.offsetX, e.offsetY);
        }
    }

    on_touchstart(e) {
        e.preventDefault();
        e.stopPropagation();

        this.mouseDown = true;
        this.drawLine(e.touches[0].clientX, e.touches[0].clientY);
    }

    on_touchmove(e) {
        if (this.mouseDown == true) {
            this.drawLine(e.touches[0].clientX, e.touches[0].clientY);
        }
    }
    
    clear() {
        var canvas_clearElt = qs(".canvas_clear");
            // clear
            canvas_clearElt.onclick = () => { 
                this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
                console.log(this.context);  
            }
        
    }

}

var sign = new CanvasSignature();

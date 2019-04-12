console.log("hello");

//put event listener on the map
//when clicked, get the mouse event
//and update the two form fields values
const themap = document.querySelector('[data-map-element]');
themap.addEventListener('click', mapClick);

const mapxelement = document.querySelector('[data-mapx]');
const mapyelement = document.querySelector('[data-mapy]');

const thestar = document.querySelector('[data-the-star]');

const removeStarButtron = document.querySelector('[data-remove-star]');

function getMouseData(event) {
    if(event) {
      this.x = event.clientX; 
      this.y = event.clientY; 
    } else {
      this.x = event.pageX; 
      this.y = event.pageY; 
    }
  }
  
  
  function mapClick(event) {
    var e = new getMouseData(event);
  
    var rect = this.getBoundingClientRect();
    // console.log(rect.top, rect.right, rect.bottom, rect.left);

    //on click,
    //grab the mapx and mapy fields
    //update them witht eh appropriate valeus
    // console.log("The mouse event data is ", e);
    // console.log("The offset of the map is", themap.offsetTop);
    
    // console.log(this.offsetTop); //from the top of the page
    // console.log(this.offsetLeft);  //0
    
    let mapx = e.x - rect.left;
    let mapy = e.y - rect.top;

    //validity check:
    if ((mapx < 0) || (mapx > 540)) {
        mapx = 0;
    }
    if ((mapy < 0) || (mapy > 580)) {
        mapy = 0;
    }
    
    console.log(`the mapx x is ${mapx} and the mapy is ${mapy}`);
    //set the form values:
    mapxelement.value = mapx;
    mapyelement.value = mapy;

    //make the star visible

    //and compensate for the size of the start 31x31
    thestar.style.top = `${mapy + 31}px`; 
    thestar.style.left = `${mapx }px`;
    thestar.classList.remove('hidden');
    }
  
    
  
  
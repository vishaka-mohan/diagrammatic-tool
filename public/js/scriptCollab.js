var canvas = new fabric.Canvas('c');
const socket = io();
let isLoadedFromJson = false;
let w=1500, h=600;
//var _clipboard = null;

socket.on('connection');


function emitEvent() {
    let aux = canvas;
    let json = aux.toJSON();
    let data = {
        w: w,
        h: h,
        data: json
    };
    socket.emit('drawing', data);
}




//RECTANGLE
function addRect(){
    var rect = new fabric.Rect({
        left: 100,
        top: 150,
        fill: '',
        stroke: 'black',
        strokeWidth: 1,
        width: 200,
        height: 100
    });
    canvas.add(rect);
}


//CIRCLE
function addCircle(){
    var circle = new fabric.Circle({
        radius: 15,
        fill: '',
        stroke:'black',
        strokeWidth: 1,
        left: 100,
        top: 100
    });
    canvas.add(circle);
}
 

//LINE
function addLine(){
    var line = new fabric.Line([50,100,50,200],{
        left: 170,
        top: 150,
        stroke: 'black',
        strokeWidth: 1,
    });
    canvas.add(line);
}



//ELLIPSE
function addEllipse(){
    var ellipse = new fabric.Ellipse({
        rx: 80,
        ry: 40,
        fill: '',
        stroke: 'black',
        strokeWidth: 1,
        
    });

    canvas.add(ellipse);
}




//POLYLINE - POLYGON WITHOUT FILL COLOR
function addPentagon(){

    var pentagon = new fabric.Polyline([{
        x: 200,
        y: 10
    }, {
        x: 250,
        y: 50
    }, {
        x: 250,
        y: 110
    }, {
        x: 150,
        y: 110
    }, {
        x: 150,
        y: 50
    }, {
        x: 200,
        y: 10
    }], {
        fill: '',
        stroke: 'black',
        strokeWidth: 1,
    });

    
    canvas.add(pentagon);
}


//TRIANGLE
function addTriangle(){

    var triangle = new fabric.Triangle({
            width: 150,
            height: 100,
            fill: '',
            stroke: 'black',
            strokeWidth: 1,
            cornerColor: 'blue',
            angle: 0,
    });

    
    canvas.add(triangle);
    canvas.centerObject(triangle);

}


//ARROW

function addArrow(){

    var fromx = 100, fromy = 100;
    var tox = 100, toy = 200;
    var angle = Math.atan2(toy - fromy, tox - fromx);

    var headlen = 3;  // arrow head size

    // bring the line end back some to account for arrow head.
    tox = tox - (headlen) * Math.cos(angle);
    toy = toy - (headlen) * Math.sin(angle);

    // calculate the points.
    var points = [
        {
            x: fromx,  // start point
            y: fromy
        }, {
            x: fromx - (headlen / 4) * Math.cos(angle - Math.PI / 2), 
            y: fromy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
        },{
            x: tox - (headlen / 4) * Math.cos(angle - Math.PI / 2), 
            y: toy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
        }, {
            x: tox - (headlen) * Math.cos(angle - Math.PI / 2),
            y: toy - (headlen) * Math.sin(angle - Math.PI / 2)
        },{
            x: tox + (headlen) * Math.cos(angle),  // tip
            y: toy + (headlen) * Math.sin(angle)
        }, {
            x: tox - (headlen) * Math.cos(angle + Math.PI / 2),
            y: toy - (headlen) * Math.sin(angle + Math.PI / 2)
        }, {
            x: tox - (headlen / 4) * Math.cos(angle + Math.PI / 2),
            y: toy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
        }, {
            x: fromx - (headlen / 4) * Math.cos(angle + Math.PI / 2),
            y: fromy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
        },{
            x: fromx,
            y: fromy
        }
    ];
    var arrow = new fabric.Polygon(points, {
                stroke: 'black',
                strokeWidth: 1,
        });
    canvas.add(arrow);

}


//ROUNDED RECTANGLE
function addRoundRect(){

    var rect1 = new fabric.Rect({
        left: 10,
        top: 10,
        width: 100,
        height: 100,
        fill: '',
        stroke:'black',
        strokeWidth: 1,
        rx: 20,
        ry: 20,
        objectCaching: false,
    })

    rect1.on('scaling', function() {
        this.set({
            width: this.width * this.scaleX,
            height: this.height * this.scaleY,
            scaleX: 1,
            scaleY: 1
        })
    })

    canvas.add(rect1);
}


//SQUARE
function addSquare(){
    var square = new fabric.Rect({
        left: 100,
        top: 150,
        fill: '',
        stroke:'black',
        strokeWidth: 1,
        width: 100,
        height: 100
    });
    canvas.add(square);
}


//RIGHT TRIANGLE
function addRightTriangle(){

    var rtriangle = new fabric.Polygon([
        { x: 100, y: 200 },
        { x: 100, y: 300 },
        { x: 200, y: 300},
        
        ], {
            fill: '',
            stroke:'black',
            strokeWidth: 1,
    });
    canvas.add(rtriangle);
    
    canvas.centerObject(rtriangle);
}



//parallelogram
function addParallelogram(){

    var parallelogram = new fabric.Polygon([
        { x: 50, y: 50 },
        { x: 100, y: 50 },
        { x: 80, y: 100},
        { x: 30, y: 100},
        ], {
            fill: '',
            stroke:'black',
            strokeWidth: 1,
    });
    canvas.add(parallelogram);
}



//diamond
function addDiamond(){
    var diamond = new fabric.Polygon([
        {x: 100, y: 100},
        {x : 50, y: 150 },
        {x: 100, y: 200},
        {x: 150, y: 150},
        

    ], {
        fill: '',
        stroke:'black',
        strokeWidth: 1,
    });

    canvas.add(diamond);
}

//Double triangle
function addDoubleTriangle(){
    var diamond1 = new fabric.Polygon([
        {x: 100, y: 100},
        {x : 50, y: 150 },
        {x: 100, y: 200},
        {x: 150, y: 150},
        {x: 50, y: 150},
        {x: 100, y: 100},
        {x: 50, y: 150},
        

    ], {
        fill: '',
        stroke:'black',
        strokeWidth: 1,
    });

    canvas.add(diamond1);
}


//octagon
function addOctagon(){
    var size = 150;
    var side = Math.round((size * Math.sqrt(2)) / (2 + Math.sqrt(2)));
    var octagon = new fabric.Polygon([
        {x:-side / 2, y:size / 2},
        {x:side / 2, y:size / 2},
        {x:size / 2, y:side / 2},
        {x:size / 2, y:-side / 2},
        {x:side / 2, y:-size / 2},
        {x:-side / 2, y:-size / 2},
        {x:-size / 2, y:-side / 2},
        {x:-size / 2, y:side / 2}], {
            stroke: 'black',
            fill:'',
            left: 10,
            top: 10,
            strokeWidth: 1,
            strokeLineJoin: 'bevil'
    },false);
    canvas.add(octagon);
}


//hexagon
function addHexagon(){
    var hexagon = new fabric.Polygon([
        {x: 200, y: 200},
        {x: 300, y: 200},
        {x: 340, y: 250},
        {x: 300, y: 300},
        {x: 200, y: 300},
        {x: 160, y: 250} ], {
            
            fill: '',
            stroke:'black',
            strokeWidth:1
        }
    );
    canvas.add(hexagon);
}


//trapezium
function addTrapezium(){
    var trapezium = new fabric.Polygon([
        {x: 300, y: 300},
        {x: 380, y: 300},
        {x: 420, y: 400},
        {x: 260, y: 400},
        ], {
            
            fill: '',
            stroke:'black',
            strokeWidth:1
        }
    );
    canvas.add(trapezium);
}

//ROUNDED RECTANGLE 1
function addRoundRect1(){

    var rect2 = new fabric.Rect({
        left: 10,
        top: 10,
        width: 200,
        height: 100,
        fill: '',
        stroke:'black',
        strokeWidth: 1,
        rx: 50,
        ry: 50,
        objectCaching: false,
    })

    rect2.on('scaling', function() {
        this.set({
            width: this.width * this.scaleX,
            height: this.height * this.scaleY,
            scaleX: 1,
            scaleY: 1
        })
    })

    canvas.add(rect2);
}


//Star
function addStar() {
    var spikeCount = 5,
        outerRadius = 50,
        innerRadius = 25;
    var rot = Math.PI / 2 * 3;
    var cx = outerRadius;
    var cy = outerRadius;
    var sweep = Math.PI / spikeCount;
    var points = [];
    var angle = 0;
  
    for (var i = 0; i < spikeCount; i++) {
      var x = cx + Math.cos(angle) * outerRadius;
      var y = cy + Math.sin(angle) * outerRadius;
      points.push({x: x, y: y});
      angle += sweep;
  
      x = cx + Math.cos(angle) * innerRadius;
      y = cy + Math.sin(angle) * innerRadius;
      points.push({x: x, y: y});
      angle += sweep
    }
    var star = new fabric.Polygon(points, {
        fill: '',
        stroke: 'black',
        left: 100,
        top: 10,
        strokeWidth: 1,
        strokeLineJoin: 'bevil'
      },false);
      canvas.add(star);
  }


//DELETE

$('html').keyup(function(e){
        if(e.keyCode == 46) {
            deleteSelectedObjectsFromCanvas();
        }
}); 

function deleteSelectedObjectsFromCanvas(){
    var selection = canvas.getActiveObject();
    if (selection.type === 'activeSelection') {
        selection.forEachObject(function(element) {
            console.log(element);
            canvas.remove(element);
        });
    }
    else{
        canvas.remove(selection);
    }
    canvas.discardActiveObject();
    canvas.requestRenderAll();
}


//Text
fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.padding = 5;

 
var $ = function(id){return document.getElementById(id)};



  canvas.setHeight(300);
    canvas.setWidth(500);


function Addtext() { 
    canvas.add(new fabric.IText('Type here', { 
    left: 50,
    top: 100,
    fontFamily: 'arial',
    fill: '#333',
        fontSize: 14
    }));
}

function AddComment() { 
    canvas.add(new fabric.IText('Add Note', { 
    left: 50,
    top: 100,
    fontFamily: 'arial',
    fill: '#000',
        fontSize: 18
    }));
}


function changeColor(){
    console.log(document.querySelector('#color').value);
    canvas.getActiveObject().set("fill", document.querySelector('#color').value);
    canvas.renderAll();
}


//CUT COPY PASTE


var _clipboard;
function Copy() {
	
	canvas.getActiveObject().clone(function(cloned) {
		_clipboard = cloned;
	});
}

function Paste() {
	// clone again, so you can do multiple copies.
	_clipboard.clone(function(clonedObj) {
		canvas.discardActiveObject();
		clonedObj.set({
			left: clonedObj.left + 10,
			top: clonedObj.top + 10,
			evented: true,
		});
		if (clonedObj.type === 'activeSelection') {
			// active selection needs a reference to the canvas.
			clonedObj.canvas = canvas;
			clonedObj.forEachObject(function(obj) {
				canvas.add(obj);
			});
			// this should solve the unselectability
			clonedObj.setCoords();
		} else {
			canvas.add(clonedObj);
		}
		_clipboard.top += 20;
		_clipboard.left += 20;
		canvas.setActiveObject(clonedObj);
		canvas.requestRenderAll();
	});
}


function Cut() {
	
	canvas.getActiveObject().clone(function(cloned) {
		_clipboard = cloned;
	});
    deleteSelectedObjectsFromCanvas();

}



//EVENT LISTENER FOR CTRL+X,V,C
function createListenersKeyboard() {
    document.onkeydown = onKeyDownHandler;
    //document.onkeyup = onKeyUpHandler;
}

function onKeyDownHandler(event) {
    //event.preventDefault();
    var key;
    if(window.event){
        key = window.event.keyCode;
    }
    else{
        key = event.keyCode;
    }
    
    switch(key){
        // Shortcuts
        case 67: // Ctrl+C
                if(event.ctrlKey){
                    event.preventDefault();
                    Copy();
                }
            break;
        // Paste (Ctrl+V)
        case 86: // Ctrl+V
                if(event.ctrlKey){
                    event.preventDefault();
                    Paste();
                }
            break;

        case 88:

            if(event.ctrlKey){
                event.preventDefault();
                Cut();
            }

            break;
            
        default:
            // TODO
            break;
    }
}

let json;

//SAVE WORKSPACE
function saveWorkspace(){
    jsonToSave = canvas.toJSON();
    console.log("save function");
    console.log(jsonToSave);
    

    $.ajax({
        url: "/workspace/:id",
        type: "POST",
        
        data: JSON.stringify(jsonToSave),
        //dataType: "json",
        //contentType: "application/json",
        
        

        success: function(data) {
            console.log('success');
          
            console.log(JSON.stringify(data));
       },

        error: function() {
          console.log('process error');
          console.log(jsonToSave);
        },
      });
}

function saveExistingWorkspace(){
    jsonToSave = canvas.toJSON();
    console.log("save existing function");
    console.log(jsonToSave);
    

    $.ajax({
        url: "/workspace/:id/:docName/collab",
        type: "POST",
        
        data: JSON.stringify(jsonToSave),
        //dataType: "json",
        //contentType: "application/json",
        
        

        success: function(data) {
            console.log('success');
          
            console.log(JSON.stringify(data));
       },

        error: function() {
          console.log('process error');
          console.log(jsonToSave);
        },
      });
}



//SHOW WORKSPACE
function showWorkspace(json){

    console.log("showing");
    console.log(json);
    canvas.loadFromJSON(json, CallBack, function(o, object) {
        canvas.setActiveObject(object);
    });
    
    
}


function CallBack() {
    canvas.renderAll();
    canvas.calcOffset();
}






  function  init() {

    canvas.renderAll();

    canvas.on('after:render', function() {
        if (! isLoadedFromJson) {
            emitEvent();
        }
        isLoadedFromJson = false;
        console.log(canvas.toJSON());
    });

    //canvas.renderAll();

    //Sockets
    socket.emit('ready', "Page loaded");

    socket.on('drawing', function (obj) {
        //set this flag, to disable infinite rendering loop
        isLoadedFromJson = true;

        //calculate ratio by dividing this canvas width to sender canvas width
        let ratio = w / obj.w;

        //reposition and rescale each sent canvas object
        obj.data.objects.forEach(function(object) {
            object.left *= ratio;
            object.scaleX *= ratio;
            object.top *= ratio;
            object.scaleY *= ratio;
        });

        canvas.loadFromJSON(obj.data);
    });

    

    
    

    createListenersKeyboard();
    
    
  }



    
  



var drawing=[];
var currentPath=[];
var database;
var button;
function setup() {
  button=createButton("clear");
  button.position(350,450);
  canvas=createCanvas(400, 400);
  database=firebase.database();
  canvas.mousePressed(startPath);
  //canvas.mousereleased(endPath);
}
function readValue(data){
drawing=data.val();
}
function startPath(){
    currentPath=[];
    drawing.push(currentPath);    
    console.log(drawing);
    database.ref('/').update({
      "drawing":drawing

    })

}
function endPath(){
  //currentPath=[];
    //drawing.push(currentPath); 

    database.ref('/').set({
      "drawing":""

    });
    
  listener=database.ref("drawing");
  listener.on("value",readValue);
  
  //  drawing.push(currentpath);
}
function draw() {
    background(0);  
      //if(mousePressed===button){
      //  endPath();
     // }
     button.mousePressed(()=>{
       endPath();
     });
    if(mouseIsPressed){
    
        var point={
            x:mouseX,
            y:mouseY
        }
        currentPath.push(point);
        }


stroke(255);
strokeWeight(4);
noFill();

for (var i=0;i<drawing.length;i++){
  beginShape();
    var path=drawing[i];

    for(var j=0;j<path.length;j++){
     vertex(path[j].x,path[j].y)
}   

endShape();   
}
}
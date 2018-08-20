// Rover Object Goes Here
// ======================
var Sojourner = {
  direccion: "N",
  x: 0,
  y: 0,
  travelLog: ["( 0 , 0 )"],
  befX: 0,
  befY: 0,
  marca: "S",
  name: "Sojourner"
}

var Opportunity = {
  direccion: "N",
  x: 1,
  y: 1,
  travelLog: ["( 0 , 0 )"],
  befX: 1,
  befY: 1,
  marca: "O",
  name: "Opportunity"
}

var Curiosity = {
  direccion: "N",
  x: 2,
  y: 2,
  travelLog: ["( 0 , 0 )"],
  befX: 2,
  befY: 2,
  marca: "C",
  name: "Curiosity"
}

var rovers= [Sojourner, Opportunity, Curiosity];
var jugadorID = 0;


// ======================

var board = [ 
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '] ];
  
generarJugadores();
var obstaculos= [];
generarObstaculos(5); //almacena los obstáculos

mostrarTablero();

function generarJugadores() {
  for(kontador=0;kontador<rovers.length;kontador++){
    board[rovers[kontador].y][rovers[kontador].x] = rovers[kontador].marca;
  }
}

function generarObstaculos(numObst){
  for(i=0; i<numObst;i++){
    //Generando obstáculos
    randomCoords: while(true){
      var randCoordX=Math.floor(Math.random()*9); 
      var randCoordY=Math.floor(Math.random()*9);
      for (contador=0;contador<rovers.length;contador++){
        if(randCoordX==rovers[contador].x) { 
          if (randCoordY==rovers[contador].y) {continue randomCoords; }
         } //Verifica que el obstáculo no esté sobre el jugador
      }
      for(j=0;j<(obstaculos.length/2);j+=2){
        if(randCoordX==obstaculos[j] & randCoordY ==obstaculos[j+1]) { //Revisa que no se repitan obstáculos
          continue randomCoords;
        }
      }
      break; 
    }
    board[randCoordY][randCoordX] = '#'; //Representando gráficamente al obstáculo
    obstaculos.push(randCoordX,randCoordY); //Almacenando coordenadas de los obstáculos (cada par de números representa X,Y)
  }
}

function mostrarTablero() {
  console.log(board.join("\n")+"\n\n"); //Muestra el tablero inicial
  console.log("Turno del jugador: "+ rovers[jugadorID].name);
  console.log("Dirección del rover: " + rovers[jugadorID].direccion);
}

function turnLeft(){
  //Iteracion para el cambio de direción
  if(rovers[jugadorID].direccion =="N"){rovers[jugadorID].direccion="W";}
  else if(rovers[jugadorID].direccion =="W"){rovers[jugadorID].direccion="S";}
  else if(rovers[jugadorID].direccion =="S"){rovers[jugadorID].direccion="E";}
  else if(rovers[jugadorID].direccion =="E"){rovers[jugadorID].direccion="N";}
}

function turnRight(){
  //Iteracion para el cambio de direcion
  if(rovers[jugadorID].direccion =="N"){rovers[jugadorID].direccion="E";}
  else if(rovers[jugadorID].direccion =="W"){rovers[jugadorID].direccion="N";}
  else if(rovers[jugadorID].direccion =="S"){rovers[jugadorID].direccion="W";}
  else if(rovers[jugadorID].direccion =="E"){rovers[jugadorID].direccion="S";}
}

function moveForward(){
  rovers[jugadorID].befX= rovers[jugadorID].x; //Almacena las coordenadas antes de avanzar
  rovers[jugadorID].befY = rovers[jugadorID].y; //Almacena las coordenadas antes de avanzar
  console.log("antesX: "+rovers[jugadorID].befX);
  console.log("antesY: "+rovers[jugadorID].befY);
  //Iteración para avanzar
  if(rovers[jugadorID].direccion =="N"){rovers[jugadorID].y--;}
  else if(rovers[jugadorID].direccion =="W"){rovers[jugadorID].x--;}
  else if(rovers[jugadorID].direccion =="S"){rovers[jugadorID].y++;}
  else if(rovers[jugadorID].direccion =="E"){rovers[jugadorID].x++;}

  //Movimiento del rover
  Movimiento();
}

function moveBackward(){   
  rovers[jugadorID].befX = rovers[jugadorID].x; //Almacena las coordenadas antes de avanzar
  rovers[jugadorID].befY = rovers[jugadorID].y; //Almacena las coordenadas antes de avanzar
  
  //Iteración para retroceder
  if(rovers[jugadorID].direccion =="N"){rovers[jugadorID].y++;}
  else if(rovers[jugadorID].direccion =="W"){rovers[jugadorID].x++;}
  else if(rovers[jugadorID].direccion =="S"){rovers[jugadorID].y--;}
  else if(rovers[jugadorID].direccion =="E"){rovers[jugadorID].x--;}
  
  //Movimiento del rover
  Movimiento();
}

function comandos(cadenaComandos) {
  for (var m = 0; m < cadenaComandos.length; m++) {
    //Escoger caso según letra en la posición i de la cadena
    switch (cadenaComandos[m]) {
      
      case "f":
        moveForward(rovers[jugadorID]);
      break;

      case "l":
        turnLeft(rovers[jugadorID]);
      break;
      
      case "r":
        turnRight(rovers[jugadorID]);
      break;
      
      case "b":
        moveBackward(rovers[jugadorID]);
      break;
      
      default:
      break;
    }        
  }
  jugadorID++;
  if (jugadorID>=3) { jugadorID=0; }
  clear();
  mostrarTablero();
}

function limites() {
  if(rovers[jugadorID].x<0){ 
    rovers[jugadorID].x=0; 
  }  
  else if(rovers[jugadorID].x>9){ 
    rovers[jugadorID].x=9; 
  }  else{}
  if(rovers[jugadorID].y<0){ 
    rovers[jugadorID].y=0; 
  }
  else if(rovers[jugadorID].y>9){ 
    rovers[jugadorID].y=9; 
  } else {}
}

function hayObstaculo() {
  console.log("despX: "+rovers[jugadorID].x);
  console.log("despY: "+rovers[jugadorID].y);
  var kont=0;
  for(kont=0; kont<(obstaculos.length); kont+=2){
    if (rovers[jugadorID].x == obstaculos[kont]) {
      console.log("x entra");
      if(rovers[jugadorID].y == obstaculos[(kont+1)]) { //Revisa si el rover coincide con algún obstáculo
      rovers[jugadorID].x=rovers[jugadorID].befX;
      rovers[jugadorID].y=rovers[jugadorID].befY;
      console.log("Haz chocado contra un obstáculo");
      }
    }
  }
}

function Movimiento () {

  //Validar que no se escape del tablero
  limites();

  //Validar que no esté en un obstáculo
  hayObstaculo();

  //Movimiento en el tablero
  board[rovers[jugadorID].befY][rovers[jugadorID].befX] = ' ';//Elimina el rover anterior 
  board[rovers[jugadorID].y][rovers[jugadorID].x] = rovers[jugadorID].marca; //Coloca el rover en la posición actual
 // console.log(board.join("\n")); //imprime en pantalla el tablero actual

  //logear posición del rover
  rovers[jugadorID].travelLog.push("( "+ rovers[jugadorID].x +" , " + rovers[jugadorID].y +" )");
}
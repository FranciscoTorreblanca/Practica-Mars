// Rover Object Goes Here
// ======================
var rover = {
  direccion: "N",
  x: 0,
  y: 0,
  travelLog: ["( 0 , 0 )"],
  befX: 0,
  befY: 0
}
// ======================

var board = [ 
  ['X',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '] ];
  
  var obstaculos= generarObstaculos(5);
  
console.log(board.join("\n")+"\n\n"); //Muestra el tablero inicial

function generarObstaculos(numObst){
  var obstaculos=[]; //Almacena las coordenadas donde estarán los obstáculos
  for(i=0; i<numObst;i++){
    //Generando obstáculos
    randomCoords: while(true){
      var coordX=Math.floor(Math.random()*9); 
      var coordY=Math.floor(Math.random()*9);
      if(coordX==0 & coordY==0) { continue randomCoords; } //Verifica que el obstáculo no esté en (0,0)
      for(j=0;j<(obstaculos.length/2);j+=2){
        if(coordX==obstaculos[j] & coordY ==obstaculos[j+1]) { //Revisa que no se repitan obstáculos
          continue randomCoords;
        }
      }
      break; 
    }
    board[coordY][coordX] = '0'; //Representando gráficamente al obstáculo
    obstaculos.push(coordX,coordY); //Almacenando coordenadas de los obstáculos (cada par de números representa X,Y)
  }
  console.log(obstaculos);
  return obstaculos;
}

function turnLeft(rover){
  //Iteracion para el cambio de direción
  if(rover.direccion =="N"){rover.direccion="W";}
  else if(rover.direccion =="W"){rover.direccion="S";}
  else if(rover.direccion =="S"){rover.direccion="E";}
  else if(rover.direccion =="E"){rover.direccion="N";}
}

function turnRight(rover){
  //Iteracion para el cambio de direcion
  if(rover.direccion =="N"){rover.direccion="E";}
  else if(rover.direccion =="W"){rover.direccion="N";}
  else if(rover.direccion =="S"){rover.direccion="W";}
  else if(rover.direccion =="E"){rover.direccion="S";}
}

function moveForward(rover){
  rover.befX= rover.x; //Almacena las coordenadas antes de avanzar
  rover.befY = rover.y; //Almacena las coordenadas antes de avanzar
  
  //Iteración para avanzar
  if(rover.direccion =="N"){rover.y--;}
  else if(rover.direccion =="W"){rover.x--;}
  else if(rover.direccion =="S"){rover.y++;}
  else if(rover.direccion =="E"){rover.x++;}
  
  //Movimiento del rover
  Movimiento(rover);
}

function moveBackward(rover){   
  rover.befX = rover.x; //Almacena las coordenadas antes de avanzar
  rover.befY = rover.y; //Almacena las coordenadas antes de avanzar
  
  //Iteración para retroceder
  if(rover.direccion =="N"){rover.y++;}
  else if(rover.direccion =="W"){rover.x++;}
  else if(rover.direccion =="S"){rover.y--;}
  else if(rover.direccion =="E"){rover.x--;}
  
  //Movimiento del rover
  Movimiento(rover);
}

function comandos(cadenaComandos) {
  for (m = 0; m < cadenaComandos.length; m++) {
    //Escoger caso según letra en la posición i de la cadena
    switch (cadenaComandos[m]) {
      
      case "f":
        moveForward(rover);
      break;

      case "l":
        turnLeft(rover);
      break;
      
      case "r":
        turnRight(rover);
      break;
      
      case "b":
        moveBackward(rover);
      break;
      
      default:
      break;
    }        
  }
}

function limites(numX,numY) {
  if(numX<0){ 
    numX=0; 
  }  
  else if(numX>9){ 
    numX=9; 
  }  
  if(numY<0){ 
    numY=0; 
  }
  else if(numY>9){ 
    numY=9; 
  }
  return [numX, numY];
}

function hayObstaculo(numX,numY) {
  for(kont=0; kont<(obstaculos.length/2); kont+=2){
    if (numX==obstaculos[kont] & numY ==obstaculos[kont+1]) { //Revisa si el rover coincide con algún obstáculo
      numX=rover.befX;
      numY=rover.befY;
    }
  }
  return [numX,numY];
}

function Movimiento (rover) {

  //Validar que no se escape del tablero
  [rover.x,rover.y]=limites(rover.x,rover.y);

  //Validar que no esté en un obstáculo
  [rover.x,rover.y]=hayObstaculo(rover.x,rover.y);

  //Movimiento en el tablero
  board[rover.befY][rover.befX] = ' ';//Elimina el rover anterior 
  board[rover.y][rover.x] = 'X'; //Coloca el rover en la posición actual
  console.log(board.join("\n")); //imprime en pantalla el tablero actual

  //logear posición del rover
  rover.travelLog.push("( "+ rover.x +" , " + rover.y +" )");
}
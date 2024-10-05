
var turnCount=1;
document.getElementById("new-game").addEventListener("click", setStartingPos);
function getRowFromId(id){
    return parseInt(id.charAt(0)); 
}
function getColFromId(id){
    return parseInt(id.charAt(2)); 
}
function setStartingPos(){
    for(var r=0; r<8; r++){
        for(var c=0; c<8; c++){
            setRCStatus(r,c,'O');
        }
    }
    document.getElementById("skip-turn").addEventListener("click", skipTurn);
    document.getElementById("winner").innerHTML=" ";
    turnCount=1;
    setRCStatus(3,3,'W');
    setRCStatus(3,4,'B');
    setRCStatus(4,3,'B');
    setRCStatus(4,4,'W');
    setPlayerLabel();
    setScoreLabel();
    for(var r=0; r<8; r++){
        for(var c=0; c<8; c++){
        document.getElementById(r+" "+c).addEventListener("click", doTurn);
    }
} // this thing added all the event listeners for the board

}

function getStatusFromRC(r, c){ //converts an rc val to a button val in the html
    element= document.getElementById(r+" "+c).querySelector("span");
    const style = window.getComputedStyle(element);
    const color = style.getPropertyValue('background-color');
    if(color==="rgb(38, 155, 14)"){
        return 'O';
    }
    else if(color==="rgb(0, 0, 0)"){
        return 'B';
    }
    else if(color==="rgb(255, 255, 255)"){
        return 'W';
    }
    else{
        return "error"
    }
}

function setPlayerLabel(){  
    if(getPlayerFromTurnCount()==='W'){
        document.getElementById("player-label").innerHTML="Turn: Player 2 (white)";

    }
    else if(getPlayerFromTurnCount()==='B'){
            document.getElementById("player-label").innerHTML="Turn: Player 1 (black)";
        }

    else{
       return ""; 
    }
}
function setScoreLabel(){ 
    document.getElementById("score-label1").innerHTML="Player 1 (black): "+getBCount() +" tiles";
    document.getElementById("score-label2").innerHTML="Player 2 (white): "+getWCount()+ " tiles";
}
function getWCount(){ //counts white pieces on board
    var count=0;
 for(var r=0; r<8; r++){
     for(var c=0; c<8; c++){
        if(getStatusFromRC(r,c)==='W'){
            count++;
        }
     }
 }
 return count;
}
function getBCount(){ //counts black pieces on board
    var count=0;
    for(var r=0; r<8; r++){
        for(var c=0; c<8; c++){
            if(getStatusFromRC(r,c)==='B'){
                count++;
        }
    }
    }
    return count;
}
function getOCount(){ //counts blank spaces on board
    var count=0;
    for(var r=0; r<8; r++){
        for(var c=0; c<8; c++){
            if(getStatusFromRC(r,c)==='O'){
                count++;
        }
    }
   
}
return count;
}
function checkWinner(){ //winner rules 
 if(getOCount()===0){
     document.getElementById("score-label1").innerHTML="";
     document.getElementById("score-label2").innerHTML="";
     document.getElementById("player-label").innerHTML="";
     if(getWCount()>getBCount()){
         document.getElementById("winner").innerHTML="Player 2 (white) wins!";
     }
     else if(getWCount()<getBCount()){
        document.getElementById("winner").innerHTML="Player 1 (black) wins!";
     }
     else{
        document.getElementById("winner").innerHTML="Tie Game!";
     }
 }
 else if(getBCount()==='0'){
    document.getElementById("winner").innerHTML="Player 2 (white) wins!";
 }
 else if(getWCount==='0'){
    document.getElementById("winner").innerHTML="Player 2 (black) wins!";
 }
}

function getOppStatusFromRC(r,c){ //gets w if b; b if w
    if(getStatusFromRC(r,c)==='W'){
        return 'B';
    }
    else if(getStatusFromRC(r,c)==='B'){
        return 'W';
    }
    else{
        return 'O';
    }
}
function hasNoValidMoves(){ //allows skip turn to work 
    for(var r=0; r<8; r++){
        for(var c=0; c<8; c++){
            if(isValidMove(r,c)){
                return false;
            }
        }
    }
    return true;
}
 
function setRCStatus(r, c, status){ //sets the piece on the button
    element= document.getElementById(r+ " "+c).querySelector("span");
    element.style["background-color"] = getColorFromStatus(status);
    
}
function adjToOppValLeft(r, c){
    var status = getPlayerFromTurnCount();
    if(c>0){
        if(status==='W'){
            if(getStatusFromRC(r, c-1)==='B'){
                return true;
            }
        }
        else if(status==='B'){
            if(getStatusFromRC(r, c-1)==='W'){
                return true;
            }
        }
        else{
            return false;
        }
    } 
}
function adjToOppValUp(r, c){
    var status = getPlayerFromTurnCount();
    if(r>0){
        if(status==='W'){
            if(getStatusFromRC(r-1, c)==='B'){
                return true;
            }
        }
        else if(status==='B'){
            if(getStatusFromRC(r-1, c)==='W'){
                return true;
            }
        }
        else{
            return false;
        }
    } 
}
function adjToOppValDown(r, c){
    var status = getPlayerFromTurnCount();
    if(r<7){
        if(status==='W'){
            if(getStatusFromRC(r+1, c)==='B'){
                return true;
            }
        }
        else if(status==='B'){
            if(getStatusFromRC(r+1, c)==='W'){
                return true;
            }
        }
        else{
            return false;
        }
    } 
}
function adjToOppValRight(r, c){
    var status = getPlayerFromTurnCount();
    if(c<7){
        if(status==='W'){
            if(getStatusFromRC(r, c+1)==='B'){
                return true;
            }
        }
        else if(status==='B'){
            if(getStatusFromRC(r, c+1)==='W'){
                return true;
            }
        }
        else{
            return false;
        }
    } 
}
function skipTurn(){
    if(hasNoValidMoves()){
        turnCount++;
        alert("turn skipped");
        if(hasNoValidMoves()){
            handleStalemate();
        }
        setPlayerLabel() 
    }
}
function handleStalemate(){
    document.getElementById("score-label1").innerHTML="";
     document.getElementById("score-label2").innerHTML="";
     document.getElementById("player-label").innerHTML="Stalemate! (rare ending)";
    if(getBCount()>getWCount()){
        document.getElementById("winner").innerHTML="Player 1 (black) wins!";
    }
    else if(getWCount()>getBCount()){
        document.getElementById("winner").innerHTML="Player 2 (white) wins!";
    }
    else{
        document.getElementById("winner").innerHTML="Tie game!";
    }
}
function adjToOppValRightDown(r, c){
    var status = getPlayerFromTurnCount();
    if(c<7&&r<7){
        if(status==='W'){
            if(getStatusFromRC(r+1, c+1)==='B'){
                return true;
            }
        }
        else if(status==='B'){
            if(getStatusFromRC(r+1, c+1)==='W'){
                return true;
            }
        }
        else{
            return false;
        }
    } 
}

function adjToOppValRightUp(r, c){
    var status = getPlayerFromTurnCount();
    if(c<7&&r>0){
        if(status==='W'){
            if(getStatusFromRC(r-1, c+1)==='B'){
                return true;
            }
        }
        else if(status==='B'){
            if(getStatusFromRC(r-1, c+1)==='W'){
                return true;
            }
        }
        else{
            return false;
        }
    } 
}
function adjToOppValLeftUp(r, c){
    var status = getPlayerFromTurnCount();
    if(c>0&&r>0){
        if(status==='W'){
            if(getStatusFromRC(r-1, c-1)==='B'){
                return true;
            }
        }
        else if(status==='B'){
            if(getStatusFromRC(r-1, c-1)==='W'){
                return true;
            }
        }
        else{
            return false;
        }
    } 
}
function adjToOppValLeftDown(r, c){
    var status = getPlayerFromTurnCount();
    if(c>0&&r<7){
        if(status==='W'){
            if(getStatusFromRC(r+1, c-1)==='B'){
                return true;
            }
        }
        else if(status==='B'){
            if(getStatusFromRC(r+1, c-1)==='W'){
                return true;
            }
        }
        else{
            return false;
        }
    } 
}
function hasSameValInLineDownwards(r, c){
    r++;
    var status = getPlayerFromTurnCount();
    while(r<8){
        if(getStatusFromRC(r,c)==='O'){
            return false;
        }
        else if(getStatusFromRC(r,c)===status){
            return true;
        }
        else{
            return(hasSameValInLineDownwards(r, c));
            
        }
    }
    return false;
}
function hasSameValInLineUpwards(r, c){
    r--;
    var status = getPlayerFromTurnCount();
    while(r>=0){
        if(getStatusFromRC(r,c)==='O'){
            return false;
        }
        else if(getStatusFromRC(r,c)===status){
            return true;
        }
        else{
            return(hasSameValInLineUpwards(r, c));
            
        }
    }
    return false;
}
function hasSameValInLineLeftwards(r, c){
    c--;
    var status = getPlayerFromTurnCount();
    while(c>=0){
        if(getStatusFromRC(r,c)==='O'){
            return false;
        }
        else if(getStatusFromRC(r,c)===status){
            return true;
        }
        else{
            return(hasSameValInLineLeftwards(r, c,));
            
        }
    }
    return false;
}
function hasSameValInLineRightwards(r, c){
    c++;
    var status = getPlayerFromTurnCount();
    while(c<8){
        if(getStatusFromRC(r,c)==='O'){
            return false;
        }
        else if(getStatusFromRC(r,c)===status){
            return true;
        }
        else{
            return(hasSameValInLineRightwards(r, c));
            
        }
    }
    return false;
}
function hasSameValInLineRightDown(r, c){
    c++;
    r++;
    var status = getPlayerFromTurnCount();
    while(c<8&&r<8){
        if(getStatusFromRC(r,c)==='O'){
            return false;
        }
        else if(getStatusFromRC(r,c)===status){
            return true;
        }
        else{
            return(hasSameValInLineRightDown(r, c));
            
        }
    }
    return false;
}
function hasSameValInLineRightUp(r, c){
    c++;
    r--;
    var status = getPlayerFromTurnCount();
    while(c<8&&r>=0){
        if(getStatusFromRC(r,c)==='O'){
            return false;
        }
        else if(getStatusFromRC(r,c)===status){
            return true;
        }
        else{
            return(hasSameValInLineRightUp(r, c));
            
        }
    }
    return false;
}
function hasSameValInLineLeftUp(r, c){
    c--;
    r--;
    var status = getPlayerFromTurnCount();
    while(c>=0&&r>=0){
        if(getStatusFromRC(r,c)==='O'){
            return false;
        }
        else if(getStatusFromRC(r,c)===status){
            return true;
        }
        else{
            return(hasSameValInLineLeftUp(r, c));
            
        }
    }
    return false;
}
function hasSameValInLineLeftDown(r, c){
    c--;
    r++;
    var status = getPlayerFromTurnCount();
    while(c>=0&&r<8){
        if(getStatusFromRC(r,c)==='O'){
            return false;
        }
        else if(getStatusFromRC(r,c)===status){
            return true;
        }
        else{
            return(hasSameValInLineLeftDown(r, c));
            
        }
    }
    return false;
}
function isValidMove(r,c){
    if(getStatusFromRC(r,c)==='O'){
     if((adjToOppValDown(r, c)&&hasSameValInLineDownwards(r, c))||
     (adjToOppValUp(r,c)&&hasSameValInLineUpwards(r, c))||
     (adjToOppValLeft(r, c)&&hasSameValInLineLeftwards(r, c))||
     (adjToOppValRight(r, c)&&hasSameValInLineRightwards(r, c))||
     (adjToOppValLeftDown(r, c)&&hasSameValInLineLeftDown(r, c))||
     (adjToOppValLeftUp(r, c)&&hasSameValInLineLeftUp(r, c))||
     (adjToOppValRightDown(r, c)&&hasSameValInLineRightDown(r, c))||
     (adjToOppValRightUp(r, c)&&hasSameValInLineRightUp(r, c))){
         return true;
         }
    }
     return false;

 }
  function flipPieceUpwards(r, c){
      var status = getPlayerFromTurnCount();
      if(hasSameValInLineUpwards(r,c)){
      while(getOppStatusFromRC(r-1, c)===status){
            r--;
            setRCStatus(r,c, status);
         }
      } 
  }  
  function flipPieceDownwards(r, c){
    var status = getPlayerFromTurnCount();
    if(hasSameValInLineDownwards(r,c)){
    while(getOppStatusFromRC(r+1, c)===status){
            r++;
            setRCStatus(r,c, status);
         }
      } 
} 
function flipPieceRightwards(r, c){
    var status = getPlayerFromTurnCount();
    if(hasSameValInLineRightwards(r,c)){
    while(getOppStatusFromRC(r, c+1)===status){
            c++;
            setRCStatus(r,c, status);
         }
      } 
} 
function flipPieceLeftwards(r, c){
    var status = getPlayerFromTurnCount();
    if(hasSameValInLineLeftwards(r,c)){
    while(getOppStatusFromRC(r, c-1)===status){
            c--;
            setRCStatus(r,c, status);
         }
      } 
} 
function flipPieceLeftUp(r, c){
    var status = getPlayerFromTurnCount();
    if(hasSameValInLineLeftUp(r,c)){
    while(getOppStatusFromRC(r-1, c-1)===status){
            c--;
            r--;
            setRCStatus(r,c, status);
         }
      } 
} 
function flipPieceLeftDown(r, c){
    var status = getPlayerFromTurnCount();
    if(hasSameValInLineLeftDown(r,c)){
    while(getOppStatusFromRC(r+1, c-1)===status){
            c--;
            r++;
            setRCStatus(r,c, status);
         }
      } 
} 
function flipPieceRightDown(r, c){
    var status = getPlayerFromTurnCount();
    if(hasSameValInLineRightDown(r,c)){
    while(getOppStatusFromRC(r+1, c+1)===status){
            c++;
            r++;
            setRCStatus(r,c, status);
         
      } 
} 
}
function flipPieceRightUp(r, c){
    var status = getPlayerFromTurnCount();
    if(hasSameValInLineRightUp(r,c)){
    while(getOppStatusFromRC(r-1, c+1)===status){
            c++;
            r--;
            setRCStatus(r,c, status);
         }
      }
} 
function flipPiece(r, c){
    var status= getPlayerFromTurnCount();
    flipPieceDownwards(r,c);
    flipPieceLeftDown(r,c);
    flipPieceLeftUp(r,c);
    flipPieceLeftwards(r,c);
    flipPieceRightDown(r,c);
    flipPieceRightUp(r,c);
    flipPieceRightwards(r,c);
    flipPieceUpwards(r,c);
    setRCStatus(r,c, status);
}
function getColorFromStatus(status){
   if(status==='W'){
       return "rgb(255, 255, 255)";
   }
   else if(status==='B'){
       return "rgb(0, 0, 0)";
   }
   else if(status==='O'){
       return "rgb(38, 155, 14)";
   }
}
function doTurn(e){
     var clicked= e.target.getAttribute('id');
     if(isValidMove(getRowFromId(clicked), getColFromId(clicked))){
        flipPiece(getRowFromId(clicked),getColFromId(clicked));
        incrementTurnCount();
        setPlayerLabel();
        setScoreLabel();
        checkWinner();
        
     }   
}
function getPlayerFromTurnCount(){
    if(turnCount%2===0){
        return 'W';
    }
    else{
        return 'B';
    }
}
function incrementTurnCount(){
    turnCount++;
}

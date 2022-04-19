
// var panzoom = Panzoom($("#game_container")[0], {contain: 'outside', startScale: 1.5 });
var panzoom = Panzoom($("#game_container")[0], { noBind: true});
panzoom.disablePan = false;
panzoom.contain = "outside";
var ZoomInfo = {
  "Counter":3,
  "ArrVal":[1, 1.25, 1.5, 1.75, 2],
  "IsZoomActive":false,
  "AllowPan":false
}



function GetZoomIn(){ 
  panzoom.bind()
  if(ZoomInfo.Counter == 0){
    MovePanClick();
  }
  if(ZoomInfo.Counter < ZoomInfo.ArrVal.length-1){
    ZoomInfo.Counter++;
    panzoom.zoom(ZoomInfo.ArrVal[ZoomInfo.Counter]);    
  }
  if(ZoomInfo.Counter >= ZoomInfo.ArrVal.length-1){
    $("#IcZoomIn").addClass("disable");
    $("#IcZoomOut").removeClass("disable");          
  }
  else{
    $("#IcZoomIn").removeClass("disable");
    $("#IcZoomOut").removeClass("disable");       
  }
  ZoomInfo.IsZoomActive = true;
  $("#panControlCont").removeAttr("class").addClass("show");
}


function GetZoomOut(){
  console.log("ooooo")
  panzoom.bind()
  if(ZoomInfo.Counter > 0){
    ZoomInfo.Counter--;
    panzoom.zoom(ZoomInfo.ArrVal[ZoomInfo.Counter]);      
  }

  if(ZoomInfo.Counter <= 0){
    panzoom.destroy()
    $("#IcZoomIn").removeClass("disable");
    $("#IcZoomOut").addClass("disable");
    ZoomInfo.IsZoomActive = false;        
    $("#panControlCont").removeAttr("class").addClass("hide");
    ResetZoom();
  } 
  else{
    $("#IcZoomIn").removeClass("disable");
    $("#IcZoomOut").removeClass("disable");            
    $("#panControlCont").removeAttr("class").addClass("show");
  }
}

function ResetZoom(){
  ZoomInfo.IsZoomActive = false;  
  ZoomInfo.Counter = 0;
  $("#IcZoomIn").removeClass("disable");
  $("#IcZoomOut").addClass("disable");  
  panzoom.disablePan = true;   
  panzoom.zoom(ZoomInfo.ArrVal[ZoomInfo.Counter]);
  panzoom.reset();    
  $("#game_container").removeClass("disable"); 
  $("#defaultPan, #movePan").removeAttr("class");
  $("#defaultPan").addClass("disable");
  $("#movePan").addClass("enable");
}

function DefaultPanClick(){
  $("#defaultPan, #movePan").removeAttr("class");
  $("#movePan").addClass("enable");
  ZoomInfo.AllowPan = false;
  panzoom.disablePan = false;
  $("#game_container").removeClass("disable");
}

function MovePanClick(){
  $("#defaultPan, #movePan").removeAttr("class");  
  $("#defaultPan").addClass("enable");
  ZoomInfo.AllowPan = true;
  panzoom.disablePan = true;
  $("#game_container").addClass("disable");
}
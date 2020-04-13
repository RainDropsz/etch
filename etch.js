         //Global Variables
let mode = 0;
let color1 = $("#colorChoice").val();
let colorText = $("#colorText").val();


// Functions
function buildGrid(nwide, nhght) {
  let i = 0, j = 0;
  let mode = 0;

          //Remove previous grid
  $("#grid1").remove();
          //Add div #grid1 after #forms
  $("#forms").after('<div id="grid1"></div>');

  for(i=1; i <= nhght; i++) {
          //div .gridrow is row container
    $("#grid1").append('<div class="gridrow"></div>');

          //div .boxTp1 is each box in the row
    for( j = 1; j <= nwide; j++) {
      $(".gridrow:last-child").
      append("<div class='boxTp1'></div>");
    }
  }
         //css to fit boxes to screen
  addboxcss(nwide, nhght);
         //attach event listener to new grid
  $(".boxTp1").mouseover((e) => colorMode(e));
  gradinit(); // initialize gradient
}        //end of function buildGrd


function colorMode(e) {
         //Modes for changing box colors
  var str0 = "", opcStart = 0, curropc = "", newopc = 0, rgba = "";

  if (mode == 0) {
    $(e.target).css("background-color", color1);}
  else if (mode == 1) {
    applyRandColor();
    $(e.target).css("background-color", color1);}
  else if (mode == 2) {
    let colorstr = $(e.target).css("background-color");
    let startind = (colorstr.lastIndexOf(",") + 1);
    let curropc = parseFloat(colorstr.slice(startind));
    let newopc = curropc + 0.2;
    let newcolor = colorstr.slice(0, startind) + newopc + ")";

    $(e.target).css("background-color", newcolor);
  }
}


// Helper Functions
function addboxcss(nwide, nhght) {
         //calculate good percentages for screen size
  var pxwide = (.9*window.innerWidth / nwide -2) ;
  var pxhght = (.68*window.innerHeight / nhght -2) ;

  var pctwide = pxwide /  window.innerWidth * 100 + "%";
  var pcthght = pxhght /  window.innerHeight * 100 + "vh";

  $(".boxTp1").css("width",  pctwide);
  $(".boxTp1").css("height", pcthght);
}

         //Event Listener: Make new grid
$("#mkGrd").submit( function() {
    buildGrid($("#gWid").val(), $("#gHgt").val());
  }
);

         //Event Listener for input=color change
$("#colorChoice").on("change",
  function() {
    mode = 0;
    color1 = $("#colorChoice").val();
    $("#lblcolor").css("background-color", color1);
    $("#colorText").val(color1);
  }
);

        //Event Listener for enter key on colorText changes
$(window).keydown(
  function(event){                   //if press enter after
    if(event.key == "Enter" &&        //typing in colorText
      $("#colorText").is(":focus")) {
        event.preventDefault();

        mode = 0;
        $("#colorText").blur();  //unselect field
        color1 = $("#colorText").val();

        $("#lblcolor").css("background-color", color1);
        $("#colorText").val(color1);
        return false;
    }
  }
);

         //Event listener for click Rainbow button
$("#rainbowbtn").on("click", () => applyRandColor());

function applyRandColor()  {
    color1 = "#" + Math.floor(Math.random()*16777215).
             toString(16);    // random color

    mode = 1;

    $("#lblcolor").css("background-color", color1);
    $("#colorText").val(color1);
}

        //Event Listener: Gradient Mode
$("#gradbtn").on("click",
  function() {
    gradinit();
    mode = 2;
  }
);
        //Initialize Gradient by setting all opacity to 0
function gradinit() {
  let str1 = "";

  $(".boxTp1").each(
    function() {
      str1 = $(this).css("background-color");
      $(this).css("background-color", convToRGBA(str1) );
    }
  );
}

function convToRGBA(tmprgb)  {

  if(tmprgb.search("rgba") < 0) {
    tmprgb = tmprgb.slice(0,3) + "a" +
      tmprgb.slice(3,tmprgb.length-1) + ", " + 0 + ")";
  }
  else {
    tmprgb="rgba(255,255,255,0)";
  }

  // return "rgba(255,255,255,0)";
  return tmprgb;
}

         //prevent reload page on form submit
$("#mkGrd").submit(function(e) {
  e.preventDefault(); } 
);

         // Build First Grid
buildGrid(16,16);
         // Add copyright year
$("small").append("&copy;" + (new Date().getFullYear() ) + " RainDropsz");

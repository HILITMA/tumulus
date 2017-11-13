/*
The spiral is an SVG path initializeded with an M command at its center, with
enough following S command points to provide a 'smooth' curve. The points are
created using the equation for a spiral.
*/


function draw()
{
	//---dir=1: clockwise, dir=-1: counterclockwise
  var dir=1,
      SpiralPnts=520,
	    CenterX=300,
	    CenterY=300,
        // TODO: calc the sepertion based o
	    S=1.93,
	    Revs=26;
	//---degrees of seperation between points---
	    DegSep=(2*Math.PI*Revs/SpiralPnts);

	//---the path element---
	for(var i=0;i<SpiralPnts;i++)
	{
		var NextAngle=dir*DegSep*i
		var Ax=(S*NextAngle)*Math.cos(NextAngle)+CenterX
		var Ay=(S*NextAngle)*Math.sin(NextAngle)+CenterY
		if(i==0)
			var pathPnts="M"+rnd1(Ax)+" "+rnd1(Ay)+" S "
		else
		   pathPnts += rnd1(Ax)+" "+rnd1(Ay)+" "
	}
  pathPnts+=Ax+" "+Ay;


	Spiral.setAttribute("d",pathPnts)

}
//--returns 1 decimal place---
function rnd1(num)
{
	var dp1=Math.round(num*10)/10
	return dp1
}
window.onload = function () {
  draw()
  var tumulus = svgPanZoom('#tumulus', {
      viewportSelector: '.svg-pan-zoom_viewport'
    , panEnabled: true
    , controlIconsEnabled: true
    , zoomEnabled: true
    , dblClickZoomEnabled: true
    , mouseWheelZoomEnabled: true
    , preventMouseEventsDefault: true
    , zoomScaleSensitivity: 0.2
    , minZoom: 1
    , maxZoom: 11
    , fit: true
    , contain: false
    , center: true
    , refreshRate: 'auto'
    , beforeZoom: function(){}
    , onZoom: function(){}
    , beforePan: function(){}
    , onPan: function(){}
    , onUpdatedCTM: function(){}
    , eventsListenerElement: null
    })
		, bullseye = document.getElementById("bullseye")
		, illustration = document.getElementById("illustration");

	bullseye.circle = document.getElementById("bullseye-circle")

	function zoom(level) {
			tumulus.zoom = level;
			bullseye.circle.setAttribute("r", 10+level*2)
	};

	function reset() {
		console.log("reset");
		illustration.show();
		bullseye.hide()
		zoom(1);
		tumulus.zoom = 1;
	};

    illustration.show = function() {
        illustration.style['opacity'] = "0.5";
    };
    illustration.hide = function() { 
        illustration.style['opacity'] = "0";
    };

    bullseye.show = function() {
        bullseye.style['fill-opacity'] = "0.2";
        bullseye.style['stroke-width'] = "10px"
    };
    bullseye.hide = function() { 
        bullseye.style['fill-opacity'] = "0";
        bullseye.style['stroke-width'] = "0"
    };
    bullseye.move = function () { 
        // move the bullseye to the closest segment and update the age indicator
        null
    };

    tumulus.setOnZoom(function(level){
		zoom(level);
        if (level > 1) {
            bullseye.show();
			illustration.hide();
		}
        else {
            bullseye.hide();
			illustration.show();
		} 
	});
    tumulus.setOnPan(function(point){
            bullseye.move(point);
            bullseye.show();
			illustration.hide();
    });

    var resetPZC = document.getElementById('svg-pan-zoom-reset-pan-zoom');
    resetPZC.addEventListener('click', reset, false);

	reset()

}


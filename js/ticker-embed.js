var cost = 0;
var deaths = 0;
var timetodeath = 0;
var refugees = 0;
var tickerStarted = false; // bit of a hack but the instructions allow people to call updateTicker more than once which can mean there might be a lot of timers
//var defaultStart = new Date("Nov 26, 2009, 18:00:00");
//var defaultEnd = new Date("Nov 26, 2010, 18:00:00");
var defaultStart = Date("Nov 29, 2010, 10:00:00");
var defaultEnd = Date("Nove 29, 2010, 10:00:00");

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function calculateThing(current, projected, start, end) {
	totalTime = end - start;
	perTime = projected / totalTime;
	today = new Date();
	timeSoFar = today - start;
	return (current + (timeSoFar*perTime));
}

function calculateCost(){
	cost = calculateThing(0, 125000000000, defaultStart, defaultEnd);
}

function calculateDeaths(){
	deaths = calculateThing(0, 300000, defaultStart, defaultEnd);
	distanceToNextDeath = Math.floor(deaths + 1) - deaths;



	totalTime = defaultEnd - defaultStart;
	timePerDeath = 1 / (300000 / totalTime);

	timetodeath = distanceToNextDeath * timePerDeath; // in milliseconds
	timetodeath = Math.floor(timetodeath / 1000);
}

function calculateRefugees() {
	refugees = calculateThing(0, 4243902.44, defaultStart, defaultEnd);
}

function updateTicker(a){
	calculateCost();
	calculateDeaths();
	calculateRefugees();
	if(document.getElementById('deathnum')) { document.getElementById('deathnum').innerHTML = addCommas(Math.floor(deaths)); }
	if(document.getElementById('timetodeath')) { document.getElementById('timetodeath').innerHTML = timetodeath; }
	if(document.getElementById('costnum')) { document.getElementById('costnum').innerHTML = '$' + addCommas(Math.floor(cost)); }
	if(document.getElementById('refugeenum')) { document.getElementById('refugeenum').innerHTML = addCommas(Math.floor(refugees)); }
	setTimeout("updateTicker("+a+");",a);
}

function startTicker(a) {
	if(tickerStarted) return;
	else updateTicker(a);
}

function addTicker(tickercode) {
	var beforeMe = document.getElementById("tickerjs");
	if(style != false) {
		styleElem = document.createElement("style");
		styleElem.setAttribute('type', 'text/css');
		styleElem.innerHTML = style;
		document.body.insertBefore(styleElem, beforeMe);
		style = false;
	}

	tickerElem = document.createElement("div");
	tickerElem.innerHTML = tickercode;
	document.body.insertBefore(tickerElem, beforeMe);
	startTicker(100);
}

function addDeathTicker() {
	addTicker(deathTicker);
}

function addCostTicker() {
	addTicker(costTicker);
}

function addRefugeesTicker() {
	addTicker(refugeesTicker);
}

var style = '.ticker { width: 650px; font-family: arial, sans-serif; margin: 0 auto; margin-top: 10px; height: 160px; border: 1px solid black; background: black; padding: 20px; padding-top: 5px; padding-bottom: 10px;} .ticker .title { float: left; color: white; text-align: center; line-height: 1em; font-size: 3.5em; font-weight: bold;} .ticker .number, .ticker .time span { font-size: 5em; font-weight: bold; color: red; margin-top: 0px; margin-bottom: 30px; } .ticker .time { color: white; } .ticker .embed { float: right; font-weight: bold;}  #deaths .number { float: right; } #refugees { width: 400px; } #deaths { width: 550px; } a { color: white; } a:hover { color: red; }';

var deathTicker = '<div class="top ticker" id="deaths"><div><div class="embed"><a href="http://costsofclimatechange.org">Costs of Climate Change</a></div><div class="title">Deaths</div></div> <div style="clear: both;"></div> <div><div class="number"><span id="deathnum">300,000</span></div> <div class="time"><span id="timetodeath">0:02</span> until next death</div> </div></div>';

var costTicker = '<div class="left ticker" id="cost"> <div><div class="embed"><a href="http://costsofclimatechange.org">Costs of Climate Change</a></div> <div class="title">Cost</div></div> <div class="number"><span id="costnum">$125,000,000,000</span></div> </div>';

var refugeesTicker = '<div class="left ticker" id="refugees"> <div class="embed"><a href="http://costsofclimatechange.org">Costs of Climate Change</a></div> <div class="title">Refugees</div> <div class="number"><span id="refugeenum">0</span></div> </div>';

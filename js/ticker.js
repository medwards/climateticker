var cost = 0;
var deaths = 0;
var timetodeath = 0;
var refugees = 0;
var defaultStart = new Date("Nov 26, 2009, 18:00:00"); // will be new Date("Nov 29, 2010, 10:00:00");
var defaultEnd = new Date("Nov 26, 2010, 18:00:00"); // will be new Date("Nove 29, 2010, 10:00:00");

//var defaultStart = Date("Nov 29, 2010, 10:00:00");
//var defaultEnd = Date("Nov 29, 2011, 10:00:00");


$.fn.digits = function(precision, prefix){
    return this.each(function(){
	theNumber = $(this).text().split('.');

	try {
		if(theNumber.length > 0 && precision > 0) {
			significantDigits = '.' + theNumber[1].substr(0, precision);
		} else {
			significantDigits = '';
		}
	} catch(err) {
		significantDigits = '';
	}

        $(this).text( prefix + theNumber[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + significantDigits ); 
    })
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
	$("#cost .number span").text(cost).digits(2, '$');
	$("#deaths .number span").text(deaths).digits(0, '');
	$("#deaths .time span").text(timetodeath + ' seconds');
	$("#refugees .number span").text(refugees).digits(0, '');
	setTimeout("updateTicker("+a+");",a);
}

$(function() { 
	updateTicker(100);
});

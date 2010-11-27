$(function() { 
	$('.ticker').corner("round 15px");
	$('.dialog').dialog({ autoOpen: false, modal: true, title: $('dialog').attr('title'), width: 560});
	$('#cost .embed').click(function() {
		$('#costembed').dialog('open');
		return false;
	});

	$('#deaths .embed').click(function() {
		$('#deathsembed').dialog('open');
		return false;
	});
	$('#refugees .embed').click(function() {
		$('#refugeesembed').dialog('open');
		return false;
	});

	$('#about').click(function() {
		$('#aboutdialog').dialog('open');
		return false;
	});

	$('#notes').click(function() {
		$('#notesdialog').dialog('options', 'height', 500);
		$('#notesdialog').dialog('open');
		return false;
	});

});

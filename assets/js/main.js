// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
	(function() {
		var noop = function() {};
		var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
		var length = methods.length;
		var console = window.console = {};
		while (length--) {
			console[methods[length]] = noop;
		}
	}());
}

//  =====================
//  = Author: Varemenos =
//  =====================

$(function () {
	function getResults() {
		// get the keyword
		query = $('#query').val();
		// get the selected language
		lang = $('#lang').find('option:selected').text();

		// if its set to All
		if (lang == 'All') {
			// then just empty the string
			lang = '';
		}

		// ajax call
		$.ajax({
			dataType: 'jsonp',
			jsonp: 'callback',
			url: 'http://searchco.de/api/jsonp_search_IV/?q=' + lang + ' ' + query + '&p=' + (params.page - 1) + '&callback=?',
			success: function (data) {
				// if the results are more than 10
				if (data.total > 10) {
					// then calculate pages
					pages = parseInt(data.total / 10, 10);
					if ((data.total % 10) > 0) {
						pages++;
					}
				} else {
					// else there is only 1 page
					pages = 1;
				}

				// hide the results div
				$('#results').hide();

				// print data returned {
				if(data.total !== null){
					$("#info h3").html('Found "' + data.total + '" results.');
				}else{
					$("#info h3").html('Please enter a keyword first');
				}

				// delete any already loaded results from previous queries
				$('#results .result').remove();

				// create the result HTML
				for (var i = 0; i < data.results.length; i++) {
					$("#results").append('<div class="result"><h3><a class="resultLink" href="' + data.results[i].url + '" target="_blank">' + data.results[i].name + '</a><span class="label label-inverse">' + data.results[i].type + '</span></h3><hr><p class="description">' + data.results[i].description + '</p><p class="synopsis">' + data.results[i].synopsis + '</p><div class="namespace">' + data.results[i].namespace + '</div></div>');
				}
				// }

				// and display results
				$('#results').fadeIn('1500');

				// empty the page dropdown options
				$('#page').html('').removeAttr('disabled');
				// fill the page dropdown with page options
				for (i = 0; i < pages; i++) {
					$('#page').append('<option name=' + (i + 1) + ' value=' + (i + 1) + '>' + (i + 1) + '</option>');
				}

				$('#page option[name=' + params.page + ']').attr("selected", true);
			}
		});
	}

	// get the specified url parameter's value
	// credits: https://gist.github.com/1771618

	function getUrlVar(key) {
		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
		return result && result[1] || "";
	}

	$("#main").css("margin-bottom", $("footer").outerHeight() + 16);

	// get q and lang url parameters into variables
	var params = {};
	params.page = 1;
	params.q = getUrlVar('q');
	params.lang = getUrlVar('lang');

	// if the lang url parameter is not undefined, not null and not an empty string
	if (typeof (params.lang) != "undefined" && params.lang !== null && params.lang !== '') {
		// if the html of the selected option is not null
		if ($('#lang option[name="' + params.lang + '"]').html() !== null) {
			// then give that option the attribute of "selected"
			$('#lang option[name="' + params.lang + '"]').attr('selected', true);
		}
	}

	// if the q url parameter is not undefined, not null and not an empty string
	if (typeof (params.q) != "undefined" && params.q !== null && params.q !== '') {
		// insert the value of the q parameter inside the search input element
		$('#query').val(params.q);
		getResults();
	}

	// on form submit event
	$('form').on("submit", function (e) {
		e.preventDefault();
		getResults();
	});

	// on dropdown change event
	$('#lang').on("change", function (e) {
		e.preventDefault();
		getResults();
	});

	// on dropdown live(change) event
	$('#page').on("change", function () {
		params.page = $('#page option:selected').val();
		getResults();
		$('#page option[name=' + params.page + ']').attr("selected", true);
	});

	$("#page select").on("mouseup", function (e) {
		e.preventDefault();
		$('#page option[name=' + params.page + ']').attr("selected", true);
	});
});

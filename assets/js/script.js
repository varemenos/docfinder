//  =====================
//  = Author: Varemenos =
//  =====================

$(function(){
	// get footer's height
	footerHeight = $('footer').height();
	// put a margin equal to 2 times the height of the footer
	$('#results').css('margin-bottom', (2 * footerHeight));

	// current page = 1
	current = 1;

	// set fancybox's width to 95% of the window's width
	fancyWidth = parseInt(($(window).width()) * 0.95);
	// set fancybox's height to 95% of the window's height
	fancyHeight = parseInt(($(window).height()) * 0.95);

	// activate iframe fancybox
	$(".resultLink").fancybox({
		width: fancyWidth,
		height: fancyHeight,
		type: 'iframe'
	});

	// get q and lang url parameters into variables
	getQ = getUrlVar('q');
	getLang = getUrlVar('lang');

	// if the lang url parameter is not undefined, not null and not an empty string
	if(typeof(getLang) != "undefined" && getLang !== null&& getLang !== ''){
		// if the html of the selected option is not null
		if($('#lang option[name="'+getLang+'"]').html() != null){
			// then give that option the attribute of "selected"
			$('#lang option[name="'+getLang+'"]').attr('selected', true);
		}
	}

	// if the q url parameter is not undefined, not null and not an empty string
	if(typeof(getQ) != "undefined" && getQ !== null&& getQ !== ''){
		// insert the value of the q parameter inside the search input element
		$('#query').val(getQ);
		// call the getResults function
		getResults();
	}

	// on form submit event
	$('form').submit(function(e){
		// prevent the default behaviour
		e.preventDefault();
		// call the getResults function
		getResults();
	});

	// on dropdown change event
	$('#lang').change(function(e){
		// prevent the default behaviour
		e.preventDefault();
		// call the getResults function
		getResults();
	});

	// on dropdown live(change) event
	$('#page').live('change', function(e){
		// current page equals to the value of the selected dropdown option
		current = $('#page option:selected').val();
		// call the getResults function
		getResults();
		// add the attributed of "selected" to the currently selected option
		$('#page option[name='+current+']').attr("selected", true);
	});

	$("#page select").mouseup(function(e){
		// prevent the default behaviour
		e.preventDefault();
		// add the attributed of "selected" to the currently selected option
		$('#page option[name='+current+']').attr("selected", true);
	});


	function getResults(){
		// get the keyword
		query = $('#query').val();
		// get the selected language
		lang = $('#lang').find('option:selected').text();

		// if its set to All
		if(lang == 'All'){
			// then just empty the string
			lang = '';
		}

		// ajax call
		$.ajax({
			dataType: 'jsonp',
			jsonp: 'callback',
			url: 'http://searchco.de/api/jsonp_search_II/' + lang + ' ' + query + '/'+ ((current -1) * 10) + '/?callback=?',
			success: function(data){
				// show the requested url
				// console.log('query = http://searchco.de/api/jsonp_search_II/' + lang + ' ' + query + '/'+ ((current -1) * 10) + '/?callback=?');

				// if the results are more than 10
				if(data.total > 10){
					// then calculate pages
					pages = parseInt(data.total / 10);
					if((data.total % 10) > 0){
						pages++;
					}
				}else{
					// else there is only 1 page
					pages = 1;
				}

				// hide the results div
				$('#results').hide();

				// print data returned {
					$("#info h3").html('Found "'+data.total+'" results.');

					// delete any already loaded results from previous queries
					$('#results .result').remove();

					// create the result HTML
					for (var i = 0; i < data.results.length; i++){
						// old format of result title:
						// <h3><a class="resultLink" href="'+data.results[i].url+'">' + (((current -1) * 10) + (i+1)) + ') '+data.results[i].name+'</a></h3>\
						$("#results").append(' \
							<div class="result">\
								<h3><a class="resultLink" href="'+data.results[i].url+'">' + data.results[i].name+'</a> <sup>['+ data.results[i].type +']</sup></h3>\
								<p class="description">'+data.results[i].description+'</p>\
								<p class="synopsis">'+data.results[i].synopsis+'</p>\
								<div class="namespace">'+data.results[i].namespace+'</div>\
							</div>\
						');
					};
				// }

				// and display results
				$('#results').fadeIn('1500');

				// empty the page dropdown options
				$('#page').html('').removeAttr('disabled');
				// fill the page dropdown with page options
				for (var i = 0; i < pages; i++) {
					$('#page').append('<option name='+(i+1)+' value='+(i+1)+'>'+(i+1)+'</option>');
				};

				// add the attributed of "selected" to the currently selected option
				$('#page option[name='+current+']').attr("selected", true);
			},
		});
	}

	// get the specified url parameter's value
	// credits: https://gist.github.com/1771618
	function getUrlVar(key){
		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
		return result && result[1] || "";
	}
});
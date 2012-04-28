/* Author: Varemenos

*/

$(function(){
	// current page = 1
	current = 1;

	getQ = getUrlVar('q');
	getLang = getUrlVar('lang');

	if(typeof(getLang) != "undefined" && getLang !== null&& getLang !== ''){
		if($('#lang option[name="'+getLang+'"]').html() != null){
			$('#lang option[name="'+getLang+'"]').attr('selected', true);
		}
	}

	if(typeof(getQ) != "undefined" && getQ !== null&& getQ !== ''){
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
					$("#info h3").html('Search for: "'+data.query+'"');
					$("#info h4").html('Found: "'+data.total+'"');

					// delete any already loaded results from previous queries
					$('#results .result').remove();

					// create the result HTML
					for (var i = 0; i < data.results.length; i++){
						$("#results").append(' \
							<div class="result">\
								<h3><a href="'+data.results[i].url+'">' + (((current -1) * 10) + (i+1)) + ' '+data.results[i].name+'</a></h3>\
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

	function getUrlVar(key){
		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
		return result && result[1] || "";
	}
});
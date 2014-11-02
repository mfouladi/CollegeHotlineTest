jQuery(document).ready(function($) {
	var cols = $(".col-resize");
	cols.addClass("col-sm-3");
	cols.first().removeClass("col-sm-3");
	cols.first().addClass("col-sm-6");
	console.log(cols);
	
	$(".col-resize").click(function(){
		$(this).removeClass("col-sm-3");
		$(this).addClass("col-sm-6");
		$(this).siblings(".col-resize").removeClass("col-sm-6");
		$(this).siblings(".col-resize").addClass("col-sm-3");
	});

      //hides pill, unhides contents  : prod_page
	  $(".clickable_pill").click(function(){
	    if($(this).hasClass("active")){
		  return;
		}
	    var id = $(this).children().attr("href");
	    if ( $(id).is(':hidden')){
	      $(this).parent().addClass("hidden-xs");
	      //window.document.location = id;
		  $(id).removeClass("hidden-xs");
	      $(id).parent().removeClass("hidden-xs");
		}
		$(id).children("ul").removeClass("hidden-xs");
	  });

});



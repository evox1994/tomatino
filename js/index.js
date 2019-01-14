$(document).ready(function(){

	$('.b-1-slider').slick({
		dots: true,
		fade: true,
		autoplay: true
	});

	$('.b-4-list li a').click(function(){
		var el = $(this).attr('href');

		if ( $(this).hasClass('active') ){
			$(this).removeClass('active');
			$('.b-4-text').removeClass('active');
		} else {
			$('.b-4-list li a').removeClass('active');
			$(this).addClass('active');
			$('.b-4-text').removeClass('active');
			$(el).addClass('active');
		}
		return false;
	});

});
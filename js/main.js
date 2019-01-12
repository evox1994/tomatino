$(document).ready(function(){

	var HH = $('.header').outerHeight();	

	function scrollHeader(){
		if ( $(window).width() > 767 ) {
			var st = $(window).scrollTop();
			if ( st > HH ) {
				$('.header').addClass('active');
			} else {
				$('.header').removeClass('active');
			}
		} else {
			$('.header').removeClass('active');
		}
	}
	scrollHeader();

	$(window).scroll(function(){
		scrollHeader();
	});

	$('.mobile-btn').click(function(){
		if ( $(this).hasClass('active') ){
			$(this).removeClass('active');
			$('.mobile-menu').removeClass('active');
			$('body').removeClass('active');
		} else {
			$(this).addClass('active');
			$('.mobile-menu').addClass('active');
			$('body').addClass('active');
		}
	});

	$('.close-btn').click(function(){
		$('.mobile-btn').removeClass('active');
		$('.mobile-menu').removeClass('active');
		$('body').removeClass('active');
	});

	$('.scroll-btn').click(function(){
		var el = $(this).attr('href');
		var des = $(el).offset().top - 70;
		$('html,body').animate({scrollTop: des},800);
		$('.mobile-btn').removeClass('active');
		$('.mobile-menu').removeClass('active');
		$('body').removeClass('active');
		return false;
	});

});
$(document).ready(function(){

	$('body').on('click','.filter li',function(){
		var fil = this;
		var text = $(this).attr('data-text');
		var metro = $(this).attr('data-metro');
		var check = $(this).attr('data-check');
		var time = $(this).attr('data-time');

		if ( !$(this).hasClass('active') ){
			$('.b-2-text').animate({opacity: 0},300);
			$('.b-2 .info-list').animate({opacity: 0},300);
			$('.filter li').removeClass('active');
			$(this).addClass('active');
			setTimeout(function(){
				$('.b-2-text').find('span').text(text);
				$('.info-list .check-p').find('span').text(check);
				$('.info-list .metro-p').find('span').remove();
				$('.info-list .metro-p').append('<span>'+metro+'</span>');
				$('.info-list .time-p').find('span').text(time);
				$('.b-2-text').animate({opacity: 1},300);
				$('.b-2 .info-list').animate({opacity: 1},300);
			},300);
		}
	});

});
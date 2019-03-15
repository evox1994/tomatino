$(document).ready(function(){

	$('.b-1-select a').click(function(){
		var el = $(this).attr('href');
		$('.b-1-select a').removeClass('active');
		$('.b-1 .order-item form').removeClass('active');
		$(this).addClass('active');
		$(el).addClass('active');
		return false;
	});

	$('.nal-btn').click(function(){
		$(this).addClass('active');
		$(this).parents('div').find('input').val('Без сдачи');
	});

	$('.nal-btn').parents('div').find('input').on('input',function(){
		if ( $(this).val() != 'Без сдачи' ){
			$(this).parents('div').find('.nal-btn').removeClass('active');
		} else {
			$(this).parents('div').find('.nal-btn').addClass('active');
		}
	});

});
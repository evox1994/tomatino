$(document).ready(function(){
	var orderEl = {}; //prodId,price,col,dob
	var orderArr = JSON.parse(localStorage.getItem("tomatino-order"));
	var summa = Number(localStorage.getItem("tomatino-summa"));
	var order = [];

	if ( orderArr ) {
		for (var i = 0; i < orderArr.length; i++) {
			order.push(orderArr[i]);

			$('.order-list').append('<li id="'+orderArr[i].prodId+'"><p>'+orderArr[i].name+'</p><div class="price"><span>'+(Number(orderArr[i].price)*Number(orderArr[i].col))+'</span> руб.</div></li>');
		}
	}
	$('.order-wrap .sum-wrap .summa span').text(summa);

	$('.b-1-select a').on('click touchstart',function(){
		var el = $(this).attr('href');
		$('.b-1-select a').removeClass('active');
		$('.b-1 .order-item form').removeClass('active');
		$(this).addClass('active');
		$(el).addClass('active');
		return false;
	});

	$('.nal-btn').on('click touchstart',function(){
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
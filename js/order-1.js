$(document).ready(function(){
	var orderEl = {}; //prodId,price,col,dob
	var orderArr = JSON.parse(localStorage.getItem("tomatino-order"));
	var summa = Number(localStorage.getItem("tomatino-summa"));
	var order = [];

	if ( orderArr ) {
		for (var i = 0; i < orderArr.length; i++) {
			order.push(orderArr[i]);

			$('.order-list').append('<li data-prodid="'+orderArr[i].prodId+'"><div class="left-part"><div class="name">'+orderArr[i].name+'</div></div><div class="col"><div class="less"></div><p>'+orderArr[i].col+'</p><div class="more"></div></div><div class="price"><span>'+(Number(orderArr[i].price)*Number(orderArr[i].col))+'</span> Руб.</div></li>');
			if (orderArr[i].dob.length){
				for (var j = 0; j < orderArr[i].dob.length; j++){
					$('#'+orderArr[i].prodId).find('.left-part').append('<div class="dop" data-dobid="'+orderArr[i].dob[j].dobId+'"><div class="dop-del"></div>'+orderArr[i].dob[j].name+'</div>');
				}
			}
			$('.dobavki-list li').each(function(){
				if ( $(this).attr('id') == orderArr[i].prodId ){
					$(this).find('.dobavki-add').addClass('active');
					$(this).find('.dop-col').addClass('active');
					$(this).find('.dop-col p').text(orderArr[i].col);
				}
			});
		}
	}
	$('.result-wrap .summa span').text(summa);

	$('body').on('click','.more',function(){
		var prod_id = $(this).parents('li').data('prodid');
		var prod = '#'+prod_id;
		var coli, qwe;
		var numt = 0;
		var clone = {};

		for (var i = 0; i < order.length; i++) {
			if ( order[i].prodId == prod_id ) {
				numt = i;
				coli = Number(order[i].col);
				orderEl.col = coli + 1;
				break;
			}
		}
		orderEl.price = order[numt].price;
		orderEl.prodId = order[numt].prodId;
		orderEl.name = order[numt].name;
		orderEl.dob = order[numt].dob;
		for (var key in orderEl) {
			clone[key] = orderEl[key];
		}
		order[numt] = clone;
		summa = summa + Number(order[numt].price);
		$('.result-wrap .summa span').text(summa);
		$(this).parents('.col').find('p').text(order[numt].col);
		$(this).parents('li').find('.price span').text( Number(order[numt].col)*Number(order[numt].price) );
		$('.dobavki-list '+prod).find('.dop-col p').text(order[numt].col);
		qwe = JSON.stringify(order);
		localStorage.setItem("tomatino-order",qwe);
		localStorage.setItem("tomatino-summa",summa);
	});

	$('body').on('click','.less',function(){
		var prod_id = $(this).parents('li').data('prodid');
		var prod = '#'+prod_id;
		var coli, qwe;
		var numt = 0;
		var clone = {};

		for (var i = 0; i < order.length; i++) {
			if ( order[i].prodId == prod_id ) {
				numt = i;
				coli = Number(order[i].col);
				break;
			}
		}
		if ( coli > 1 ) {
			orderEl.col = coli - 1;
			orderEl.price = order[numt].price;
			orderEl.name = order[numt].name;
			orderEl.prodId = order[numt].prodId;
			orderEl.dob = order[numt].dob;
			for (var key in orderEl) {
				clone[key] = orderEl[key];
			}
			order[numt] = clone;
			summa = summa - Number(order[numt].price);
			$(this).parents('.col').find('p').text(order[numt].col);
			$(this).parents('li').find('.price span').text( Number(order[numt].col)*Number(order[numt].price) );
			$('.dobavki-list '+prod).find('.dop-col p').text(order[numt].col);
		} else {
			summa = summa - Number(order[numt].price);
			$(this).parents('li').remove();
			$('.dobavki-list '+prod).find('.dop-col').removeClass('active');
			$('.dobavki-list '+prod).find('.dobavki-add').removeClass('active');
			order.splice(numt,1);
		}
		$('.result-wrap .summa span').text(summa);
		qwe = JSON.stringify(order);
		localStorage.setItem("tomatino-order",qwe);
		localStorage.setItem("tomatino-summa",summa);
	});

	$('body').on('click','.dop-del',function(){
		var prod_id = $(this).parents('li').data('prodid');
		var prod = '#'+prod_id;
		var coli, qwe;
		var numt = 0;
		var clone = {};

		for (var i = 0; i < order.length; i++) {
			if ( order[i].prodId == prod_id ) {
				for (var j = 0; j < order[i].dob.length; j++){
					if ( $(this).parents('.dop').attr('data-dobid') == order[i].dob[j].dobId ){
						order[i].price = Number(order[i].price) - Number(order[i].dob[j].price);
						summa = summa - Number(order[i].col)*Number(order[i].dob[j].price);
						$('.result-wrap .summa span').text(summa);
						$(this).parents('li').find('.price span').text( Number(order[i].col)*Number(order[i].price) );
						order[i].dob.splice(j,1);
						$(this).parents('.dop').remove();
						qwe = JSON.stringify(order);
						localStorage.setItem("tomatino-order",qwe);
						localStorage.setItem("tomatino-summa",summa);
					}
				}
				break;
			}
		}
	});

	$('.dobavki-add').click(function(){
		var prod_id = $(this).parents('li').attr('id');
		var prod = '#'+prod_id;
		var coli, qwe;
		var numt = 0;
		var clone = {};
		var nal = false;

		for (var i = 0; i < order.length; i++) {
			if ( order[i].prodId == prod_id ) {
				numt = i;
				break;
			} else {
				numt = order.length;
			}
		}
		if ( $(this).hasClass('active') ){
			$(this).removeClass('active');
			$(this).parents('li').find('.dop-col').removeClass('active');
			summa = summa - Number(order[numt].price)*Number(order[numt].col);
			$('.order-list li').each(function(){
				if ( $(this).attr('data-prodid') == order[numt].prodId ){
					$(this).remove();
				}
			});
			order.splice(numt,1);
		} else {
			$(this).addClass('active');
			$(this).parents('li').find('.dop-col').addClass('active');
			orderEl.prodId = prod_id;
			orderEl.col = 1;
			orderEl.name = $(this).parents('li').find('.dobavki-name').text();
			orderEl.price = Number($(this).parents('li').find('.price span').text());
			orderEl.dob = [];
			summa = summa + orderEl.price;
			order.push(orderEl);
			orderEl = {};
			$(this).parents('li').find('.dop-col p').text('1');
			$('.order-list').append('<li data-prodid="'+order[numt].prodId+'"><div class="left-part"><div class="name">'+order[numt].name+'</div></div><div class="col"><div class="less"></div><p>'+order[numt].col+'</p><div class="more"></div></div><div class="price"><span>'+(Number(order[numt].price)*Number(order[numt].col))+'</span> Руб.</div></li>');
		}
		$('.result-wrap .summa span').text(summa);
		qwe = JSON.stringify(order);
		localStorage.setItem("tomatino-order",qwe);
		localStorage.setItem("tomatino-summa",summa);
		return false;
	});

	$('body').on('click','.dop-more',function(){
		var prod_id = $(this).parents('li').attr('id');
		var prod = '#'+prod_id;
		var coli, qwe;
		var numt = 0;
		var clone = {};

		for (var i = 0; i < order.length; i++) {
			if ( order[i].prodId == prod_id ) {
				numt = i;
				coli = Number(order[i].col);
				orderEl.col = coli + 1;
				break;
			}
		}
		orderEl.price = order[numt].price;
		orderEl.prodId = order[numt].prodId;
		orderEl.name = order[numt].name;
		orderEl.dob = order[numt].dob;
		for (var key in orderEl) {
			clone[key] = orderEl[key];
		}
		order[numt] = clone;
		summa = summa + Number(order[numt].price);
		$('.result-wrap .summa span').text(summa);
		$(this).parents('.dop-col').find('p').text(order[numt].col);
		$('.order-list li').each(function(){
			if ( $(this).attr('data-prodid') == prod_id ){
				$(this).find('.price span').text( Number(order[numt].col)*Number(order[numt].price) );
				$(this).find('.col p').text(order[numt].col);
			}
		});
		qwe = JSON.stringify(order);
		localStorage.setItem("tomatino-order",qwe);
		localStorage.setItem("tomatino-summa",summa);
	});

	$('body').on('click','.dop-less',function(){
		var prod_id = $(this).parents('li').attr('id');
		var prod = '#'+prod_id;
		var coli, qwe;
		var numt = 0;
		var clone = {};

		for (var i = 0; i < order.length; i++) {
			if ( order[i].prodId == prod_id ) {
				numt = i;
				coli = Number(order[i].col);
				break;
			}
		}
		if ( coli > 1 ) {
			orderEl.col = coli - 1;
			orderEl.price = order[numt].price;
			orderEl.name = order[numt].name;
			orderEl.prodId = order[numt].prodId;
			orderEl.dob = order[numt].dob;
			for (var key in orderEl) {
				clone[key] = orderEl[key];
			}
			order[numt] = clone;
			summa = summa - Number(order[numt].price);
			$(this).parents('.dop-col').find('p').text(order[numt].col);
			$('.order-list li').each(function(){
				if ( $(this).attr('data-prodid') == prod_id ){
					$(this).find('.price span').text( Number(order[numt].col)*Number(order[numt].price) );
					$(this).find('.col p').text(order[numt].col);
				}
			});
		} else {
			summa = summa - Number(order[numt].price);
			$('.order-list li').each(function(){
				if ( $(this).attr('data-prodid') == prod_id ){
					$(this).remove();
				}
			});
			$(this).parents('li').find('.dop-col').removeClass('active');
			$(this).parents('li').find('.dobavki-add').removeClass('active');
			order.splice(numt,1);
		}
		$('.result-wrap .summa span').text(summa);
		qwe = JSON.stringify(order);
		localStorage.setItem("tomatino-order",qwe);
		localStorage.setItem("tomatino-summa",summa);
	});

});
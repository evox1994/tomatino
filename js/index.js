$(document).ready(function(){
	var orderEl = {}; //prodId,price,col,name,dob
	var orderArr = JSON.parse(localStorage.getItem("tomatino-order"));
	var summa = Number(localStorage.getItem("tomatino-summa"));
	var order = [];
	var dobMas = {}; //prodId,dob

	if ( orderArr ) {
		for (var i = 0; i < orderArr.length; i++) {
			order.push(orderArr[i]);
			$('#'+orderArr[i].prodId).find('.col').addClass('active');
			$('#'+orderArr[i].prodId).find('.col p').text(orderArr[i].col);
			$('#'+orderArr[i].prodId).find('.price-wrap .price span').text(orderArr[i].price);
		}
	}
	orderEl.dob = [];
	dobMas.dob = [];

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

	$('.col .more').click(function(){
		var prod = $(this).parents('.pr').find('.add-btn').attr('href');
		var prod_id = $(prod).attr('id');
		var coli, qwe;
		var numt = 0;
		var clone = {};
		var el = $(prod).find('.fancybox-a').attr('href');
		var popup = $(el).attr('href');

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
		$('.header-basket span b').text(summa);
		$(prod).find('.col p').text(order[numt].col);
		$(popup).find('.col p').text(order[numt].col);
		qwe = JSON.stringify(order);
		localStorage.setItem("tomatino-order",qwe);
		localStorage.setItem("tomatino-summa",summa);
		orderEl.dob = [];
	});

	$('.col .less').click(function(){
		var prod = $(this).parents('.pr').find('.add-btn').attr('href');
		var prod_id = $(prod).attr('id');
		var coli, qwe;
		var numt = 0;
		var clone = {};
		var el = $(prod).find('.fancybox-a').attr('href');
		var popup = $(el).attr('href');

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
			$(prod).find('.col p').text(order[numt].col);
			$(popup).find('.col p').text(order[numt].col);
			orderEl.dob = [];
		} else {
			summa = summa - Number(order[numt].price);
			if ( order[numt].dob.length ){
				for (var i = 0; i < order[numt].dob.length; i++){
					order[numt].price = Number(order[numt].price) - Number(order[numt].dob[i].price);
				}
				$(prod).find('.price-wrap .price span').text(order[numt].price);
			}
			order.splice(numt,1);
			$(prod).find('.col').removeClass('active');
			$(popup).find('.col').removeClass('active');
		}
		$('.header-basket span b').text(summa);
		qwe = JSON.stringify(order);
		localStorage.setItem("tomatino-order",qwe);
		localStorage.setItem("tomatino-summa",summa);
	});

	$('.add-btn').click(function(){
		var nal = false;
		var prod = $(this).attr('href');
		var prod_id = $(prod).attr('id');
		var clone = {};
		var numt = 0;
		var coli = 0;
		var qwe;
		var el = $(prod).find('.fancybox-a').attr('href');
		var popup = $(el).attr('href');

		orderEl.price = Number($(prod).find('.price-wrap .price span').text());
		orderEl.prodId = prod_id;
		orderEl.name = $(prod).find('.name').text();
		if ( order.length ) {
			for (var i = 0; i < order.length; i++) {
				if ( order[i].prodId == prod_id ) {
					nal = true;
					numt = i;
					coli = Number(order[i].col);
					break;
				} else {
					numt = order.length;
				}
			}
			if (nal) {
				orderEl.col = coli + 1;
			} else {
				orderEl.col = 1;
			}
		} else {
			orderEl.col = 1;
		}
		if (orderEl.prodId == dobMas.prodId){
			orderEl.dob = dobMas.dob;
		} else {
			orderEl.dob = [];
		}
		for (var key in orderEl) {
			clone[key] = orderEl[key];
		}
		order[numt] = clone;
		summa = summa + Number(order[numt].price);
		$('.header-basket span b').text(summa);
		$(prod).find('.col p').text(order[numt].col);
		$(prod).find('.col').addClass('active');
		$(popup).find('.col p').text(order[numt].col);
		$(popup).find('.col').addClass('active');
		qwe = JSON.stringify(order);
		localStorage.setItem("tomatino-order",qwe);
		localStorage.setItem("tomatino-summa",summa);
		orderEl.dob = [];
		return false;
	});

	$('.dop-add').click(function(){
		var nal = false;
		var prod = $(this).attr('href');
		var prod_id = $(prod).attr('id');
		var clone = {};
		var dobavka = {};
		var dobavkaMas = [];
		var numt = 0;
		var coli = 0;
		var numd = 0;
		var qwe;

		orderEl.price = Number($(prod).find('.price-wrap .price span').text());
		orderEl.prodId = prod_id;
		dobMas.prodId = prod_id;
		orderEl.name = $(prod).find('.name').text();
		if ( order.length ) {
			for (var i = 0; i < order.length; i++) {
				if ( order[i].prodId == prod_id ) {
					nal = true;
					numt = i;
					coli = Number(order[i].col);
					break;
				} else {
					numt = order.length;
				}
			}
			if (nal) {
				orderEl.col = coli;
			} else {
				orderEl.col = 0;
			}
		} else {
			orderEl.col = 0;
		}
		if ( $(this).hasClass('active') ){
			$(this).removeClass('active');
			if (nal){
				if ( order[numt].dob.length ){
					for (var j = 0; j < order[numt].dob.length; j++){
						dobavkaMas.push(order[numt].dob[j]);
						if ( order[numt].dob[j].dobId == $(this).parents('li').attr('id') ){
							numd = j;
						}
					}
				}
				orderEl.price = orderEl.price - dobavkaMas[numd].price;
				$(prod).find('.price-wrap .price span').text( orderEl.price );
				$(this).parents('.popup').find('.popup-wrap .price-wrap .price span').text( orderEl.price );
				summa = summa - Number(orderEl.col)*Number(dobavkaMas[numd].price);
				$('.header-basket span b').text(summa);
				dobavkaMas.splice(numd,1);
				orderEl.dob = dobavkaMas;
				dobMas.dob = dobavkaMas;
				for (var key in orderEl) {
					clone[key] = orderEl[key];
				}
				order[numt] = clone;
				qwe = JSON.stringify(order);
				localStorage.setItem("tomatino-order",qwe);
				localStorage.setItem("tomatino-summa",summa);
			} else {
				if ( orderEl.dob.length ){
					for (var j = 0; j < orderEl.dob.length; j++){
						dobavkaMas.push(orderEl.dob[j]);
						if ( orderEl.dob[j].dobId == $(this).parents('li').attr('id') ){
							numd = j;
						}
					}
				}
				orderEl.price = orderEl.price - dobavkaMas[numd].price;
				$(prod).find('.price-wrap .price span').text( orderEl.price );
				$(this).parents('.popup').find('.popup-wrap .price-wrap .price span').text( orderEl.price );
				dobavkaMas.splice(numd,1);
				orderEl.dob = dobavkaMas;
				dobMas.dob = dobavkaMas;
			}
		} else {
			$(this).addClass('active');
			dobavka.name = $(this).parents('li').find('.dop-name').text();
			dobavka.price = Number($(this).parents('li').find('.price-wrap .price span').text());
			dobavka.dobId = $(this).parents('li').attr('id');
			orderEl.price = orderEl.price + dobavka.price;
			$(prod).find('.price-wrap .price span').text( orderEl.price );
			$(this).parents('.popup').find('.popup-wrap .price-wrap .price span').text( orderEl.price );
			if (nal) {
				if ( order[numt].dob.length ){
					for (var j = 0; j < order[numt].dob.length; j++){
						dobavkaMas.push(order[numt].dob[j]);
					}
				}
				dobavkaMas.push(dobavka);
				orderEl.dob = dobavkaMas;
				dobMas.dob = dobavkaMas;
				for (var key in orderEl) {
					clone[key] = orderEl[key];
				}
				order[numt] = clone;
				summa = summa + Number(orderEl.col)*Number(dobavka.price);
				$('.header-basket span b').text(summa);
				qwe = JSON.stringify(order);
				localStorage.setItem("tomatino-order",qwe);
				localStorage.setItem("tomatino-summa",summa);
			} else {
				if ( orderEl.dob.length ){
					for (var j = 0; j < orderEl.dob.length; j++){
						dobavkaMas.push(orderEl.dob[j]);
					}
				}
				dobavkaMas.push(dobavka);
				orderEl.dob = dobavkaMas;
				dobMas.dob = dobavkaMas;
			}
		}
		return false;
	});

	$('.fancybox-a').click(function(){
		var el = $(this).attr('href');
		var popup = $(el).attr('href');
		var coli = $(this).parents('.pr').find('.col p').text();
		var name = $(this).parents('.pr').find('.name').text();
		var op = $(this).parents('.pr').find('.text p').text();
		var price = $(this).parents('.pr').find('.price span').text();
		var prod_id = $(this).parents('.pr').attr('id');
		var dobavkaMas = [];

		$(popup).find('.popup-wrap .add-btn').attr('href','#'+prod_id);
		$(popup).find('.name').text(name);
		$(popup).find('.op').text(op);
		$(popup).find('.col p').text(coli);
		$(popup).find('.popup-wrap .price span').text(price);
		if ( $(this).parents('.pr').find('.col').hasClass('active') ){
			$(popup).find('.col').addClass('active');
		} else {
			$(popup).find('.col').removeClass('active');
		}
		if ( $(this).parents('.b-block').attr('id') == 'pizza' ){
			$(popup).find('.dop-add').attr('href','#'+prod_id);
			if (order.length){
				for (var i = 0; i < order.length; i++) {
					if ( order[i].prodId == prod_id ) {
						if ( order[i].dob.length ){
							for (var j = 0; j < order[i].dob.length; j++){
								$(popup).find('.dop-list li').each(function(){
									if ( $(this).attr('id') == order[i].dob[j].dobId ){
										$(this).find('.dop-add').addClass('active');
									} else {
										$(this).find('.dop-add').removeClass('active');
									}
								});
							}
						}
						break;
					} else {
						$(popup).find('.dop-list li .dop-add').removeClass('active');
					}
				}
			} else {
				if ( dobMas.dob.length ){
					if ( dobMas.prodId == prod_id ){
						for (var j = 0; j < dobMas.dob.length; j++){
							$(popup).find('.dop-list li').each(function(){
								if ( $(this).attr('id') == dobMas.dob[j].dobId ){
									$(this).find('.dop-add').addClass('active');
								} else {
									$(this).find('.dop-add').removeClass('active');
								}
							});
						}
					} else {
						$(popup).find('.dop-list li .dop-add').removeClass('active');
					}
				} else {
					$(popup).find('.dop-list li .dop-add').removeClass('active');
				}
			}
		}
		$(el).click();
		return false;
	});

	$('.fancybox-a-wine').click(function(){
		var el = $(this).attr('href');
		var popup = $(el).attr('href');
		var name = $(this).parents('li').find('.name').text();
		var op = $(this).parents('li').find('.text p').text();

		$(popup).find('.name').text(name);
		$(popup).find('.op').text(op);
		$(el).click();
		return false;
	});

});
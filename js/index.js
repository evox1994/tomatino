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

	if (location.hash){
		setTimeout(function(){
			$('body,html').animate({scrollTop: $(location.hash).offset().top - 70},800);
		}, 500);
	}

	$('.scroll-btn').click(function(){
		var el = $(this).attr('href');
		var des = $(el).offset().top - 70;
		$('html,body').animate({scrollTop: des},800);
		$('.mobile-btn').removeClass('active');
		$('.mobile-menu').removeClass('active');
		$('body').removeClass('active');
		location.hash = el;
		return false;
	});

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

	$('.col .more').on('click',function(){
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

	$('.col .less').on('click',function(){
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
			/*if ( order[numt].dob.length ){
				for (var i = 0; i < order[numt].dob.length; i++){
					order[numt].price = Number(order[numt].price) - Number(order[numt].dob[i].price);
				}
				$(prod).find('.price-wrap .price span').text(order[numt].price);
			}*/
			order.splice(numt,1);
			$(prod).find('.col').removeClass('active');
			$(popup).find('.col').removeClass('active');
		}
		$('.header-basket span b').text(summa);
		qwe = JSON.stringify(order);
		localStorage.setItem("tomatino-order",qwe);
		localStorage.setItem("tomatino-summa",summa);
	});

	$('.add-btn').on('click',function(){
		var nal = false;
		var prod = $(this).attr('href');
		var prod_id = $(prod).attr('id');
		var clone = {};
		var numt = 0;
		var coli = 0;
		var qwe;
		var el = $(prod).find('.fancybox-a').attr('href');
		var popup = $(el).attr('href');
		var dobavka = {};

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
		var provid = prod_id.split('_');
		var provdob;
		orderEl.dob = [];
		if ( provid.length > 1 ){
			for (var j = 1; j < provid.length; j++){
				$(popup).find('.dop-list li').find('.dop-add').each(function(){
					provdob = $(this).attr('data-dob').replace('_','');
					if (provdob == provid[j]){
						dobavka.name = $(this).parents('li').find('.dop-name').text();
						dobavka.price = Number($(this).parents('li').find('.price-wrap .price span').text());
						dobavka.dobId = $(this).parents('li').attr('id');
						dobavka = {};
					}
				});
			}
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

	$('.dop-add').on('click',function(){
		var nal = false;
		var prod = $(this).attr('href');
		var prod_id = $(prod).attr('id');
		var clone = {};
		var dobavka = {};
		var dobavkaMas = [];
		var numt = 0;
		var coli = 0;
		var numd = 0;
		var el = $(prod).find('.fancybox-a').attr('href');
		var popup = $(el).attr('href');
		var dob = $(this).attr('data-dob');
		var newprodid = prod_id;
		var qwe;
		/*Смена id товара*/
		if ( $(this).hasClass('active') ){
			newprodid = newprodid.replace(dob,'');
		} else {
			newprodid = prod_id + dob;
			var newprodid2 = newprodid.split('_');
			for (var i = 1; i < newprodid2.length; i++){
				newprodid2[i] = newprodid2[i].replace('d','');
			}
			if ( newprodid2.length > 2 ){
				for (var i = 1; i < (newprodid2.length - 1); i++){
					var ii = i;
					for (var j = newprodid2.length - 1; j > i; j--){
						if ( Number(newprodid2[i]) > Number(newprodid2[j]) ){
							var temp = newprodid2[i];
							newprodid2[i] = newprodid2[j];
							newprodid2[j] = temp;
						} else {
							break;
						}
					}
				}
				newprodid = newprodid2.join('_d').toString();
			}
		}
		//$(this).toggleClass('active');
		$(this).parents('.popup').find('.dop-add').attr('href','#'+newprodid);
		$(prod).attr('id',newprodid);
		$(this).parents('.popup').find('.add-btn').attr('href','#'+newprodid);
		prod = $(this).attr('href');
		prod_id = $(prod).attr('id');
		$(prod).find('.add-btn').attr('href',prod);

		orderEl.price = Number($(prod).find('.price-wrap .price span').text());
		orderEl.prodId = prod_id;
		dobMas.prodId = prod_id;
		orderEl.name = $(prod).find('.name').text();
		$(prod).find('.col').removeClass('active');
		$(popup).find('.col').removeClass('active');
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
				$(prod).find('.col').addClass('active');
				$(popup).find('.col').addClass('active');
				orderEl.dob = [];
				for (var i = 0; i < order[numt].dob.length; i++){
					orderEl.dob.push(order[numt].dob[i]);
				}
			} else {
				orderEl.col = 0;
			}
		} else {
			orderEl.col = 0;
		}
		$(prod).find('.col p').text(orderEl.col);
		$(popup).find('.col p').text(orderEl.col);
		dobavka.name = $(this).parents('li').find('.dop-name').text();
		dobavka.price = Number($(this).parents('li').find('.price-wrap .price span').text());
		dobavka.dobId = $(this).parents('li').attr('id');
		if ( $(this).hasClass('active') ){
			$(this).removeClass('active');
			if ( orderEl.dob.length ){
				for (var j = 0; j < orderEl.dob.length; j++){
					dobavkaMas.push(orderEl.dob[j]);
					if ( orderEl.dob[j].dobId == $(this).parents('li').attr('id') ){
						numd = j;
					}
				}
			} else {
				dobavkaMas.push(dobavka);
			}
			orderEl.price = orderEl.price - dobavkaMas[numd].price;
			$(prod).find('.price-wrap .price span').text( orderEl.price );
			$(this).parents('.popup').find('.popup-wrap .price-wrap .price span').text( orderEl.price );
			dobavkaMas.splice(numd,1);
			orderEl.dob = dobavkaMas;
			dobMas.dob = dobavkaMas;
		} else {
			$(this).addClass('active');
			orderEl.price = orderEl.price + dobavka.price;
			$(prod).find('.price-wrap .price span').text( orderEl.price );
			$(this).parents('.popup').find('.popup-wrap .price-wrap .price span').text( orderEl.price );
			if ( orderEl.dob.length ){
				for (var j = 0; j < orderEl.dob.length; j++){
					if (!(orderEl.dob[j].dobId == dobavka.dobId)){
						dobavkaMas.push(orderEl.dob[j]);
					}
				}
			}
			dobavkaMas.push(dobavka);
			orderEl.dob = dobavkaMas;
			dobMas.dob = dobavkaMas;
		}
		return false;
	});

	$('.fancybox-a').on('click',function(){
		var el = $(this).attr('href');
		var popup = $(el).attr('href');
		var coli = $(this).parents('.pr').find('.col p').text();
		var name = $(this).parents('.pr').find('.name').text();
		var op = $(this).parents('.pr').find('.text p').text();
		var price = $(this).parents('.pr').find('.price span').text();
		var prod_id = $(this).parents('.pr').attr('id');
		var prod = '#'+prod_id;
		var dobavka = {};
		var dobavkaMas = [];

		$(popup).find('.popup-wrap .add-btn').attr('href','#'+prod_id);
		$(popup).find('.popup-wrap .name').text(name);
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
			orderEl.price = Number($(prod).find('.price-wrap .price span').text());
			orderEl.prodId = prod_id;
			orderEl.name = $(prod).find('.name').text();
			orderEl.col = coli;
			if (order.length){
				for (var i = 0; i < order.length; i++) {
					if ( order[i].prodId == prod_id ) {
						if ( order[i].dob.length ){
							$(popup).find('.dop-list li .dop-add').removeClass('active');
							for (var j = 0; j < order[i].dob.length; j++){
								$(popup).find('.dop-list li').each(function(){
									if ( $(this).attr('id') == order[i].dob[j].dobId ){
										$(this).find('.dop-add').addClass('active');
									}
								});
							}
						} else {
							$(popup).find('.dop-list li .dop-add').removeClass('active');
						}
						break;
					} else {
						$(popup).find('.dop-list li .dop-add').removeClass('active');
						var provid = prod_id.split('_');
						var provdob;
						if (provid.length > 1) {
							orderEl.dob = [];
							for (var j = 1; j < provid.length; j++){
								$(popup).find('.dop-list li').find('.dop-add').each(function(){
									provdob = $(this).attr('data-dob').replace('_','');
									if (provdob == provid[j]){
										dobavka.name = $(this).parents('li').find('.dop-name').text();
										dobavka.price = Number($(this).parents('li').find('.price-wrap .price span').text());
										dobavka.dobId = $(this).parents('li').attr('id');
										$(this).addClass('active');
										orderEl.dob.push(dobavka);
										dobavka = {};
									}
								});
							}
						}
					}
				}
			} else {
				$(popup).find('.dop-list li .dop-add').removeClass('active');
				var provid = prod_id.split('_');
				var provdob;
				if (provid.length > 1) {
					orderEl.dob = [];
					for (var j = 1; j < provid.length; j++){
						$(popup).find('.dop-list li').find('.dop-add').each(function(){
							provdob = $(this).attr('data-dob').replace('_','');
							if (provdob == provid[j]){
								dobavka.name = $(this).parents('li').find('.dop-name').text();
								dobavka.price = Number($(this).parents('li').find('.price-wrap .price span').text());
								dobavka.dobId = $(this).parents('li').attr('id');
								$(this).addClass('active');
								orderEl.dob.push(dobavka);
								dobavka = {};
							}
						});
					}
				}
			}
		}
		$(el).click();
		return false;
	});

	$('.fancybox-a-wine').on('click',function(){
		var el = $(this).attr('href');
		var popup = $(el).attr('href');
		var name = $(this).parents('li').find('.name').text();
		var op = $(this).parents('li').find('.text p').text();

		$(popup).find('.popup-wrap .name').text(name);
		$(popup).find('.op').text(op);
		$(el).click();
		return false;
	});

});
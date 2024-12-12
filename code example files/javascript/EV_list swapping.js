var data_global = [];
var section_data_global = [];
var large_section_data_global = [];
var previous_data_global = [];
var large_previous_data_global = [];
var news_data_global = [];
var previous_news_data_global = [];
var section_news = [];
var section_previous_news = [];
var carnames_global = [];
var randomized_boxes = [];
var set = 0;
var maxSets = 0;
var z = 0;
//var colors=['rgb(200, 108, 0)', 'rgb(255, 108, 0)', 'rgb(255, 70, 0)', 'rgb(215, 108, 0)', 'rgb(220, 108, 0)', '#770000', '#880000', '#990000', '#cc0000', '#ff0000'];
var colors=['#001111', '#002222','#220077', '#220099', '#220088', '#220077', '#004444', '#007777', '#00aaaa', '#00cccc'];

_ = function(id) {
	return document.getElementById(id);
}

car = function(_model, brand, efficiency, range, useable_battery, top_speed, acceleration, motor_power, torque, price, weight, length, rand_value, rand_difference, percentage, sign, symbol) {
		this._model = _model;
		this.brand = brand;
		this.efficiency = efficiency;
		this.range = range;
		this.useable_battery = useable_battery;
		this.top_speed = top_speed;
		this.acceleration = acceleration;
		this.motor_power = motor_power;
		this.torque = torque;
		this.price = price;
		this.weight = weight;
		this.length = length;
		this.rand_value = rand_value;
		this.rand_difference = rand_difference;
		this.percentage = percentage;
		this.sign = sign;
		this.symbol = symbol;
}

news = function(date, news) {
	this.date = date;
	this.news = news;
}

load_cars_from_JSON= function() {
	JSON.parse(data_all).forEach((value, index) => {carnames_global[index] = value.name; 
	const c = new car(value.name, value.brand, -value['efficiency']*-1, -value['range']*-0.5, -value['useable_battery']*-1, 
	-value['top_speed']*-1, -value['acceleration']*-0.01, -value['motor_power']*-1, -value['torque']*-1, 
	-value['price']*-1, -value['weight']*-0.001, -value['length']*-60); data_global.push(c);
	});
}

load_news_from_JSON= function() {
	JSON.parse(data_news).forEach((value, index) => {
	const n = new news(value.date, value.news); news_data_global.push(n);
	});
	previous_news_data_global = news_data_global;
	previous_news_data_global.pop();
}

load_cars_from_JSON();
load_news_from_JSON();
maxSets = Math.ceil(((data_global.length)/10));

update_data = function() {
	z = 10;

update_value = function() {
		section_data_global = data_global.slice(set*z, set*z + z);
		large_section_data_global = data_global.slice(set*z, set*z + z*2);
		if(set > 0) {
			previous_data_global = data_global.slice((set-1)*z, (set-1)*z + z);
			large_previous_data_global = data_global.slice((set-1)*z, (set-1)*z + z*2);
		}
		animateNews();
		randomized_boxes = [randomize(), randomize(), randomize(), randomize(), randomize(), randomize(), randomize(), randomize(), randomize(), randomize(), randomize(), randomize(), randomize(), randomize(), randomize(), randomize(), randomize(), randomize(), randomize(), randomize()];
		count_sets();
	}

	animateNews = function() {
		section_news = news_data_global;
		addedNews = news_data_global[news_data_global.length - 1];
		section_news.unshift(addedNews);
		section_previous_news = previous_news_data_global;
		section_previous_news.pop();
	}

	randomize = function() {
		return Math.round(Math.random()*100) + 200;
	}

	count_sets = function() {
		set++;
		if (set >= maxSets && z==10 || set >= 4 && z==20) {
			reset_sets();
		}
		else {
			show_cars();
		}
	}

	reset_sets = function() {
		set = 0;
		update_data();
	}

	show_cars = function() {
		let option_array = new Array;
		option_array.push('<table id="list">');
		option_array.push(header('MPOWER','TORQUE', 'WGHT', 'BATT'));
		for(var i in large_section_data_global) {
			option_array.push(line(i, large_section_data_global[i].motor_power, large_section_data_global[i].torque, large_section_data_global[i].weight.toPrecision(3), large_section_data_global[i].useable_battery));
		}
		option_array.push(header('TSPEED', 'RANG', 'ACC', 'PR'));
		for(var i in large_previous_data_global) {
			option_array.push(previous_line(i, large_previous_data_global[i].top_speed, large_previous_data_global[i].range, large_previous_data_global[i].acceleration.toPrecision(2), large_previous_data_global[i].price));
		}
		option_array.push('</table>');
		return option_array.join('');
	}

	header = function(h1, h2, h3, h4) {
		return '<tr class="table2_properties" cellspacing="0"><th class="table_headcolumn">' + 'MODEL' + '</th><th class="table_headcolumn1">' + h1 + '</th><th class="table_headcolumn2">' + h2 + '</th><th class="table_headcolumn4">' + h3 + '</th><th class="table_headcolumn5">' + h4 + '</th></tr>';
	}

	line = function(i, c1, c2, c3, c4) {
		let a, b, car_model;
		car_model = large_section_data_global[i]._model.slice(0, 14);
		a = '<tr class="table_properties"><td class="table_column">' + car_model;
		b = '</td><td class="table_column1">' + c1 + '</td><td class="table_column2">' + Math.round(c2) + '</td><td class="table_column4">' + c3 + '</td><td class="table_column5">' + Math.round(c4) + '</td></tr>';
		return a + b;
	}

	previous_line = function(i, c1, c2, c3, c4) {
		let a, b, car_model;
		car_model = large_previous_data_global[i]._model.slice(0, 14);
		a = '<tr class="table_properties"><td class="table_column">' + car_model;
		b = '</td><td class="table_column1">' + c1  + '</td><td class="table_column2">' + Math.round(c2) + '</td><td class="table_column4">' + c3 + '</td><td class="table_column5">' + Math.round(c4) + '</td></tr>';
		return a + b;
	}

	update_value();
	_("EV_list").innerHTML = show_cars();
}

//(C) Marcus Eriksson 2024





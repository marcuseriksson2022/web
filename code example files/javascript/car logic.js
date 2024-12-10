var property_global;
var index1;
var index2;
var indexOfMaxValue;
var data_array_global = [];
var carnames_global = [];
var selected_brand_global;
var brand_array_global = [];
var brand_global;
var i_global;

car = function(_model, efficiency, range, useable_battery, top_speed, acceleration, motor_power, torque, price, weight, length) {
		this._model = _model;
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
		getBrand = function(_model) {
			return _model.split(' ')[0];
		}
		this.brand = getBrand(_model);
}

load_cars_from_JSON = function() {
	JSON.parse(data_all).forEach((value, index) => {carnames_global[index] = value.name; 
		const c = new car(value.name, -value['efficiency']*-1, -value['range']*-0.5, -value['useable_battery']*-3, 
		-value['top_speed']*-1, -value['acceleration']*-0.25, -value['motor_power']*-0.5, -value['torque']*-0.25, 
		-value['price']*-1.5, -value['weight']*-0.1, -value['length']*-60); data_array_global.push(c);
	});
}
load_cars_from_JSON();

getBrands = function() {
	brands = data_array_global.map(p => p.brand).filter((brand, i, a) => a.indexOf(brand) == i).sort();
	let option_array = [];
	for(var i=0; i<brands.length; i++ ) {
		if (brands[i] === brand_global) {
			option_array.push('<option id="' + brand_global + '" selected>' + brands[i] + '</option>');
		}
		else {
			option_array.push('<option id="' + brands[i] + '" >' + brands[i] + '</option>');
		}
	}
	return option_array;
}

_ = function(id) {
	return document.getElementById(id);
}

diplay_brand_box = function() {
	_("brand").style = "display: block;";
	_("brand_select_box").style = "display: block;";
}

hide_brand_box = function() {
	_("brand").style = "display: none;";
	_("brand_select_box").style = "display: none;";
}

show = function () {
	var all_data;
	var perf_option;
	var ch_array = [];
	var brands = [];
	var canvas = document.querySelector("#animation3");
	var ctx = canvas.getContext('2d');
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	var colors=['#002200', '#003300', '#004400', '#005500', '#006600', '#007700', '#008800', '#009900', '#00cc00', '00ff00'];
	var heading;
	
	(function() {
		var title = document.querySelector("#title");
	})();

	getPerformanceOptions = function () {
		for(var s=0; s<perf_options.options.length; s++) {
			if (perf_options.options[s].selected===true) {
		    	switch (s) {
	    		case 0:
	    			perf_option = 'high';
	    			setIndex(0,10);
	    			break;
		    	case 1:
	    			perf_option = 'moderate';
	    			setIndex(10,20);
	    			break;
	    		case 2:
	    			perf_option = 'intermediate';
	    			setIndex(20,30);
	    			break;
	    		case 3:
	    			perf_option = 'mid';
	    			setIndex(30,40);
	    			break;
	    		case 4:
	    			perf_option = 'low';
	    			setIndex(40,50);
	    			break;
	    		case 5:
	    			perf_option = 'very low';
	    			setIndex(50,60);
	    			break;
	    		case 6:
	    			perf_option = 'really low';
	    			setIndex(60,70);
	    			break;
	    		case 7:
	    			perf_option = 'ultra low';
	    			setIndex(70,80);
	    			break;
	    		case 8:
	    			perf_option = 'extremely low';
	    			setIndex(80,90);
	    			break;
	    		case 9:
	    			perf_option = 'by brand';
	    			display_brands();
	    		default:
	    			perf_option = '';
	    			break;
		    	}
    		}
    	}
    	if (brand_array_global.length > 0 && brand_global != undefined) {
    		heading = 'Comparison of ' + brand_global + ' EVs'+ ' performance';
    	}
    	else {
	    	heading = 'Comparison of EVs with ' + perf_option + ' performance';
    	}
    	_("text").innerHTML = heading;
	}

	setIndex = function(i1, i2) {
		index1=i1;
		index2=i2;
		brand_array_global = [];
	    hide_brand_box();
	}

	display_brands = function() {
		index1=0;
		index2=10;
		diplay_brand_box();
	}

	getProperty = function () {
		ch_array = document.getElementsByTagName('input');
		if (_('a').checked || _('p').checked){
			for(var c=0; c<ch_array.length; c++) {
				if (_(ch_array[c].id).checked){
					switch (ch_array[c].id) {
		    		case 'a':
		    			getData('Acceleration time, 0-100 km/h [s]', 'Acceleration time', 'acceleration', 50, 50, 44, 10, 2, 14, 7, 0.25);
		    			break;
		    		case 'p':
		    			getData('Price [thousand GBP]', 'Price', 'price', 30, 100, 94, 5, 20, 200, 10, 1.5);
		    			break;
		    		}
					indexOfMaxValue = all_data.indexOf(Math.max(...all_data))+1;
				}
			}
		}
		else {
			for(var c=0; c<ch_array.length; c++) {
				if (_(ch_array[c].id).checked){
					switch (ch_array[c].id) {
		    		case 'e':
		    			getData('Efficiency [Wh/km]', 'Efficiency', 'efficiency', 100, 100, 94, 10, 100, 300, 3, 1);
		    			break;
		    		case 'r':
		    			getData('Range [km]', 'Range', 'range', 50, 50, 44, 0, 100, 700, 7, 0.5);
		    			break;
		    		case 'u':
		    			getData('Useable battery [kWh]', 'Useable battery kWh', 'useable_battery', 30, 40, 34, 5, 10, 120, 12, 3);
		    			break;
		    		case 't':
		    			getData('Top speed [km/h]', 'Top speed', 'top_speed', 100, 100, 94, 0, 100, 300, 3, 1);
		    			break;
		    		case 'm':
		    			getData('Motor power [kW]', 'Motor power', 'motor_power', 50, 50, 44, 0, 100, 700, 7, 0.5);
		    			break;
		    		case 'tq':
		    			getData('Torque [Nm]', 'Torque', 'torque', 50, 50, 44, 0, 200, 1400, 7, 0.25);
		    			break;
			    	case 'w':
		    			getData('Weight [tonne]', 'Weight', 'weight', 100, 100, 94, 10, 1, 3, 3, 0.1);
		    			break;
			    	case 'l':
		    			getData('Length [m]', 'Length', 'length', 60, 100, 94, 10, 1, 5, 5, 60);
		    			break;
			    	}
					indexOfMaxValue = all_data.indexOf(Math.min(...all_data))+1;
				}
			}
		}
	}

	getData = function(label, property_title, property, yfactor, yvalue, y_adjust, x_adjust, xfactor, xvalue, amount_ylines, corr_nr) {
		getAllCars();
		check_if_show_by_brand_clicked();
		create_settings_object(label, property_title, property, yfactor, yvalue, y_adjust, x_adjust, xfactor, xvalue, amount_ylines);
		sort_after_property(property);
		get_car_section();
		get_carnames();
	}

	getAllCars = function() {
		all_data = data_array_global;
	}

	check_if_show_by_brand_clicked = function() {
		if (brand_array_global.length > 0) {
			all_data = brand_array_global;
		}
	}

	create_settings_object = function(label, property_title, property, yfactor, yvalue, y_adjust, x_adjust, xfactor, xvalue, amount_ylines) {
		s = new settings(label, property_title, property, yfactor, yvalue, y_adjust, x_adjust, xfactor, xvalue, amount_ylines);
		property_global=property;
	}

	get_car_section = function() {
		all_data=all_data.slice(index1,index2);
	}

	get_carnames = function() {
		all_data.forEach((a,i) => {carnames_global[i] = a._model;});
	}

	sort_after_property = function(property) {
		all_data.sort((a, b) => {
			switch(property) {
			case 'efficiency':
  				return b.efficiency - a.efficiency;
  				break;
  			case 'range':
  				return b.range - a.range;
  				break;
  			case 'useable_battery':
  				return b.useable_battery - a.useable_battery;
  				break;
  			case 'top_speed':
  				return b.top_speed - a.top_speed;
				break;
			case 'acceleration':
				return a.acceleration - b.acceleration;
				break;
			case 'motor_power':
				return b.motor_power - a.motor_power;
				break;
			case 'torque':
				return b.torque - a.torque;
				break;
			case 'price':
				return a.price - b.price;
				break;
			case 'weight':
				return a.weight - b.weight;
				break;
			case 'length':
				return b.length - a.length;
				break;
			default:
				return null;
				break;
    		}
		});
	}

	settings = function(label, property_title, property, yfactor, yvalue, y_adjust, x_adjust, xfactor, xvalue, amount_ylines) {
		this.label = label;
		this.property_title = property_title;
		this.property = property;
		this.yfactor = yfactor;
		this.yvalue = yvalue;
		this.y_adjust = y_adjust;
		this.x_adjust = x_adjust;
		this.xfactor = xfactor;
		this.xvalue = xvalue;
		this.amount_ylines = amount_ylines;
	}
	
    getPerformanceOptions();
	getProperty();
	_("property_title").innerHTML = s.property_title;
	_("brand_select_box").innerHTML = getBrands();
	yaxis();
	xlabel();
    initialize();
	draw_staples();
}

show_by_brand = function() {
	let brand_array = [];
	for(var i=0; i<brand_select_box.length; i++ ) {
		if (brand_select_box.options[i].selected===true) {
			brand_array = data_array_global.filter(r => r.brand == brands[i]);
			i_global = i;
		}
	}
	brand_global = brands[i_global];
	brand_array_global = brand_array;
	show();
}

//(C) Marcus Eriksson 2024





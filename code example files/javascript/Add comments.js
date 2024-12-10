var c_array = [];
var data_array = [];
var style_data = {
	"commentdiv": "#comment{height: 240px; width: 400px; color: #000; background-color: #fff; text-align: center;}",
	"titlerow": "#titlerow{height: 10%; width: 100%; color: #fff; background-color: darkblue; font-weight: bold; font-family: Arial; font-size: 20px; vertical-align: middle;}",
	"imagerow": "#imagerow{height: 40%; width: 100%;}",
	"namerow": "#namerow{height: 15%; font-size: 12px; font-weight: bold; font-family: Arial;}",
	"commentrow": "#commentrow{height: 35%; font-size: 14px; font-weight: plain; font-family: Arial;}"
}
var users = {
	"Marcus": {
		"parameters": {
			"firstName": 'Marcus',
			"lastName": 'Eriksson',
			"imgSrc": "Marcus.jpg",
			"commentText": "Normally, I would agree, but in this case I don't. Some of these things may associate to something completely different. Under such circumstances, there are several ways to interpret your statement."
		}
	},
	"Alice": {
		"parameters": {
			"firstName": 'Alice',
			"lastName": 'Andersson',
			"imgSrc": "Alice.jpg",
			"commentText": "I have a lot of things to say but only a few opinions."
		}
	},
	"William": {
		"parameters": {
			"firstName": 'William',
			"lastName": 'Svensson',
			"imgSrc": "William.jpg",
			"commentText": "Things do easily get complicated."
		}
	},
	"Natalie": {
		"parameters": {
			"firstName": 'Natalie',
			"lastName": 'Sandgren',
			"imgSrc": "Natalie.jpg",
			"commentText": "Most of last year was a disappointment. I think 2024 will be much better."
		}
	}
}

 _ = function (element) {
 	return document.createElement(element)
 }

 g = function(id) {
 	return document.getElementById(id);
 }
/*var c='<div id="comment"><section id="titlerow">Comment</section><section id="imagerow"><img src="2018.jpg" width="72px" height="80px" style="border: 8px solid #fff;border-radius: 100%"></section><section id="namerow">Marcus Eriksson, {{getCurrentTime()}}</section><section id="commentrow">Normally, I dont agree, but in this case I do. Some of these things may associate to something completely different. Under such circumstances, there are several ways to interpret your statement.</section></div>';*/
var firstName;
var lastName;
var imgSrc;
var commentText;
var selected_user;

select_user = function() {

	getUser = function(user) {
        firstName = user.firstName;
        lastName = user.lastName;
        imgSrc = user.imgSrc;
        selected_user = user;
    }

	for(var s=0; s<user_options.options.length; s++) {
		if (user_options.options[s].selected===true)	{
	    	switch (s) {
    		case 0:
				getUser(users.Alice.parameters);
    			break;
    		case 1:
				getUser(users.Marcus.parameters);
				console.log(Object.keys(users.Marcus.parameters));
    			break;
			case 2:
				getUser(users.Natalie.parameters);
    			break;
    		case 3:
				getUser(users.William.parameters);
    			break;
			default:
				getUser(null);
				break;
			}
		}
    }
}

add_comment = function() {
	commentText = g('commentText').value;
	if (selected_user != undefined && commentText != "") {
		var timestamp = getCurrentTime();
		c = new comment(firstName, lastName, imgSrc, timestamp, commentText);
		create_comment_box(c);
		get_comment_area();
	}
	else {
		alert('Write a text before you submit the comment.');
	}

}

create_comment_box = function(c) {
	var div = create_div('comment');
	create_sections(div,create_image_element());
	apply_styles(div);

	var area = get_comment_area(div);

	push_array(c_array, div.outerHTML);
	push_array(data_array, c);
	store_data(data_array);
}

create_image_element = function(div,img) {
	var img = _('img');
	img.src = c.imgsrc;
	setAttributes(img, 'width', '72px');
	setAttributes(img, 'height', '80px');
	img.style = "border: 8px solid #fff; border-radius: 100%";
	return img;
}

setAttributes = function(image, attribute, value) {
	image.setAttribute(attribute, value);
}

get_comment_area = function(div) {
	area = g("div_area").appendChild(div);
	return area;
}

get_comment_area = function() {
	area = g("div_area").innerHTML = c_array;
	return area;
}

create_div = function(id) {
	div = _('div');
	div.id = id;
	return div;
}

push_array = function(a, b) {
	a.push(b);
}

create_sections = function(div,img) {
	var section;
	for (var a=1; a<Object.keys(style_data).length; a++) {
		switch (a) {
		case 1:
			add_section("Comment", a, div);
			break;
		case 2:
			add_section(img, a, div);
			break;
		case 3:
			add_section(c.firstName + " " + c.lastName + ", " + c.timestamp, a, div);
			break;
		case 4:
			add_section(c.commentText, a, div);
			break;
		default:
			alert('No more sections to add.')
			break;
		}
	}
}

add_section = function(content,a,div) {
	section = _('section');
	section.id = Object.keys(style_data)[a];
	if (a===2) {
		section.appendChild(content);
	}
	else {
		section.appendChild(document.createTextNode(content));
	}
	div.appendChild(section);
}

apply_styles = function(div) {
	var el_length = div.childNodes.length;
	for (var a=-1; a<el_length; a++) {
		div_styles = _('style');
		if (a===-1){
			div_styles.textContent = style_data["commentdiv"];
		}
		else {
	    	div_styles.textContent = style_data[div.childNodes[a].id];
		}
	    div.appendChild(div_styles);
	};
}

store_data = function(data_array) {
	var stringCommentArray = [];
	var JSONcommentArray = [];
	console.log('Comments: ' + data_array.length);
	stringCommentArray = JSON.stringify(data_array); //convert JSON data_array into string
	localStorage.setItem("commentArray", stringCommentArray); //save it with local storage
	JSONcommentArray = JSON.parse(stringCommentArray); //convert string back into JSON
	JSONcommentArray = JSON.parse(localStorage.getItem("commentArray"));
	for(var a=0; a<JSONcommentArray.length; a++){
		console.log(JSONcommentArray[a]);
	}
}

hide = function() {
	b = document.getElementById("div_area").innerHTML = '';
	c_array = [];
}

comment = function(firstName, lastName, imgsrc, timestamp, commentText) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.imgsrc = imgsrc;
	this.timestamp = timestamp;
	this.commentText = commentText;
}

getCurrentTime = function() {
	var d=new Date();
	var months=['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var month=months[d.getMonth()];
	var date = d.getDate() + " " + month + " " + d.getFullYear();
	var hours, minutes, seconds;
	if (d.getHours() < 10)
	  hours=(" " + "0" + d.getHours());
	else
	  hours=(" " + d.getHours());
	if (d.getMinutes() < 10)
	  minutes=("0" + d.getMinutes());
	else
	  minutes=(d.getMinutes());
	if (d.getSeconds() < 10)
	  seconds=("0" + d.getSeconds());
	else
	  seconds=(d.getSeconds());
	var time = hours + ":" + minutes + ":" + seconds;
	return time + ", " + date;
}





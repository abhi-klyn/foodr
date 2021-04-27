function firstFunc(){
 	document.getElementById("yolo").innerHTML = "Hello World!";
}

function secondFunc(){
	window.location.href='./customer.html';
}

function populate() {
    // var img=document.createElement("img");
    // img.src="https://www.google.co.in/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
    // img.id="picture"

    // let food_div = document.createElement("div")
    // food_div.classList.add('row');
    // food_div.classList.add('row-sm');
    // food_div.h4 = "Falafel";
    // food_div.price = "10$";
    // food_div.qty = "3";
    // var foo = document.getElementById("test1");
    // foo.appendChild(food_div);
    var fname = "New Pita bread";
    var price = "50.00";
    var qty = "3";
    var str = '<div class="row-sm row"><h4 id="dname">'+fname+'</h4><h5 id="price">'+price+'</h5><h5 id="qty">Quantity : '+qty+'</h5></div>',
    // var str = '<p>Some more <span>text</span> here</p>',
    div = document.getElementById( 'test1' );
	div.insertAdjacentHTML( 'beforeend', str );
}

function add_item(objButton) {
	alert(objButton.value);
}




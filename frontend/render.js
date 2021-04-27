function firstFunc(){
 	document.getElementById("yolo").innerHTML = "Hello World!";
}

function secondFunc(){
	window.location.href='./customer.html';
}

// function populate() {
//     var apigClient = apigClientFactory.newClient({apiKey: "y1yJqKthiV3ceJlZu4Kps6XYcPpq9uf2aHPWOfsY"});

//     var fname = "New Pita bread";
//     var price = "50.00";
//     var qty = "3";
//     var str = '<div class="row-sm row"><h4 id="dname">'+fname+'</h4><h5 id="price">'+price+'</h5><h5 id="qty">Quantity : '+qty+'</h5></div>',
//     // var str = '<p>Some more <span>text</span> here</p>',
//  //    div = document.getElementById( 'test1' );
// 	// div.insertAdjacentHTML( 'beforeend', str );

//     var additionalParams = {headers: {
//         'Content-Type':"application/json"
//     }};

//     var params = {"Content-Type" : "application/json" };
//     var body = {"username":test,  "emailID":test1};


//     apigClient.rootPost(params,body,additionalParams).then(function(res){
//           console.log(res);
//             if(res.status==200){
//             console.log(res);
//                 document.getElementById('outputXX').value=res;

//         }
//     });

// }

function add_item(objButton) {
	alert(objButton.value);
}

function foodFilter(){
    var dname = document.getElementById('dname').value;
    var rname = document.getElementById('rname').value;
    var dietTag1 = document.getElementById('dietTag1').value;
    var calories = document.getElementById('max-calories').value;
}







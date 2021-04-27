function firstFunc(){
    var trial = sessionStorage.getItem("emailIDItem");
    console.log('trial : ', trial);
    console.log("YAY!")	
}

function secondFunc(){
    var trial = document.getElementById('trial').innerHTML;
    sessionStorage.setItem("trialItem", trial);
    window.location.href='./customer.html';
}

function getFiltered() {
    div = document.getElementById('filterResults');
    div.innerHTML = "";
    console.log("Inside getFiltered");
    document.getElementById("filterResults").hidden = false;

    // get data from the search function and display below
    var fname = "New Pita bread";
    var price = "50.00";
    var qty = "3";
    var str = '<div class="row-sm row"><h4 id="dname">'+fname+'</h4><h5 id="price">'+price+'</h5><h5 id="qty">Quantity : '+qty+'</h5></div>';
    div.insertAdjacentHTML('beforeend', str);
}

function add_item(objButton) {
	alert(objButton.value);
}

function foodFilter(){
    var foodName = document.getElementById('dname').value;
    var rName = document.getElementById('rname').value;
    var tag = document.getElementById('dietTag1').value;
    var calories = document.getElementById('max-calories').value;

    var apigClient = apigClientFactory.newClient(
        {apiKey: "y1yJqKthiV3ceJlZu4Kps6XYcPpq9uf2aHPWOfsY"}
    );

    var additionalParams = {headers: {
        'Content-Type':"application/json"
    }};

    console.log(foodName);
    console.log(rName);
    console.log(tag);
    console.log(calories);

    var params = {"Content-Type" : "application/json" };
    // var body = {"username":dname,  "emailID":rname};
    var body = {"foodName":foodName, "rName":rName, "tag":tag,"calories":calories};
    console.log('body : ', body);
    apigClient.searchPost(params,body,additionalParams).then(function(res){
          console.log(res);
          if(res.status==200){
            console.log('res : ', res);
            // document.getElementById('outputXX').value=res;
            document.getElementById("outputXX").hidden = false;
          }
          else{
            console.log("FAILURE");
          }
       });
}


function onLogin(){
    var emailID = document.getElementById('email-address').value;
    // console.log('emailID : ', emailID);
    sessionStorage.setItem("emailIDItem", emailID);
    window.location.href='./customer.html';

}







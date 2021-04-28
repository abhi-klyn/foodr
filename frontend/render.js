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

// function getFiltered() {
//     div = document.getElementById('filterResults');
//     div.innerHTML = "";
//     console.log("Inside getFiltered");
//     document.getElementById("filterResults").hidden = false;

//     // get data from the search function and display below
//     var fname = "New Pita bread";
//     var price = "50.00";
//     var qty = "3";
//     var str = '<div class="row-sm row"><h4 id="dname">'+fname+'</h4><h5 id="price">'+price+'</h5><h5 id="qty">Quantity : '+qty+'</h5></div>';
//     div.insertAdjacentHTML('beforeend', str);
// }

function onFilter(){
    console.log("Inside onFilter")
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

    // console.log(foodName);
    // console.log(rName);
    // console.log(tag);
    // console.log(calories);

    var params = {"Content-Type" : "application/json" };
    var body = {"foodName":foodName, "rName":rName, "tag":tag,"calories":calories};
    console.log('body : ', body);
    apigClient.searchPost(params,body,additionalParams).then(function(res){
          console.log(res);
          if(res.status==200){
            console.log('res : ', res);
            // document.getElementById('outputXX').value=res;
            // document.getElementById("outputXX").hidden = false;
            console.log(typeof res);
            var myJSON = JSON.stringify(res);
            console.log("json: ", myJSON)
            localStorage.setItem('filteredFoodRes', myJSON);
            newr = localStorage.getItem('filteredFoodRes');
            console.log('checkNew : ', newr);
            window.location.href='./food.html';            
          }

       });

}

function foodFilter(){
    newr = localStorage.getItem('filteredFoodRes');
    console.log('checkNew : ', newr);
    var res = JSON.parse(newr);
    //console.log('checkNew : ', res.data.solutions);
    div = document.getElementById('filterResults');
    // div.innerHTML = "";
    console.log("Inside foodFilter");
    document.getElementById("filterResults").hidden = false;
    console.log(res.data.solutions[0]);
    console.log('hi:)');
    for (i = 0; i < res.data.solutions.length; i++) {
        var rName = res.data.solutions[i][0];
        var foodName = res.data.solutions[i][1];
        var price = res.data.solutions[i][2];
        var ingredients = res.data.solutions[i][3]
        var foodid = res.data.solutions[i][4]
        console.log(typeof rName);
        console.log(typeof foodName);
        console.log(typeof price);
        console.log(typeof foodid);
        var str = '<div class="card card-rest"><div class="card-body"><h5 class="card-title">' +foodName+ '</h5><h6 class="card-subtitle mb-2 text-muted">' +rName+ '</h6><h6 class="card-subtitle mb-2 text-muted">' +price+ '</h6><p class="card-text">' + ingredients + '</p><button onclick="addItem(this)" value="'+foodid+'"type="button" class="btn btn-secondary" style="background-color: black;">Add</button></div></div>';
        console.log('about to add');
        div.insertAdjacentHTML('beforeend', str);
    }
}

function onLogin(){
    var emailID = document.getElementById('email-address').value;
    // console.log('emailID : ', emailID);
    sessionStorage.setItem("emailIDItem", emailID);
    window.location.href='./customer.html';
}

function addItem(objButton){
    // alert(objButton.value);
    var foodid = objButton.value;
    var emailID = sessionStorage.getItem('emailIDItem');

    var apigClient = apigClientFactory.newClient(
        {apiKey: "y1yJqKthiV3ceJlZu4Kps6XYcPpq9uf2aHPWOfsY"}
    );

    var additionalParams = {headers: {
        'Content-Type':"application/json"
    }};

    var params = {"Content-Type" : "application/json" };

    var body = {"emailID":emailID, "foodid":foodid};

    console.log('body : ', body);
    apigClient.addPost(params,body,additionalParams).then(function(res){
          console.log(res);
          if(res.status==200){
            console.log('res : ', res);
            console.log(typeof res);    
        }

    });

}







// function firstFunc(){
//     var trial = sessionStorage.getItem("emailIDItem");
//     console.log('trial : ', trial);
//     console.log("YAY!")	
// }

// function secondFunc(){
//     var trial = document.getElementById('trial').innerHTML;
//     sessionStorage.setItem("trialItem", trial);
//     window.location.href='./customer.html';
// }
function onLogin(){
    var emailID = document.getElementById('email-address').value;
    // console.log('emailID : ', emailID);
    sessionStorage.setItem("emailIDItem", emailID);
    window.location.href='./customer.html';
}

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
        var str = '<div class="card card-rest"><div class="card-body"><h5 class="card-title">' +foodName+ '</h5><button type="button" class="btn btn-secondary" onclick="onRestaurantFilter(this)" value='+rName+'>' +rName+ '</button><br><br><h6 class="card-subtitle mb-2 text-muted">' +price+ '$</h6><p class="card-text">' + ingredients + '</p><button onclick="addItem(this)" value="'+foodid+'"type="button" class="btn btn-secondary" style="background-color: black;">Add</button></div></div>';
        console.log('about to add');
        div.insertAdjacentHTML('beforeend', str);
    }
}

function addItem(objButton){
    var foodId = objButton.value;
    var emailId = sessionStorage.getItem('emailIDItem');

    var apigClient = apigClientFactory.newClient(
        {apiKey: "y1yJqKthiV3ceJlZu4Kps6XYcPpq9uf2aHPWOfsY"}
    );

    var additionalParams = {headers: {
        'Content-Type':"application/json"
    }};

    var params = {"Content-Type" : "application/json" };

    var body = {"emailId":emailId, "foodId":foodId};

    console.log('body : ', body);
    apigClient.addPost(params,body,additionalParams).then(function(res){
          console.log(res);
          if(res.status==200){
            console.log('res : ', res);
            console.log(typeof res);    
        }

    });

}

function onRestaurantFilter(objButton){
    console.log("Inside onRestaurantFilter")
    var rName = objButton.value;
    localStorage.setItem('rNameItem', rName);

    var apigClient = apigClientFactory.newClient(
        {apiKey: "y1yJqKthiV3ceJlZu4Kps6XYcPpq9uf2aHPWOfsY"}
    );

    var additionalParams = {headers: {
        'Content-Type':"application/json"
    }};

    var params = {"Content-Type" : "application/json" };
    var body = {"foodName":"", "rName":rName, "tag":"","calories":""};
    console.log('body : ', body);
    apigClient.searchPost(params,body,additionalParams).then(function(res){
          console.log(res);
          if(res.status==200){
            console.log('RES : ', res);
            console.log(typeof res);
            var myJSON = JSON.stringify(res);
            console.log("JSON: ", myJSON)
            localStorage.setItem('filteredRestFoodRes', myJSON);
            newr = localStorage.getItem('filteredRestFoodRes');
            console.log('checkNew : ', newr);
            window.location.href='./restaurant.html';            
          }

    });

}

function restFilter(){

    rName = localStorage.getItem('rNameItem');
    document.getElementById('restHeading').innerHTML = rName
    document.getElementById('restHeading').hidden = false;
    newr = localStorage.getItem('filteredRestFoodRes');
    // console.log('checkNew 1: ', newr);
    // console.log(typeof newr);
    var res = JSON.parse(newr);
    // console.log(typeof res);
    // console.log('checkNew 2: ', res);
    div = document.getElementById('restMenuDiv');
    console.log("Inside finalCart");
    console.log(res.data.solutions[0]);
    for (i = 0; i < res.data.solutions.length; i++) {
        var rName = res.data.solutions[i][0];
        var foodName = res.data.solutions[i][1];
        var price = res.data.solutions[i][2];
        console.log(typeof rName);
        console.log(typeof foodName);
        console.log(typeof price);
        // var str = '<div class="card card-rest"><div class="card-body"><h5 class="card-title">' +foodName+ '</h5><button type="button" class="btn btn-secondary" onclick="onRestaurantFilter(this)" value='+rName+'>' +rName+ '</button><br><br><h6 class="card-subtitle mb-2 text-muted">' +price+ '$</h6><p class="card-text">' + ingredients + '</p><button onclick="addItem(this)" value="'+foodid+'"type="button" class="btn btn-secondary" style="background-color: black;">Add</button></div></div>';
        var str = '<div class="row"><div class="col-sm">'+rName+'</div><div class="col-sm">'+foodName+'</div><div class="col-sm">'+price+'$</div></div>';
        div.insertAdjacentHTML('beforeend', str);
    }

}

function onCheckout(){
    emailId = sessionStorage.getItem('emailIDItem');
    var apigClient = apigClientFactory.newClient(
        {apiKey: "y1yJqKthiV3ceJlZu4Kps6XYcPpq9uf2aHPWOfsY"}
    );

    var additionalParams = {headers: {
        'Content-Type':"application/json"
    }};

    var params = {"Content-Type" : "application/json" };
    var body = {"emailId":emailId};
    console.log('body : ', body);

    apigClient.checkoutPost(params,body,additionalParams).then(function(res){
          console.log(res);
          if(res.status==200){
            console.log('res : ', res);
            console.log(typeof res);
            var myJSON = JSON.stringify(res);
            console.log("json: ", myJSON)
            localStorage.setItem('checkoutRes', myJSON);
            newr = localStorage.getItem('checkoutRes');
            console.log('checkNew : ', newr);
            window.location.href='./final.html';            
          }
    });

}

function finalCart(){   
    newr = localStorage.getItem('checkoutRes');
    console.log('checkNew : ', newr);
    var res = JSON.parse(newr);
    console.log('checkNew : ', res);
    div = document.getElementById('cartDiv');
    // div.innerHTML = "";
    console.log("Inside finalCart");
    // document.getElementById("cartDiv").hidden = false;
    console.log(res.data[0]);
    for (i = 0; i < res.data.length; i++) {
        var rName = res.data[i][0];
        var foodName = res.data[i][1];
        var price = res.data[i][2];
        console.log(typeof rName);
        console.log(typeof foodName);
        console.log(typeof price);
        // var str = '<div class="card card-rest"><div class="card-body"><h5 class="card-title">' +foodName+ '</h5><button type="button" class="btn btn-secondary" onclick="onRestaurantFilter(this)" value='+rName+'>' +rName+ '</button><br><br><h6 class="card-subtitle mb-2 text-muted">' +price+ '$</h6><p class="card-text">' + ingredients + '</p><button onclick="addItem(this)" value="'+foodid+'"type="button" class="btn btn-secondary" style="background-color: black;">Add</button></div></div>';
        var str = '<div class="row"><div class="col-sm">'+rName+'</div><div class="col-sm">'+foodName+'</div><div class="col-sm">'+price+'$</div></div>';
        div.insertAdjacentHTML('beforeend', str);
    }


}









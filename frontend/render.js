// function firstFunc(){
//     var trial = localStorage.getItem("emailIdItem");
//     console.log('trial : ', trial);
//     console.log("YAY!")	
// }

// function secondFunc(){
//     var trial = document.getElementById('trial').innerHTML;
//     localStorage.setItem("trialItem", trial);
//     window.location.href='./customer.html';
// }

// function onLogin(){
//     var emailID = document.getElementById('email-address').value;
//     // console.log('emailID : ', emailID);
//     localStorage.setItem("emailIdItem", emailID);
//     window.location.href='./customer.html';
// }

function onFilter(){
    console.log("Inside onFilter")
    var foodName = document.getElementById('dname').value;
    var rName = document.getElementById('rname').value;
    var tag = document.getElementById('dietTag1').value;
    var tag2 = document.getElementById('dietTag2').value;
    var tag3 = document.getElementById('dietTag3').value;
    var calories = document.getElementById('max-calories').value;

    var apigClient = apigClientFactory.newClient(
        {apiKey: "y1yJqKthiV3ceJlZu4Kps6XYcPpq9uf2aHPWOfsY"}
    );

    var additionalParams = {headers: {
        'Content-Type':"application/json"
    }};

    var params = {"Content-Type" : "application/json" };
    var body = {"foodName":foodName, "rName":rName, "tag":tag,"tag2":tag2,"tag3":tag3,"calories":calories};
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
        var ingredients = res.data.solutions[i][3];
        var foodid = res.data.solutions[i][4];
        console.log(typeof rName);
        console.log(typeof foodName);
        console.log(typeof price);
        console.log(typeof foodid);

        var rNameForId = rName.split(" ");
        rNameForId = rNameForId.join("_");
        var str = '<div class="card card-rest"><div class="card-body"><h5 class="card-title">' +foodName+ '</h5><button type="button" class="btn btn-secondary" onclick="onRestaurantFilter(this)" value='+rNameForId+'>' +rName+ '</button><br><br><h6 class="card-subtitle mb-2 text-muted">' +price+ '$</h6><p class="card-text">' + ingredients + '</p><button onclick="addItem(this)" value="'+foodid+'"type="button" class="btn btn-secondary" style="background-color: black;">Add</button></div></div>';
        console.log('about to add');
        div.insertAdjacentHTML('beforeend', str);
    }
}

function addItem(objButton){
    var foodId = objButton.value;
    var emailId = localStorage.getItem('emailIdItem');

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
    rName = rName.split("_");
    rName = rName.join(" ");
    console.log('HI : rName : ', rName);
    localStorage.setItem('rNameItem', rName);

    var apigClient = apigClientFactory.newClient(
        {apiKey: "y1yJqKthiV3ceJlZu4Kps6XYcPpq9uf2aHPWOfsY"}
    );

    var additionalParams = {headers: {
        'Content-Type':"application/json"
    }};

    var params = {"Content-Type" : "application/json" };
    var body = {"foodName":"", "rName":rName, "tag":"","tag2":"","tag3":"","calories":""};
    console.log('body : ', body);

    // API code to get the food 
    apigClient.searchPost(params,body,additionalParams).then(function(res){
          console.log(res);
          if(res.status==200){
            console.log('RES : ', res);
            console.log(typeof res);
            var myJSON = JSON.stringify(res);
            console.log("JSON: ", myJSON)
            localStorage.setItem('filteredRestFoodResp', myJSON);
            newr = localStorage.getItem('filteredRestFoodResp');
            console.log('checkNew : ', newr);
            window.location.href='./restaurant.html';            
          }

    });

}

function getReviews(){

    var div = document.getElementById('reviewsDiv');
    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }

    console.log("Calling getReviews");
    var rName = localStorage.getItem('rNameItem');
    var body = {"rName":rName};
    var apigClient = apigClientFactory.newClient(
        {apiKey: "y1yJqKthiV3ceJlZu4Kps6XYcPpq9uf2aHPWOfsY"}
    );

    var additionalParams = {headers: {
        'Content-Type':"application/json"
    }};

    var params = {"Content-Type" : "application/json" };

    // TODO : change name of apiG function
    apigClient.getreviewPost(params,body,additionalParams).then(function(res){
          console.log(res);
          if(res.status==200){
            console.log('RES : ', res);
            console.log(typeof res);
            var myJSON = JSON.stringify(res);
            console.log("JSON: ", myJSON)
            localStorage.setItem('reviewsResp', myJSON);
            newr = localStorage.getItem('reviewsResp');
            console.log('checkNew !!!: ', newr);
             
            res = JSON.parse(newr);
            console.log('RES, REVIEW : ', res);
            // div = document.getElementById('reviewsDiv');

            // implement showing just 5 random reviews. 

            for (i = 0; i < res.data.review.length; i++) {
                var review = res.data.review[i];
                console.log("i-th review : ", review);
                str = '<div class="card card-rest-review"><div class="card-body"><p class="card-text">' + review + '</p></div></div>';
                // var str = '<p>'+review+'</p>';
                div.insertAdjacentHTML('beforeend', str);
            }

            // for(i = 0; i < 10; i++) {
            //     t = Math.random() * (res.data.review.length-1);
            //     var review = res.data.review[i];
            //     console.log("i-th review : ", review);
            //     str = '<div class="card card-rest-review"><div class="card-body"><p class="card-text">' + review + '</p></div></div>';
            //     // var str = '<p>'+review+'</p>';
            //     div.insertAdjacentHTML('beforeend', str);
            // }

          }

    });

}

function restFilter(){

    rName = localStorage.getItem('rNameItem');
    document.getElementById('restHeading').innerHTML = rName
    document.getElementById('restHeading').hidden = false;
    newr = localStorage.getItem('filteredRestFoodResp');
    var res = JSON.parse(newr);
    div = document.getElementById('restMenuDiv');

    console.log("Inside finalCart");
    console.log(res.data.solutions[0]);
    for (i = 0; i < res.data.solutions.length; i++) {
        var rName = res.data.solutions[i][0];
        var foodName = res.data.solutions[i][1];
        var price = res.data.solutions[i][2];
        var ingredients = res.data.solutions[i][3];
        var foodid = res.data.solutions[i][4];
        console.log(typeof rName);
        console.log(typeof foodName);
        console.log(typeof price);
        // var str = '<div class="card card-rest"><div class="card-body"><h5 class="card-title">' +foodName+ '</h5><button type="button" class="btn btn-secondary" onclick="onRestaurantFilter(this)" value='+rName+'>' +rName+ '</button><br><br><h6 class="card-subtitle mb-2 text-muted">' +price+ '$</h6><p class="card-text">' + ingredients + '</p><button onclick="addItem(this)" value="'+foodid+'"type="button" class="btn btn-secondary" style="background-color: black;">Add</button></div></div>';
        // var str = '<div class="row"><div class="col-sm">'+rName+'</div><div class="col-sm">'+foodName+'</div><div class="col-sm">'+price+'$</div></div>';
        var str = '<div class="card card-rest-menu"><div class="card-body"><h5 class="card-title">' + foodName+ '</h5><h6 class="card-subtitle mb-2 text-muted">' +price+ '$</h6><p class="card-text">' + ingredients + '</p><button onclick="addItem(this)" value="'+foodid+'"type="button" class="btn btn-secondary" style="background-color: black;">Add</button></div></div>';
        div.insertAdjacentHTML('beforeend', str);
    }
    

    // newr = localStorage.getItem('reviewsResp');
    // res = JSON.parse(newr);
    // console.log('RES, REVIEW : ', res);
    // div = document.getElementById('reviewsDiv');

    // for (i = 0; i < res.data.review.length; i++) {
    //     var review = res.data.review[i];
    //     console.log("i-th review : ", review);

    //     var str = '<div class="card card-rest-review"><div class="card-body"><p class="card-title">' +review+ '</p></div></div>';
    //     // var str = '<p>'+review+'</p>';
    //     div.insertAdjacentHTML('beforeend', str);
    // }

}

function onCheckout(){
    emailId = localStorage.getItem('emailIdItem');
    console.log('emailIdItem emailId ---', emailId);
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
    // console.log('checkNew : ', newr);
    var res = JSON.parse(newr);
    // console.log('checkNew : ', res);
    div = document.getElementById('cartDiv');
    console.log("Inside finalCart");
    console.log(res.data[0]);
    var total = 0
    for (i = 0; i < res.data.length; i++) {
        var rName = res.data[i][0];
        var foodName = res.data[i][1];
        var price = res.data[i][2];
        var str = '<div class="row"><div class="col-sm">'+rName+'</div><div class="col-sm">'+foodName+'</div><div class="col-sm">'+price+'$</div></div>';
        div.insertAdjacentHTML('beforeend', str);
        total += price;
    }
    console.log('TOTAL : ', total);
    console.log(typeof total);
    totalStr = '<div class="row" style="text-align:center;" style="text-size:12px;">Your total amount is '+total.toString()+'$</div>';
    div.insertAdjacentHTML('beforeend', totalStr);

}

function onAddReview(){
    rName = localStorage.getItem('rNameItem');
    var review = document.getElementById('custReview').value;
    // console.log(typeof review);
    console.log('RNAME : ', rName);
    console.log('REVIEW : ', review);

    // alert(review);
    // document.getElementById('custReview').clear();

    var apigClient = apigClientFactory.newClient(
        {apiKey: "y1yJqKthiV3ceJlZu4Kps6XYcPpq9uf2aHPWOfsY"}
    );

    var additionalParams = {headers: {
        'Content-Type':"application/json"
    }};

    var params = {"Content-Type" : "application/json" };

    var body = {"rName":rName, "review":review};

    console.log('body : ', body);
    // change apigClient method here.

    apigClient.addreviewPost(params,body,additionalParams).then(function(res){
          console.log(res);
          if(res.status==200){
            console.log('res : ', res);
            console.log(typeof res); 
            console.log("Added review"); 
            alert("review added");
            // document.querySelector('#custReview').value = ''; 
            window.location.href='./restaurant.html'; 
            // getReviews();
        }

    });  

}

function aswLogin(){
    var apigClient = apigClientFactory.newClient({apiKey: "y1yJqKthiV3ceJlZu4Kps6XYcPpq9uf2aHPWOfsY"});
    var userName = document.getElementById('email-address').value;
    var password = document.getElementById('password').value;

    var params = {"Content-Type" : "application/json" };


    var additionalParams = {headers: {'Content-Type':"application/json"}};
    var body = {"userName":userName,"password":password};

    console.log("BODY : ", body);
    apigClient.loginPost(params,body,additionalParams).then(function(res){
        console.log("RES : ", res);
        if(res.status==200){
            console.log('User Login');
            var emailId = res.data['emailId'];
            console.log('emailId : ', emailId);
            localStorage.setItem("emailIdItem", userName);
            window.location.href='./customer.html';
        }
    }).catch(e => {
            console.log(e);
            alert("Wrong login, please try again!")
            window.location.href='./login.html';
        });

}

function aswConfirm(){
    var apigClient = apigClientFactory.newClient({apiKey: "y1yJqKthiV3ceJlZu4Kps6XYcPpq9uf2aHPWOfsY"});
    var userName = document.getElementById('email-address').value;
    var password = document.getElementById('password').value;
    var confirmCode = document.getElementById('confirmCode').value;

    var params = {"Content-Type" : "application/json" };


    var additionalParams = {headers: {
    'Content-Type':"application/json"
    }};

    var body = {"userName":userName, "confirmCode":confirmCode};

    apigClient.confirmPost(params,body,additionalParams).then(function(res){
        console.log("RES : ", res);
        if(res.status==200){
            console.log('User Confirmed');
            alert("Confirmed! You can log in now.");
            window.location.href='./login.html';
        }
    });

}

function aswSignUp(){
    var apigClient = apigClientFactory.newClient({apiKey: "y1yJqKthiV3ceJlZu4Kps6XYcPpq9uf2aHPWOfsY"});

    var additionalParams = {headers: {
    'Content-Type':"application/json"
    }};

    var userName = document.getElementById('email-address').value;
    var password = document.getElementById('password').value;

    var body  = {"userName":userName,"password":password}

    var params = {"Content-Type" : "application/json" };
    console.log("BODY : ", body);
    apigClient.signupPost(params,body,additionalParams).then(function(res){
    console.log("RES : ", res);
        if(res.status==200){
            console.log('RES : ', res);
            console.log('User created')
            alert("Check your email for confirmCode");
            window.location.href='./login.html';
        }

    });
}

function makeReservation(){
    var rName = localStorage.getItem('rNameItem').toString();
    var rTime = document.getElementById('rTime').value.toString();
    var rDate = document.getElementById('rDate').value.toString();
    var emailId = localStorage.getItem('emailIdItem');

    console.log(typeof rName);
    console.log(typeof rTime);
    console.log(typeof rDate);

    var apigClient = apigClientFactory.newClient({apiKey: "y1yJqKthiV3ceJlZu4Kps6XYcPpq9uf2aHPWOfsY"});
    var params = {"Content-Type" : "application/json" };


    var additionalParams = {headers: {'Content-Type':"application/json"}};
    var body = {"rName":rName,"rTime":rTime,"rDate":rDate,"emailId":emailId};
    console.log("RESERVATION BODY : ", body);


    apigClient.reservbookingPost(params,body,additionalParams).then(function(res){
          console.log(res);
          if(res.status==200){
            console.log('res : ', res);
            console.log(typeof res); 
            console.log("Created reservation"); 
            // document.querySelector('#custReview').value = ''; 
            window.location.href='./restaurant.html'; 
        }

    }); 


    console.log("END OF MAKE RESERVATION");

}


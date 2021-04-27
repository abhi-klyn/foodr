function dummyFunction() {
var test="Abhi-1145";
var test1 = "Abhi1146";


var apigClient = apigClientFactory.newClient({apiKey: "y1yJqKthiV3ceJlZu4Kps6XYcPpq9uf2aHPWOfsY"});

    var additionalParams = {headers: {
    'Content-Type':"application/json"
  }};

    var params = {"Content-Type" : "application/json" };
    var body = {"username":test,  "emailID":test1};


    apigClient.rootPost(params,body,additionalParams).then(function(res){
          console.log(res);
       		if(res.status==200){
            console.log(res);
       			document.getElementById('outputXX').value=res;

       		}
       });

  }
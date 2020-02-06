const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    let firstName = req.body.FName;
    let lastName = req.body.LName;
    let email = req.body.email;

//build up an object of data to be posted  to the server
    let data = {
        members: [
            {email_address: email,
            status: "subscribed",
        merge_fields: {
                FName: firstName,
                LName: lastName
             }}
        ]
    };

    let jsonData = JSON.stringify(data);

    const options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/25ab8f1a06",
        method: "POST",
        headers: {
            "Authorization": "whateverString 1c7d86bb6e39622cbf7e31e638429cb1-us4"
        },
        body: jsonData
    }

    request(options, function(error, response, body){
        if(error){
            console.log(error);
        }else{
            console.log(response.statusCode);
        }
    });

    console.log(firstName, lastName, email);
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

//list id 25ab8f1a06
//api key 1c7d86bb6e39622cbf7e31e638429cb1-us4
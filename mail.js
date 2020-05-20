const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
	const name = req.body.name;
	const email = req.body.email;
	//console.log(name,email);
	const data = {
		members:[
			{
			email_address: email,
			status:"subscribed",
			merge_fields:{
				FNAME:name
			}
		}]
	};

	const jsonData = JSON.stringify(data);
	const url = 'https://usX.api.mailchimp.com/3.0/lists/757c40c579';
	const options = {
		method : "POST",
		auth : "sandeep:Your API KEY"
	}
	//const

	const request = https.request(url,options,function(response){
		if(response.statusCode === 200){
			res.sendFile(__dirname+"/success.html");
		}else{
			res.sendFile(__dirname+"/failer.html");
		}
		response.on("data",function(data){
			console.log(JSON.parse(data));
		})
		
	})
	request.write(jsonData);
	request.end();
});

app.post("/failer",function(req,res){
	res.redirect("/");

})
//{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}

app.listen(3000,function(){
	console.log("I am listening at the port 3000");
})

//Api key 
//Your api key

//list id
//your list id

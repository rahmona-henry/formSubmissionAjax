const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// const xhr = new XMLHttpRequest();
// app.set('port', (process.env.PORT || 4000));


app.use(express.static('client'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json({
  inflate: true,
  limit: '100kb',
  reviver: null,
  strict: true,
  type: 'application/json',
  verify: undefined
}))

//GET Request//
// app.get('/', function (req,res) {
//   res.send(index.html)
// })

//POST Request//
app.post('/', function (req, res) {

  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email
  const cookie =req.body.cookie
  const pageURL =req.body.pageURL
  //Get time in milliseconds to record submission
  const submissionTime = new Date().getTime();
  console.log(req.body)


  // Create the new request
  var xhr = new XMLHttpRequest();
  var url = 'https://api.hsforms.com/submissions/v3/integration/submit/6282099/1ba21777-48f7-41f7-8730-3b4854f58f78'

  //Request JSON:
  var data = {
    "submittedAt": submissionTime,
    "fields": [
      {
        "name": "email",
        "value": email
      },
      {
        "name": "firstname",
        "value": firstname
      },
      {
        "name": "lastname",
        "value": lastname
      }
    ],
    "context": {
      "hutk":  cookie, // include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission
      "pageUri": pageURL,
      "pageName": "Developer Advocate"
    },

    "skipValidation": true
  }

  var final_data = JSON.stringify(data);
  console.log(final_data);

  xhr.open('POST', url);

  // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
  xhr.setRequestHeader('Content-Type', 'application/json');
  //
  xhr.onreadystatechange = function() {
          console.log("RESPONSE: " + xhr.status);
          console.log("RESPONSE MESSAGE: " + xhr.responseText);
          if(xhr.readyState == 4 && xhr.status == 200) {
              console.log(xhr.responseText); // Returns a 200 response if the submission is successful.
          } else if (t){
              console.log(xhr.responseText); // Returns a 400 error the submission is rejected.
          } else if (xhr.readyState == 4 && xhr.status == 403){
              console.log(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.
          } else if (xhr.readyState == 4 && xhr.status == 404){
              console.log(xhr.responseText); //Returns a 404 error if the formGuid isn't found
          }
         }

  // Sends the request
  xhr.send(final_data)
  // 400 Bad Request
   // app.post('/bad-request', (req, res) => {
   //         res.status(400).send({message : "You are missing vital credentials"})
   // });
  res.send('Thank you for submitted the form!')

})
// const port = process.env.PORT || 4000
.listen(process.env.PORT || 5000)
// app.listen(port, function(){
// console.log('We have lift off on port ' + port))

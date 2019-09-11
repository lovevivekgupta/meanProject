rt=exp.Router()
const JSON=require("circular-json")
// it will store the data from localstorage to dtababaese tablr(tbl_cart_item)
rt.post("/storecartdata",(req,res)=>{
    client.connect(()=>{
        client.db(ser_settings.dbname).collection("tbl_cart_item").insert(req.body,(err,result)=>{
            if(err)
            console.log(err)
            else{
                res.send({resp:result})
                console.log(result)
            }
        })
    })
})

// to fetching the all data which is selected by authenticated user in biill component



rt.post("/fetchuserdata",(req,res)=>{
    client.connect(()=>{
        client.db(ser_settings.dbname).collection("tbl_cart_item").find(req.body).toArray((err,result)=>{
            if(err)
            console.log(err)
            else{
                //console.log(result)
                res.send(result)
            }

        })
    })
})


// to call Order-Now Button for calling payment API
rt.post("/payment",(req,res)=>{
    console.log(req.body.email)
    var request= require('request');
    var headers = { 'X-Api-Key': '6a8d35edc7aacead0592e281b3420577', 'X-Auth-Token': 'fad57aab560b87eb8842ce2ced83bc5c'}
var payload = {
  purpose: 'SHOPPING BILL',
  amount: '10',
  phone: req.body.mobileno,
  buyer_name: req.body.uname,
  redirect_url: 'http://localhost:4200/user/paymentdone',
  send_email: true,
  webhook: 'http://www.example.com/webhook/',
  send_sms: true,
  email: req.body.email,
  allow_repeated_payments: false}

request.post('https://www.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
  if(!error && response.statusCode == 201){
    res.send(body);
    console.log(error);
  }
})
})


module.exports=rt;
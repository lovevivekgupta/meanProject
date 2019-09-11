rt=exp.Router()
nm=require("nodemailer")
rt.post("/insertregistration",(req,res)=>{
     console.log(req.body)
    client.connect(err => {
      client.db(ser_settings.dbname).collection("tbl_registration").find().sort({_id:-1}).limit(1).toArray((err,result)=>{
        
                lastid=result[0]._id
                lastid=lastid+1
                obj =req.body
                obj._id=lastid
                
                console.log(obj)
     client.db(ser_settings.dbname).collection("tbl_registration").insertOne(obj,(err,result)=>{
      var v_token=tok.sign({uname:'vivek'},secref.token)
      varemail=req.body.email 
      client.db(ser_settings.dbname).collection("tbl_registration").updateOne({email:varemail},{$set:{token:v_token}})
        
      transport=nm.createTransport({
        service:"gmail",
        auth:{
          "user":"vivekvivek367@gmail.com",
          "pass":"pramilavijay123"
        }
      })
      str1="http://localhost:4200/user/activate;tk="+v_token
      str="To active your account click on <a href="+str1+">Link</a>"
                transport.sendMail({
                  from:"vivekvivek367@gmail.com",
                  subject:"Activation Required",
                  to:varemail,
                  html:str
                },function(err,result){
          if(err)
               console.log(err);
          
          else
              {
              console.log(result)
              res.send({result:"Registration Successfully"})
              }``
                })
          })
                  
                }); 
            
              });
              })



//to login perpose

rt.post("/login",(req,res)=>{

  client.connect(function(){
      console.log(req.body)
    client.db(ser_settings.dbname).collection("tbl_registration").find(req.body,{_id:1,email:1,fname:1}).toArray(
      (err,result)=>{
        //console.log(result)
        res.send({res:result})
      }
    )
  })
}) 

             

             //to fetch data in MyaccountPage

             rt.post("/myaccoubntfetchdata",(req,res)=>{
               console.log(req.body)
               client.connect(err=>{
                client.db(ser_settings.dbname).collection("tbl_registration").find(req.body).toArray((err,result)=>{
                  if(err)
                  console.log(err)
                  else{
                    //console.log(result)
                    res.send(result)
                  }
                })
               })
             })



             ////Account activation
            rt.post("/activation",(req,res)=>{
              client.connect(()=>{
                console.log(req.body)
                client.db(ser_settings.dbname).collection("tbl_registration").updateOne(req.body,{$set:{active:1}},function(err,result){
                    if(err)
                    res.send({msg:err})
                    else
                    res.send({msg:1})
                })
              })
            })
  

// to get the login details like username,emaidid address,mobileno, after fetching the user cart details in bill page

rt.post("/getUserLoginDetails",(req,res)=>{
  client.connect(err=>{
    //console.log(req.body)
  client.db(ser_settings.dbname).collection("tbl_registration").find(req.body).toArray((err,result)=>{
    if(err)
    console.log(err)
    else{
      //console.log(result)
      res.send(result)
    }
  })
         
        
      })
    })
              
module.exports=rt;



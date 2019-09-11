rt=exp.Router()
rt.get("/getsubcat",function(req,res){
    client.connect(err => {
         collection = client.db(ser_settings.dbname).collection("tbl_subcat").aggregate([{
            $lookup:{
                from:"tbl_cat",
                localField:"catid",
                foreignField:"_id",
                as:"data"
            }
             }
            ,{
               "$unwind":"$data"
            
        }])
        .toArray((err,result)=>
        {
          if(err)
          {
            console.log(err)
          }
          else
          {
            //console.log(result)
          res.send(result)
          //client.close();
          }
        })
        // perform actions on the collection object
        
      });
})



//to update the sub category


rt.post("/updatesubcat",(req,res)=>{
  console.log(req.body)
  client.connect(err => {
      
    collection = client.db(ser_settings.dbname).collection("tbl_subcat").update(req.body[0],req.body[1],(err,result)=>{
         if(err){
             res.send(err);
         }
         else{
           //console.log(result)
             res.send({result:"Updated"});
         }
                 // client.close();
               });
  });
 
 })

 //to insert the sub category data 

 rt.post("/inssubcat",(req,res)=>{
  
  client.connect(err => {
  client.db(ser_settings.dbname).collection("tbl_subcat").find({},{_id:true,subcatname:0}).sort({_id:-1}).limit(1).toArray((err,result)=>{
lastid=result[0]._id
lastid=lastid+1
data=req.body
data._id=lastid
console.log(data)
   client.db(ser_settings.dbname).collection("tbl_subcat").insertOne(data,(err,result)=>{
     console.log(result)
        res.send({result:"Subcategory Added"})

                // client.close();
              }); 
           // console.log(lastid)
            });
            })
            })





            //To get subcat based on cat id
rt.post("/getsubcatbasedoncatid",(req,res)=>
{
  ob=req.body
  client.connect(()=>
  {
      client.db(ser_settings.dbname).collection("tbl_subcat").find(ob).toArray(
          (err,result)=>{
             res.send(result)
          }
      )
  })
 })


module.exports=rt;
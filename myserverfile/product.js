// to getting the the product data by normol way


// rt=exp.Router()
// rt.get("/getproduct",(req,res)=>{
//     client.connect(err => {
//         const collection = client.db(ser_settings.dbname).collection("tbl_product")
//         .find().toArray((err,result)=>{
//             //console.log(result)
//           res.send(result)
//           //client.close();
//         })
//         // perform actions on the collection object
        
//       })
//     })
//     module.exports=rt;





// using aggregate to get the product data from database

rt=exp.Router()
rt.get("/getproduct",(req,res)=>{
   
         client.connect(err => {
          collection = client.db(ser_settings.dbname).collection("tbl_product")
          .aggregate({[
            $lookup:{
                  from:"tbl_cat",
                  localField:"catid",
                  foreignField:"_id",
                  as:"data"
            } 
      },{"$unwind":"$data"},
      {
            $lookup:{
                   from:"tbl_subcat",
                   localField:"subcatid",
                   foreignField:"_id",
                   as:"datanew"
            }
      },{ "$unwind":"$datanew"},
      {
            $lookup:{
                  from:"tbl_subsubcat",
                  localField:"subsubcatid",
                  foreignField:"_id",
                  as:"data2"
            }
      },{"$unwind":"$data2"},
      {
            $group:{
                  "_id":"$_id",
                  "xyz":{
                "$push":{
                  "_id":"$_id",
                  
                  "catid":"$data._id",
                  "subcatid":"$datanew._id",
                  "subsubcatid":"$data2.subsubcatid",
                    "p_name":"$p_name",
                    "offers":"$offers",
                    "discount":"$discount",
                    "newp_price":"$newp_price",
                    "oldp_price":"$oldp_price",
                    "p_brand":"$p_brand",
                    "p_color":"$p_color",
                    "p_rating":"$p_rating",
                    "p_type":"$p_type",
                    "quantity":"$quantity",
                    "images":"$images",
                  "catname":"$data.catname",
                   "subsubcatname":"$data2.subsubcatname",
                   "subcatname":"$datanew.subcatname"
                   
                   
                }
            }
      }   
      },
      {"$unwind":"$xyz"}
    ])
     .toArray((err,result)=>{
      if(err)
      console.log(err)
      else{
      console.log(result)
      res.send(result)
      }
}) 

})
})




// to insert product details from front-end
rt.post("/insertproduct",(req,res)=>{
  client.connect(err => {
    client.db(ser_settings.dbname).collection("tbl_product").find().sort({_id:-1}).limit(1).toArray((err,result)=>{
        lastid=result[0]._id
        lastid=lastid+1
        req.body._id=lastid
        client.db(ser_settings.dbname).collection("tbl_product").insertOne(req.body,(err,result)=>{
            if(err)
            console.log(err) 
            else{
            res.send({result:"product inserted"})
            console.log(result)
            }
        })
      })
    })
  })
  rt.post("/getsubsubcatid",(req,res)=>
{
  ob=req.body
  client.connect(()=>
  {
      client.db(ser_settings.dbname).collection("tbl_product").find(ob).toArray(
          (err,result)=>{
             res.send(result)
          }
      )
  })
 })

 rt.post("/getproductid",(req,res)=>
{
  ob=req.body
  client.connect(()=>
  {
      client.db(ser_settings.dbname).collection("tbl_product").find(ob).toArray(
          (err,result)=>{
             res.send(result)
          }
      )
  })
 })


 //to update the product data in product component 
 rt.post("/updateproduct",(req,res)=>{
   client.connect(err=>{
     client.db(ser_settings.dbname).collection("tbl_product").update(req.body[0],req.body[1],(err,result)=>{
       if(err)
         console.log(err)
         else{
           console.log(result)
           res.send(result)
         }

       
     })
   })
 })


 //to search the product inheader components
 rt.get("/getsearchproduct",(req,res)=>
 {
   //ob=req.body
   client.connect(()=>
   {
       client.db(ser_settings.dbname).collection("tbl_product").find().toArray((err,result)=>{
              if(err)
              console.log(err)
              else{
                res.send(result)
                console.log(result)
              }
           }
       )
   })
  })

module.exports=rt;





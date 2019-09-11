exp=require("express")
tok=require("./node_modules/jsonwebtoken")
secref=require("./myserverfile/token")
bp=require("body-parser")
catfile=require("./myserverfile/category")
subcatfile=require("./myserverfile/subcategory")
subsubcatfile=require("./myserverfile/subsubcategory")
productfile=require("./myserverfile/product")
registrationfile=require("./myserverfile/registration")
ser_settings=require("./serversettings")
paymentfile=require("./myserverfile/payment")
file=require("express-fileupload")

app=exp()
app.listen(1000)
app.use(bp.json())
app.use(file())
console.log(ser_settings.dbname)
app.use("/catref",catfile)
app.use("/subcatref",subcatfile)
app.use("/subsubcatref",subsubcatfile)
app.use("/productref",productfile)
app.use("/registrationref",registrationfile)
app.use("/paymentref",paymentfile)

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://vivek:vivek@123@cluster0-ejxih.mongodb.net/test?retryWrites=true&w=majority";
client = new MongoClient("mongodb://localhost:27017/project", { useNewUrlParser: true });




app.post("/insImages",(req,res)=>{
    stt=""
   // console.log(req.files)
    str=new Array()
    if(req.files.f1.name)
    {
    fname=req.files.f1.name
    dt=new Date()
    fname=dt.getTime()+fname;
    file=req.files.f1
    
    if(req.files.f1.mimetype=="image/jpeg" ||
     req.files.f1.mimetype=="image/bmp" || req.files.f1.mimetype=="images/gif")
    file.mv("src/assets/productimages/"+fname)
    str.push(fname)
     
}
else{
    for(i=0;i<req.files.f1.length;i++)
        {
        fname=req.files.f1[i].name
        dt=new Date()
        fname=dt.getTime()+fname;
        file=req.files.f1[i]
        if(req.files.f1[i].mimetype=="image/jpeg" || req.files.f1[i].mimetype=="image/bmp" ||
         req.files.f1[i].mimetype=="image/gif")
        file.mv("src/assets/productimages/"+fname)
        str.push(fname)
    }
}
proid=0
client.connect(err=>{
    client.db(ser_settings.dbname).collection("tbl_product").find().sort({_id:-1}).limit(1).toArray(
        (err,result)=>{
            if(err)
            {
            stt=err
            }
            else
            {
            proid=result[0]._id
            client.db(ser_settings.dbname).collection("tbl_product").updateMany({_id:proid},{$set:{images:str}})
            stt=1
            }
    res.redirect("http://localhost:4200/admin/products")
        
        })
    })
})
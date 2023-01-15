const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const productRoute=require("./routes/products");


const app=express();

app.use(express.json());


app.use(bodyParser.urlencoded({
  extended: true
}));


mongoose.connect("mongodb+srv://omkar:OMKAR@cluster0.duiwp6o.mongodb.net/ProductAPI", {
      useNewUrlParser: true,
      useUnifiedTopology: true
 })
  .then(console.log("Connected to MongoDB"))
   .catch((err) => console.log(err));


//http://localhost:5000/product
app.use("/product",productRoute);

app.listen(5000,function(){
  console.log("Server has started at port 5000");
})

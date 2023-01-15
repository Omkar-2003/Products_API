const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const productRoute=require("./routes/products");
const DB = process.env.DATABASE;
const PORT = process.env.PORT || 5000;


const app=express();

app.use(express.json());


app.use(bodyParser.urlencoded({
  extended: true
}));


mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
 })
  .then(console.log("Connected to MongoDB"))
   .catch((err) => console.log(err));


//http://localhost:5000/product
app.use("/product",productRoute);

app.listen(PORT,function(){
  console.log('Server has started at port ');
})

const mongoose= require("mongoose");

const ProductSchema= new mongoose.Schema(
 {
  Productid:{
    type:String,
    required:true,
    unique:true
    },
  Name:{
    type:String,
    required:true
  },
  Price:{
    type:Number,
    required:true
  },
  Featured:{
    type:Boolean,
    required:true
  },
  Rating:{
    type:Number,
    max:5,
    min :1,
    required:true
  },
  Company:{
    type:String,
    required:true
  }
},
{
  timestap:true
}

);
module.exports=mongoose.model("Product",ProductSchema);

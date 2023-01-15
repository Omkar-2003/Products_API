const router = require("express").Router();
const Product = require("../models/Product");



//Get rouute for Get all products and Get products which are less than certain value and greater than certain value
router.get("/", async (req, res) => {

  const priceLess = req.body.lessthan;
  const priceGreater = req.body.greaterthan;

  console.log(req.body.greaterthan);
  console.log(priceGreater);

  if (priceGreater) {

    const ans = await Product.find({
      Price: {
        $gte: priceGreater
      }
    });

    if (ans.length == 0) {
      res.status(404).json("Product greater than this value Doesen't exist");
    } else {
      const data = {
        response: ans,
        msg: ans.length + " Products are greater than and eqaual to  price " + priceGreater + " "
      }
      res.status(200).json(data)
    }

  } else if (priceLess) {

    const ans = await Product.find({
      Price: {
        $lte: priceLess
      }
    });

    if (ans.length == 0) {
      res.status(404).json("Product Less than this value Doesen't exist");
    } else {
      const data = {
        response: ans,
        msg: ans.length + " Products are  Less than and eqaual to price " + priceLess + " "
      }
      res.status(200).json(data)
    }
  } else {
    await Product.find(async(response,err)=>{
       if(!err){
         res.status(200).json(response);
       }
       else{
         res.status(500).json(err);
       }
     }).clone().catch(function(err){ console.log(err)});
  }

});

//Get Featured ProductS
router.get("/featured", async (req, res) => {

  try {

    await Product.find({
      Featured: true
    }, async (response, err) => {
      if (!err) {
        res.status(200).json(response);
      } else {
        res.status(500).json(err);
      }
    }).clone().catch(function(err) {
      console.log(err)
    });
  } catch (err) {
    res.status(500).json(err);

  }

});

//Post Route to create a new product
router.post("/", async (req, res) => {

  const Product_id = req.body.Productid;
  const Productname = req.body.Name;
  const Price_value = req.body.Price;
  const Featured_value = req.body.Featured;
  const Rating_no = req.body.Rating;
  const Companyname = req.body.Company;

  console.log(Product_id, Productname, Price_value, Featured_value, Rating_no, Companyname);


  const new_Product = new Product(req.body);
  try {
    const product = await new_Product.save(async (err, product) => {
      if (err) {
        //Dupliacte user Handler
        if (err.code == 11000) {
          const data = {
            respone: err,
            msg: "User Already Exist"
          }
          res.status(500).json(data);
        }
        res.status(500).json(err);
      } else {
        const data = {
          respone: product,
          msg: "User has been registered sucessfully"
        };
        res.status(200).json(data);
      }
    });

  } catch (err) {
    res.status(500).json(err);

  }

});


//Put Route to Update a information of particular product
router.put("/", async (req, res) => {
  const Product_id = req.body.Productid;

  const product = await Product.updateOne({
    Productid: Product_id
  }, {
    $set: req.body
  }, {
    new: true
  }, function(err, response) {
    if (response == null) {
      res.status(404).json("Data does not exist");
    }
    try {
      const data = {
        "response": response,
        "msg": "Data has been Updated Successfully"
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }).clone().catch(function(err) {
    console.log(err)
  });;

});

//Delete Route to Delete  a  particular product

router.delete("/", async (req, res) => {
  const Product_id = req.body.Productid;

  await Product.deleteOne({
    Productid: Product_id
  }, async (response, err) => {
    try {
      res.status(200).json("Data has been deleted Successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  }).clone().catch(function(err) {
    console.log(err)
  });

});

module.exports = router;

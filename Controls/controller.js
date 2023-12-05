const { verifyToken } = require("../Middleware/verfyToken");
const foodDetails = require("../Models/FoodModel");

//gettall

const getAllData = async (req, res) => {
  try {
    const product = await foodDetails.find();
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).json("no data available");
    }
  } catch (error) {
    console.log("error", error);
  }
};
//getOne

const getOneFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await foodDetails.findById({ _id: id });
    if (food) {
      res.status(200).json(food);
    } else {
      res.status(404).json("food not found");
    }
  } catch (error) {
    console.log("error", error);
  }
};

//create

const createFoodData = async (req, res) => {
  //multer:is a library in nodejs used to handle file type content
  //file type contentine file aayit mongodbyil store cheyyan patoola so agne convert cheyth store cheyyan vendi
  //use cheyyunna library aanu multer
  const image = req.file.filename;
  console.log("asd", image);
  const { productname, discription, category, price } = req.body;

  if (!productname || !discription || !category || !price) {
    res.status(400).json("all inputs required");
  } else {
    try {
      let food = await foodDetails.findOne({ productname });

      if (food) {
        res.status(400).json("product already present");
      } else {
        let newProduct = new foodDetails({
          productname,
          discription,
          category,
          price,
          image,
        });

        await newProduct.save();
        res.status(200).json(newProduct);
      }
    } catch {
      res.status(400).json("connection error");
    }
  }
};

module.exports = {
  getAllData,
  getOneFood,
  createFoodData,
};

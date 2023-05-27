
const ProductCollection = require("./product.schema");
const {ObjectId} = require("mongodb");

const addProductController = async (req, res) => {
    // console.log('Hitted addProductController', req)
    const productInfo = req.body;

  const imgdata = req.files.foodImg.data;
  const encodedpic1 = imgdata.toString("base64");
  const foodImg = Buffer.from(encodedpic1, "base64");

  const productSaveObj = new ProductCollection({...productInfo, foodImg})
  await productSaveObj.save()
    res.json({ProductAdded: true});
  };

  const getProductController = async (req, res) => {
    const products = await ProductCollection.find({});
    res.send(products);
  };

  const getProductbByIdController = async (req, res) => {
    console.log('Req Hitted', req.query.id)
    const objectIdQuery = new ObjectId(req.query.id);
    const products = await ProductCollection.findOne({_id: objectIdQuery})
    res.send(products);
  };

  const deleteProductController = async (req, res) => {
    console.log('delete Hitted', req.query.id)
    const objectIdQuery = new ObjectId(req.query.id);
    const products = await ProductCollection.deleteOne({_id: objectIdQuery})
    res.send(products);
  };
 
  const updateProductHandler = async (req, res) => {
    // console.log('another hitted', req.body)
    const productInfo = req.body;

    const query = {_id: new ObjectId(req.body._id)};


    let foodImg ;
    if(productInfo?.foodImg){
      foodImg = productInfo.foodImg
    }
    else{
      const imgdata = req.files.foodImg.data;
      const encodedpic1 = imgdata.toString("base64");
      foodImg = Buffer.from(encodedpic1, "base64");
    }

    try {
      const data = await ProductCollection.findOneAndUpdate(query, {
        $set: {
        foodName: productInfo?.foodName,
        foodPrice: productInfo?.foodPrice,
        foodDescription:  productInfo?.foodDescription,
        foodImg: foodImg
         },
      });
      res.send({success: data})
     } catch (error) {
     res.status(500).json({ message: "Something went wrong" });
     console.log(error);
     }

  };


  module.exports = {
    addProductController,
    getProductController,
    getProductbByIdController,
    deleteProductController,
    updateProductHandler
  };
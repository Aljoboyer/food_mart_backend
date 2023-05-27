const router = require("express").Router();

const { addProductController, getProductController, getProductbByIdController, deleteProductController, updateProductHandler } = require("./product.controller");

router.post("/add-product", addProductController);
router.get("/get-product", getProductController);
router.get("/get-product-by-id", getProductbByIdController);
router.delete("/delete-product", deleteProductController);
router.put("/update-product", updateProductHandler);

module.exports = router;

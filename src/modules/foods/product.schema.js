const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    foodPrice:  {
        type: Number,
        required: true
    },
    foodDescription:  {
        type: String,
        required: true
    },
    foodImg: {
        type: mongoose.Mixed,
        required: false
    }
});

module.exports  = mongoose.model("Product", ProductSchema);

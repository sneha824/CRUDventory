import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
},{
    timestamps:true     //created,updated field on each document
});

const Product = mongoose.model('Product',productSchema);
// this says to mongo to create collection called 'Product' and productSchema tht should be followed
export default Product;

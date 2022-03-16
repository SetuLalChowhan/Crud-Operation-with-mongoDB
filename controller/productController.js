const path = require("path");
const Product = require(path.join(process.cwd(), "models/productModel"));
const User = require(path.join(process.cwd(), "models/userModel"));

function homePage(req, res) {
    res.send("Hello World");
}
async function getAllProduct(req, res) {
    try {
        const products = await Product.find({}).populate("user");

        const totalProducts = products.reduce((sum, a, b) => {
            sum = 1;
            return (sum = sum + b);
        });
        res.send(products);
        console.log(totalProducts);
    } catch (err) {
        console.log(err);
        res.status(500).send("internal Server Error");
    }
}
async function getSingleProduct(req, res) {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).send("Not Found");
        res.send(product);
    } catch (err) {
        console.log(err);
        res.status(500).send("internal Server Error");
    }
}
async function createProduct(req, res) {
    try {
        const {product_name, category, description, price} = req.body;
        const productName = await Product.findOne({product_name});
        if (productName) return res.status(400).send("Already Product Added");
        const newProduct = new Product({
            product_name,
            category,
            description,
            price,
            user: req.id,
        });
        await User.updateOne(
            {
                _id: req.id,
            },
            {
                $push: {
                    products: newProduct._id,
                },
            }
        );

        await newProduct.save();
        res.send(newProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send("internal Server Error");
    }
}
async function updateProduct(req, res) {
    const {id} = req.params;
    const {product_name, category, description, price} = req.body;
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).send("Not Found");

        product.set({
            product_name,
            category,
            description,
            price,
        });

        product.save();
        res.status(201).send(product);
    } catch (err) {
        console.log(err);
        res.status(500).send("internal Server Error");
    }
}
async function deleteProduct(req, res) {
    const {id} = req.params;
    const product = await Product.findById(id);
    try {
        if (!product) return res.status(404).send("Not Found");
        product.deleteOne();
        res.send("product deleted");
    } catch (err) {
        console.log(err);
        res.status(500).send("internal Server Error");
    }
}

module.exports = {
    homePage,
    getAllProduct,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};

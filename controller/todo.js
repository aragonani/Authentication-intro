const Todo = require('../models/todo');

// GET /product (Public) - View all products
async function getAllProducts(req, res) {
    try {
        const todos = await Todo.find({}).sort({ createdAt: -1 });
        res.render('index', { todos: todos, user: req.user });
    } catch (err) {
        res.status(500).send("Error fetching products");
    }
}

// GET /product/:id (Public) - View single product details
async function getProductDetail(req, res) {
    try {
        const product = await Todo.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.render('product-detail', { product: product, user: req.user });
    } catch (err) {
        res.status(500).send("Error fetching product details");
    }
}

// POST /product (Protected) - Create new product
async function createProduct(req, res) {
    try {
        const { title, description, price, image } = req.body;
        await Todo.create({
            title,
            description,
            price: price ? Number(price) : 0,
            image: image || ''
        });
        res.redirect('/product');
    } catch (err) {
        res.status(500).send("Error creating product");
    }
}

// GET /product/:id/edit (Protected) - Render edit form
async function renderEditForm(req, res) {
    try {
        const product = await Todo.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.render('edit-product', { product: product, user: req.user });
    } catch (err) {
        res.status(500).send("Error loading edit page");
    }
}

// POST /product/:id/update (Protected) - Save updated product
async function updateProduct(req, res) {
    try {
        const { title, description, price, image } = req.body;
        await Todo.findByIdAndUpdate(req.params.id, {
            title,
            description,
            price: price ? Number(price) : 0,
            image: image || ''
        });
        res.redirect(`/product/${req.params.id}`);
    } catch (err) {
        res.status(500).send("Error updating product");
    }
}

// POST /product/:id/delete (Protected) - Delete product
async function deleteProduct(req, res) {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.redirect('/product');
    } catch (err) {
        res.status(500).send("Error deleting product");
    }
}

module.exports = {
    getAllProducts,
    getProductDetail,
    createProduct,
    renderEditForm,
    updateProduct,
    deleteProduct
};
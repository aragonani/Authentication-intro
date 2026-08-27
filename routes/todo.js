const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductDetail,
    createProduct,
    renderEditForm,
    updateProduct,
    deleteProduct
} = require('../controller/todo');
const { requireAuth } = require('../middleware/checkAuth');

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductDetail);

// Protected routes
router.post('/', requireAuth, createProduct);
router.get('/:id/edit', requireAuth, renderEditForm);
router.post('/:id/update', requireAuth, updateProduct);
router.post('/:id/delete', requireAuth, deleteProduct);

module.exports = router;
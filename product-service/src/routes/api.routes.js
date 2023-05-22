const express = require('express');
router = express.Router();

/* ------------------------------- CONTROLLERS ------------------------------------ */
const ProductController = require('../controller/product.controller');

/* ------------------------------- REQUEST VALIDATOR ------------------------------ */


/* ------------------------------- TOKEN VALIDATOR -------------------------------- */
const tokenMiddleware  = require('../middleware/jwt.middleware');


/* ------------------------------- ACCOUNT ROUTERS ------------------------------- */
router.get('/product/get-product', tokenMiddleware.verifyToken, ProductController.getAllProduct);
router.delete('/product/quantity/:id', ProductController.updateProductQuantity);
router.get('/product/:id', ProductController.getProductById);
router.post('/product/create', ProductController.createProduct);
router.put('/product/update', ProductController.specificProductUpdate);



module.exports = router;


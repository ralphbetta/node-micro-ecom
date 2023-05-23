const express = require('express');
router = express.Router();

/* ------------------------------- CONTROLLERS ------------------------------------ */
const ProductController = require('../controller/product.controller');

/* ------------------------------- REQUEST VALIDATOR ------------------------------ */


/* ------------------------------- TOKEN VALIDATOR -------------------------------- */
const tokenMiddleware  = require('../middleware/jwt.middleware');


/* ------------------------------- ACCOUNT ROUTERS ------------------------------- */
router.get('/product/get-product', tokenMiddleware.verifyToken, ProductController.getAllProduct);
router.delete('/product/delete/:id', ProductController.deleteProduct);
router.get('/product/:id', ProductController.getProductById);
router.post('/product/create', tokenMiddleware.verifyToken, ProductController.createProduct);
router.put('/product/update/:id', tokenMiddleware.verifyToken, ProductController.specificProductUpdate);



module.exports = router;


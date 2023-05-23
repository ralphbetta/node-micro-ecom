const { validationResult } = require('express-validator');
const { Product } = require("../model/database");
const RabbitMQ = require('../utills/rabbitmq.service');



class ProductController {

  static getAllProduct(req, res) {
    Product.findAll({ attributes: { exclude: ['password'] } })
      .then((product) => {

        product = product.sort((a, b) => b.createdAt - a.createdAt);

        return res.status(200).json({
          error: false,
          message: "Products fetched successfully",
          data: product
        });

      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
      });
  }

  static getProductById(req, res) {
    const { id } = req.params;

    Product.findByPk(id, { attributes: { exclude: ['', 'createdAt'] } })
      .then((product) => {

        if (!product) {
          return res.status(404).json({
            error: true,
            message: "Product not found.",
            data: {}
          });

        }

        return res.status(200).json({
          error: true,
          message: "Product fetched successfully",
          data: product
        });


      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
      });
  }


  static createProduct(data) {
    data = JSON.parse(data);
  
    const newProduct = new Product({
        "name": data.name,
        "price": data.price,
        "description": data.description,
        "quantity": data.quantity,
        "product_id": data.id

      });

    newProduct.save().then((result)=>{
      console.log(result.dataValues);
    });
  }

  static updateProductQuantity(req, res) {
    const { id } = req.params;

    Product.findByPk(id)
      .then((product) => {
        if (!product) {
          return res.status(404).json({ error: true, message: 'Product Not Found', data: {} });
        }

        product.quantity = req.body.quantity;

        return product.save();
      })
      .then((response) => {
        return res.status(200).json({ error: false, message: 'product Updated', data: response });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
      });
  }


  /*----------------------------------------
  This Function can solve all update issh
  -----------------------------------------*/

  static specificProductUpdate(req, res) {
    const { id } = req.params;
    Product.findByPk(id)
      .then((product) => {
        if (!product) {
          return res.status(404).json({ error: true, message: 'Product Not Found', data: {} });
        }
        product.update(req.body);

        product.save().then((xyz) => {
          return res.json(xyz);
        });

      })
      .catch((error) => {
        res.status(500).json({ error: 'Server Error' });
      });
  };



  static deleteProduct(req, res) {
    const { id } = req.params;

    Product.findByPk(id)
      .then((product) => {
        if (!product) {
          return res.status(404).json({ error: true, message: 'Product Not Found', data: {} });
        }
        product.destroy().then(() => {
          return res.status(200).json({ error: false, message: 'product Deleted', data: {} });
        });
      }).catch((error) => {
        return res.status(500).json({ error: true, message: 'Server Error' });
      });
  }


}

module.exports = ProductController;

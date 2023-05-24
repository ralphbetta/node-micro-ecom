const { validationResult } = require('express-validator');
const { Product } = require("../model/database");



class ReportController {

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


  /*----------------------------------------
  This Function can solve all update issh
  -----------------------------------------*/

  static updateProduct(data) {
    data = JSON.parse(data);

    const  id = data.id;

    Product.findOne({where: {product_id: id}})
      .then((product) => {
        if (!product) {
          throw Error("Product not found in reporting service");
        }
        product.update(data);

        product.save().then((xyz) => {
         console.log(xyz.dataValues)
        });

      })
      .catch((error) => {
        throw Error("Internal Server Error");
      });
  };

  static addRating(data) {
    data = JSON.parse(data);
    const { productId, userId, rating, review } = data;

        Product.findOne({where: {product_id: id}}).then((product) => {
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        // Add the new rating to the 'rating' array
        product.rating.push({ userId, rating, review });

        product.save().then((response)=>{
          return res.status(200).json({ message: 'Rating added successfully', response });
        });
      }).catch((error)=>{
      console.error(error);
      return res.status(500).json({ error: 'Server Error' });
    })
  }



  static deleteProduct(data) {
    data = JSON.parse(data);

    const  id = data.id;
    
    Product.findOne({where: {product_id: id}})
      .then((product) => {
        if (!product) {
          console.log('Product Not Found')
          return;
        }
        product.destroy().then(() => {
          console.log("product Deleted");
          return;
        });
      }).catch((error) => {
        console.log("Server Error")
        return;
       });
  }


}

module.exports = ReportController;

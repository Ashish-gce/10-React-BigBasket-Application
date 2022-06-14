// Here, we need one "router" to write all REST_API configuration
const { request, response } = require("express");
const express = require("express");
const router = express.Router(); // here "Router()" is an inbuilt function in Express JS
const Product = require("../models/product");

/*
    Usage : Get all the products
    URL : http://127.0.0.1:5000/api/products
    Request : GET
    method : router.get()
    fields  : no-fields
*/
// router.get("/products", (request, response) => {
//   response.status(200).json({
//     message: "Get all products at a time.",
//   });
// });

// we're doing "router.get()" by   async-await    b'z 'product.find()' take some time.
router.get("/products", async (request, response) => {
  try {
    let products = await Product.find();
    response.status(200).json(products);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: error,
    });
  }
});

/*
    Usage : Get a single products
    URL : http://127.0.0.1:5000/api/products/:id
    Request : GET
    method : router.get()
    fields  : no-fields
*/
router.get("/products/:id", async (request, response) => {
  //  "request.params.id" to get the product id.
  let productId = request.params.id;
  // response.status(200).json({
  //   message: "Get one products at a time.",
  //   productId: `${productId}`,
  // });

  try {
    let products = await Product.findById(productId);
    response.status(200).json(products);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: error,
    });
  }
});

/*
    Usage : Create a products
    URL : http://127.0.0.1:5000/api/products
    Request : POST
    method : router.post()
    fields  : name, image, price, qty, information
*/
router.post("/products", async (request, response) => {
  // below we're cross check that we're receiving form data or not.
  let newProduct = {
    name: request.body.name,
    image: request.body.image,
    price: request.body.price,
    qty: request.body.qty,
    info: request.body.info,
  };
  // response.status(200).json({
  //   message: "Here we're crteating a brand new product.",
  //   product: newProduct,
  // });

  // Now, insert above data into database
  try {
    // if product is already exists  means  "name" is unique and name is already present
    let product = await Product.findOne({ name: newProduct.name });
    if (product) {
      // if product/ is matched then return/exit w/o showing anything
      return response.status(401).json({
        message: "Product/Name is already exist.",
      });
    }
    // save to database
    // taking above created object and populate/insert that into table and save() them
    product = new Product(newProduct);
    // "await product.save()" this function is return after saving is done
    //  created table is save
    product = await product.save();
    response.status(200).json({
      result: "Successfully product is created.",
      product: product,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: error,
    });
  }
});

/*
    Usage : Update one product details
    URL : http://127.0.0.1:5000/api/products/:id
    Request : PUT
    method : router.put()
    fields  : name, image, price, qty, information
*/
router.put("/products/:id", async (request, response) => {
  //  "request.params.id" to get the product id.
  let productId = request.params.id;
  // below we're cross check that we're receiving form data or not.
  let updatedProduct = {
    name: request.body.name,
    image: request.body.image,
    price: request.body.price,
    qty: request.body.qty,
    info: request.body.info,
  };
  // response.status(200).json({
  //   message: "Existing product data is updated",
  //   product: updatedProduct,
  //   updatedProductId: productId,
  // });

  try {
    //  if product already there, we'll update, not then not update
    let product = await Product.findById(productId);
    if (!product) {
      return response.status(401).json({
        msg: "Product is not exist.",
      });
    }
    // update the database
    product = await Product.findByIdAndUpdate(
      productId,
      {
        $set: updatedProduct,
      },
      { new: true }
    );
    response.status(200).json({
      result: "Product updation successfully.",
      product: product,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: error.message,
    });
  }
});

/*
    Usage : Delete a single products
    URL : http://127.0.0.1:5000/api/products/:id
    Request : DELETE
    method : router.delete()
    fields  : no-fields
*/
router.delete("/products/:id", async (request, response) => {
  //  "request.params.id" to get the product id.
  let productId = request.params.id;
  // response.status(200).json({
  //   message: "Mentained id data is deleted",
  //   productId: productId,
  // });

  try {
    product = await Product.findById(productId);
    if (!product) {
      return response.status(401).json({
        msg: "Product is not found.",
      });
    }
    // delete the product from database
    product = await Product.findByIdAndDelete(productId);
    response.status(200).json({
      result: "Product deleted successfully",
      product: product,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: error,
    });
  }
});

module.exports = router;

const orderRepo = require("../repositories/orderRepo");
const productRepo = require("../repositories/productRepo");

const get = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const size = req.params.size || 10;
    const data = await orderRepo.get(page, size);
    res.status(200).json({
      data: data,
    });
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};
const add = async (req, res) => {
  try {
    req.body.userId = req.userId;
    if (req.body.products[0]) {
      const productId = req.body.products[0].productId;
      if (productId.length == 24) {
        const quantity = req.body.products[0].quantity;
        const product = await productRepo.getById(productId);
        if (!product) {
          res.status(404).send("Product not found");
        } else if (product.stock < quantity) {
          req.body.status = "failure";
          await orderRepo.add(req.body);
          res.status(406).send("Insufficient quantity");
        } else {
          req.body.status = "success";
          await orderRepo.add(req.body);
          product.stock = product.stock - quantity;
          await productRepo.patch(productId, { stock: product.stock });
          res.status(200).json({ details: "Order Placed Successfully" });
        }
      } else {
        res.status(400).send("product length must me 24");
      }
    } else {
      res.status(400).send("Invalid request");
    }
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  get,
  add,
};

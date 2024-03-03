const productRepo = require("../repositories/productRepo");
const categoryRepo = require("../repositories/categoriesRepo");

const get = async (req, res) => {
  try 
  {
    const page = req.params.page || 1;
    const size = req.params.size || 10;
    const search = req.query.search || "";
    const productCount = await productRepo.count(search);
    const pages = Math.ceil(productCount / size);
    // if (req.role.canReadProducts) {
      // let products = [];
      // if (search) {
      //   const regexQuery = new RegExp(search, "i");
      //   products = await productRepo.getBySearch(search);
      //   if (products.length == 0) {
      //     const category = await categoryRepo.getBySearch(search);
      //     if (category) {
      //       const catId = category._id;
      //       products = await productRepo.getByCategoryId(catId);
      //     }
      //   }
      // } else {
      //    products = await productRepo.get(page, size);
      // }
      products = await productRepo.get(page, size);
      const response = {
        metaData: {
          pages: pages,
          rows: productCount,
        },
        productData: products,
      };

      res.status(200);
      res.json(response);
    } 
    // else {
    //   res.status(401).send("You don't have permission to perform this action");
    // }
  // }
   catch (err) {
    console.error(err);
    res.status(500);
    res.send(err.message);
  }
};

const add = async (req, res) => {
  try {
    if (true||req?.role?.canUpdateProducts) {
      const body = req.body;
      await productRepo.add(body);
      res.status(201).send("product added succesfully");
    } else {
      res.status(401).send("Your role does'nt allow you to proceed");
    }
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};
async function getById(req, res) {
  try {
    const id = req.params.id;
    const data = await productRepo.getById(id);
    if (data) {
      res.status(200);
      res.json(data);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

const remove = async (req, res) => {
  try {
    if (req.role.canManageSystem || req.role.canUpdateProducts) {
      const id = req.params.id;
      await productRepo.remove(id);
      res.status(204).send("Product Deleted Succesfully");
    } else {
      res.status(401).send("Your role does'nt allow you to proceed");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const put = async (req, res) => {
  try {
    if (req.role.canManageSystem || req.role.canUpdateProducts) {
      const id = req.params.id;
      const payload = req.body;
      const updatedProduct = await productRepo.updateAll(id, payload);
      res.status(200).json({
        status: "Updated succesfully",
      });
    } else {
      res.status(401).send("Your role does'nt allow you to proceed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  get,
  add,
  getById,
  remove,
  put,
};

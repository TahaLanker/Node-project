const categoriesRepo = require("../repositories/categoriesRepo");
const ObjectId = require("mongoose").Types.ObjectId;
const add = async (req, res) => {
  try {
    if (ObjectId.isValid(req.body.parentId)) {
      const parentCategoryData = await categoriesRepo.getById(
        req.body.parentId
      );
      console.log(parentCategoryData);
      if (parentCategoryData) {
        if (req.body.name && req.body.name.length >= 3) {
          await categoriesRepo.add(req.body);
          res.status(201).send("created");
        } else {
          res
            .status(400)
            .send(
              "category name must have more than 2 characters and parentId is required"
            );
        }
      } else {
        res.status(400).send("Parent Id did not match any record");
      }
    } else {
      res.status(401).send("invalid parentId");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
const get = async (req, res) => {
  try {
    const data = await categoriesRepo.get();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    await categoriesRepo.remove(id);
    res.status(204).send("Deleted succesfully");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  try {
    await categoriesRepo.update(req.params.id, req.body);
    res.status(200).send("updated");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  add,
  get,
  remove,
  update,
};

const userRepo = require("../repositories/userRepo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const body = req.body;

    const plainPassword = body.password;
    console.log(typeof plainPassword);
    if (plainPassword.length <= 3) {
      res
        .status(422)
        .json({
          passwordLengthCheck: "Password must me greater than 3 characters",
        });
    } else {
      const hashedPassword = await bcrypt.hash(plainPassword, 3);
      body.password = hashedPassword;

      await userRepo.add(body);
      res.status(201).send("User Created");
    }
  } catch (err) {
    if (err.message && err.message.indexOf("duplicate key error") > -1) {
      res.status(409).send("Email already Exists");
    } else if (
      err.message &&
      err.message.indexOf("users validation failed") > -1
    ) {
      res.status(400);
      res.json(err.errors);
    } else {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
};

const signIn = async (req, res) => {
  try {
    const user = await userRepo.get(req.body);
    const hashCheckPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (hashCheckPassword) {
      const token = jwt.sign(
        { email: user.email, roleId: user.roleId,id:user._id },
        "secret",
        { expiresIn: "1d" }
      );
      res.status(200).json({ token: token });
    } else {
      res.status(401).send("Wrong email or password");
    }
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  signUp,
  signIn,
};

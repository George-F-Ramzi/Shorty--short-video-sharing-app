const joi = require("joi");
const hasing = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/prisma");

const Login = async (req, res) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const { email, password } = req.body;
  const find = await prisma.user.findFirst({ where: { email } });
  console.log(find);

  if (find) {
    const validate = await hasing.compare(password, find.password);
    if (!validate) return res.status(400).send("Invalid password");
    const token = jwt.sign({ _id: find.id }, process.env.JWT_KEY);
    res.header("x-auth-token", token).status(200).send("Login Done");
  } else {
    res.status(400).send("Invalid email");
  }
};

const Register = async (req, res) => {
  const schema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const { username, email, password } = req.body;

  const find = await prisma.user.findFirst({ where: { email } });
  const photo =
    "https://res.cloudinary.com/dwnvkwrox/image/upload/v1671018225/123456789.png";

  const photoId = "123456789";

  if (find) return res.status(400).send("email already exist");
  const hashedPassword = await hasing.hash(password, 10);
  const create = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      photo,
      photoId,
    },
  });
  const token = jwt.sign({ _id: create.id }, process.env.JWT_KEY);
  res.header("x-auth-token", token).status(200).send("Register Done");
};

const AllowJoin = async (req, res) => {
  res.status(200).send("You Can Join");
};

module.exports = {
  Login,
  Register,
  AllowJoin,
};

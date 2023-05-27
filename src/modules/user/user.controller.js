const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserCollection = require("./user.schema");
const SecretKey = "f0odm@rt";

const signInHandler = async (req, res) => {
  // console.log('Hitted signing', req.query)
  const { email, password } = req.query;

  try {
    const oldUser = await UserCollection.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, SecretKey,  {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// User Signup
const userSignUpController = async (req, res) => {
  console.log('Hitted', req.body)
    const { email, password, name } =
      req.body;

    try {
      const oldUser = await UserCollection.findOne({ email: email });
  
      if (oldUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await UserCollection.create({
        email: email,
        password: hashedPassword,
        name: name,
      });
  
    //   const token = jwt.sign({ email: result.email, id: result._id }, SecretKey, {
    //     expiresIn: "1h",
    //   });
    const token = jwt.sign({ email: result.email, id: result._id }, SecretKey ,{
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });

    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };


//get user
const getUserController = async (req, res) => {
  res.json({ message: "User Authorized" });
};

function authenticateToken(req, res, next) {
  // console.log('Hitted broo', req)
  const authHeader = req.headers.authorization;
  const token = req.headers.authorization;

  if (!token) {
    console.log('not found e dukse')
    return res.status(401).json({ error: 'Missing token' });
  }

  jwt.verify(token, SecretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}



  module.exports = {
    userSignUpController,
    signInHandler,
    authenticateToken,
    getUserController
  };
  
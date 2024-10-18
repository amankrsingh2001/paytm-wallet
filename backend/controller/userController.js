const { JWT_SECRET } = require("../config");
const { User } = require("../models/User");
const { signUpSchema, signInSchema, updateBody } = require("../utils/zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Account } = require("../models/accountSchema");

const signUp = async (req, res) => {
  try {
    const body = req.body;
    const { success } = signUpSchema.safeParse(body);
    if (!success) {
      return res.status(400).json({
        message: "Invaild input/ Email already in use",
      });
    }

    const user = await User.findOne({
      username: body.username.toLowerCase(),
    });

    if (user) {
      return res.status(401).json({
        message: "Username already taken",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(body.password, salt);

    const dbUser = await User.create({
      username: body.username,
      password: hashedpassword,
      firstName: body.firstName,
      lastName: body.lastName,
    });
    console.log(dbUser, "This is the db user");

    await Account.create({
      userId : dbUser._id,
      amount: Math.random() * 10000,
    });

    const token = jwt.sign(
      {
        userId: dbUser._id.toString(),
      },
      JWT_SECRET
    );

    return res.status(200).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};





const signIn = async (req, res) => {

try {
    const body = req.body;
    const { success } = signInSchema.safeParse(body);
    if (!success) {
      return res.status(400).json({
        message: "Input Error/ Email error",
      });
    }
    const user =  await User.findOne({ username : body.username })  

    if (!user._id) {
      return res.status(401).json({
        message: "User does not exist please signIn",
      });
    }
    const validUser = await bcrypt.compare(body.password, user.password);
  
    if (!validUser) {
      return res.status(401).json({
        message: "Email / Password is not valid",
      });
    }
  
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    return res.status(200).json({
      message: "User signedup successfully",
      token: token,
    });
} catch (error) {
    return res.status(500).json({error:error})
}
};

const updateUser = async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(401).json({
      message: "Error while updating information",
    });
  }
  await User.updateOne({
    _id: req.userId,
  });

  return res.status(200).json({
    success: true,
    message: "User Information updated Successfully",
  });
};

const bulkUser = async (req, res) => {

 try {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          "$regex": filter,
        },
       
      },
      {
        lastName: {
          "$regex": filter,
        },
      }
    ],

  });

  res.json({
    user: users.map((user) => {
      return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      };
    }),
  });
 } catch (error) {
    console.log(error)
 }
};

module.exports = {
  signUp,
  signIn,
  updateUser,
  bulkUser,
};

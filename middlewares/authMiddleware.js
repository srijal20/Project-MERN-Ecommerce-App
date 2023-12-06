import JWT from "jsonwebtoken";
import usermodel from "../models/usermodel.js";
//protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      messsage: "Error in SignIn Middleware",
    });
  }
};

//addmin accesss
export const isAdmin = async (req, res, next) => {
  try {
    const user = await usermodel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: true,
        messsage: "Unauthorized Accesss",
      });
    } else next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      messsage: "Error in admin Middleware",
    });
  }
};

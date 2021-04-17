import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

/* JWT secret key */
const KEY = process.env.JWT_KEY;
/* Users collection sample */
const USERS = [];

export default (req, res) => {
  return new Promise(async(resolve) => {
    const { method } = req;
    try {
      switch (method) {
        case "POST":
          /* Get Post Data */
          const { email, password, name } = req.body;
          /* Any how email or password is blank */
          if (!email || !password || !name) {
            return res.status(400).json({
              status: "error",
              error: "Request missing name, email or password",
            });
          }

          const user = {
            name: name,
            email: email,
            password: await bcrypt.hash(password, 8),
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };

          /* Save user in database */
          res.status(200).json({
            success: true,
            user:user,
          });
          /* Variables checking */
          break;
        case "PUT":
          break;
        case "PATCH":
          break;
        default:
          break;
      }
    } catch (error) {
      throw error;
    }
    return resolve();
  });
};

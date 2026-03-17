import { Validator } from "../helpers/validator.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

class UserController {
  async update(req, res) {
    //users are allowed to update their addresses and phone numbers
    const userId = res.locals.claims.userId;
    const { address, phone_number } = req.body;

    const updatedUser = {
      address: address,
      phone_number: phone_number,
    }

    User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    })
      .then((user) => {
        if (user) {
          user = user.toObject();
          delete user.password;
          return res.status(200).json(user);
        }
        else {
          return res.status(400).json({
            message: "invalid id",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  }

  async updatePassword(req, res) {
    const userId = res.locals.claims.userId;
    const { old_password, new_password } = req.body;
    
    if (old_password === undefined || new_password === undefined) {
      return res.status(400).json({
        message: "really funny today arent we?"
      });
    }

    const validator = new Validator();
    if (!validator.isPassword(new_password)) {
      return res.status(400).json({
        message: "really funny today arent we?"
      });
    } 

    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "invalid id",
      });
    }
    
    const matched = await bcrypt.compare(old_password, user.password);
    if (!matched) {
      return res.status(401).json({
        message: "Wrong credentials",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(new_password, salt);

    User.findByIdAndUpdate(userId, { password: password }, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            message: "invalid id",
          });
        }
        user = user.toObject();
        delete user.password;
        return res.status(200).json(user);

      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  }

  async retrieve(req, res) {
    let user = await User.findById(res.locals.claims.userId);
    user = user.toObject();
    delete user.password;
    return res.status(200).json(user);
  }
}

export {
  UserController
}
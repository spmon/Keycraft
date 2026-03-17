import express from 'express';
import { User } from '../models/user.js';
import { Validator } from '../helpers/validator.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {
  async register(req, res) {
    const validator = new Validator();
    const { email, username, password } = req.body;
    if (email === undefined || username === undefined || password === undefined) {
      return res.status(400).json({
        "message": "really funny today arent we?"
      });
    }
    if (!validator.isEmail(email) || !validator.isUsername(username) || !validator.isPassword(password)) {
      return res.status(400).json({
        "message": "really funny today arent we?"
      });
    }
    const user = await User.findOne({ $or: [{ email: email }, { username: username }] });
    if (!user) {
      //success

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        email: email,
        name: username,
        password: hashedPassword,
        role: 0,
      }

      User.create(newUser)
        .then((user) => {
          user = user.toObject();
          delete user.password;
          return res.status(201).json(user);
        })
        .catch((err) => {
          return res.status(500).json({
            "error": err,
          });
        });
    }
    else {
      if (user.email === email) {
        return res.status(409).json({
          "message": "This email has been used",
        });
      }
      if (user.username === username) {
        return res.status(409).json({
          "message": "This username has been used",
        });
      }
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    const validator = new Validator();
    if (username === undefined || password === undefined) {
      res.cookie("jwt", "", {
        httpOnly: true,
        maxAge: 0,
      });
      return res.status(400).json({
        "message": "really funny today arent we?"
      });
    }
    if (!validator.isUsername(username) || !validator.isPassword(password)) {
      res.cookie("jwt", "", {
        httpOnly: true,
        maxAge: 0,
      });
      return res.status(400).json({
        "message": "really funny today arent we?"
      });
    }

    //pass troll-check

    let user = await User.findOne({ name: username });

    if (!user) {
      res.cookie("jwt", "", {
        httpOnly: true,
        maxAge: 0,
      });
      return res.status(401).json({
        "message": "Wrong credentials!",
      });
    }
   
    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      res.cookie("jwt", "", {
        httpOnly: true,
        maxAge: 0,
      });
      return res.status(401).json({
        "message": "Wrong credentials!",
      });
    }

    if (!process.env.SECRET) {
      return res.status(500).json({
        "message": "Server error: No secret key",
      });
    }
    
    const token = await jwt.sign({ username: user.name, userId: user._id }, process.env.SECRET);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    user = user.toObject();
    delete user.password;
    return res.status(200).json(user);
  }
  
  logout(req, res) {
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: 0,
    });
    return res.status(200).json({
      "message": "log out successfully"
    });
  }
}

export {
  AuthController
}
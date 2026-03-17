import mongoose from "mongoose";
import { OrderUnit } from "../models/orderUnit.js";
import { Product } from "../models/product.js";
import { Manufacturer } from "../models/manufacturer.js";
import { Keyboard } from "../models/keyboard.js";
import { Keycap } from "../models/keycap.js";
import { Kit } from "../models/kit.js";
import { Switch } from "../models/switch.js";
import { Order } from "../models/order.js";
import { User } from "../models/user.js";

class OrderController {
  async add(req, res) {
    const userId = res.locals.claims.userId;

    const { shipping_address, phone_number, products } = req.body;

    let newOrder = {
      user: new mongoose.Types.ObjectId(userId),
      shipping_address: shipping_address,
      phone_number: phone_number,
      status: "pending",
      units: [],
    }

    for await (let product of products) {
      const newOrderUnit = {
        product: new mongoose.Types.ObjectId(product.id),
        quantity: product.quantity,
      }
      await OrderUnit.create(newOrderUnit)
        .then((newUnit) => {
          newOrder.units.push(newUnit._id);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    }

    newOrder = await Order.create(newOrder);
    if (newOrder) {
      newOrder = newOrder.toObject();
      let unitsList = newOrder.units;
      newOrder.units = [];
      for (let unit of unitsList) {
        let orderUnit = await OrderUnit.findById(unit);
        let product = await Product.findById(orderUnit.product);
        if (product) {
          product = product.toObject();
          if (product.category === "keyboard") {
            let specs = await Keyboard.findById(product.specs);
            specs = specs.toObject();
            specs.manufacturer = await Manufacturer.findById(specs.manufacturer);
            specs.switch_manufacturer = await Manufacturer.findById(specs.switch_manufacturer);
            product.specs = specs;
          }
          else if (product.category === "switch") {
            let specs = await Switch.findById(product.specs);
            specs = specs.toObject();
            specs.manufacturer = await Manufacturer.findById(specs.manufacturer);
            product.specs = specs;
          }
          else if (product.category === "keycap") {
            let specs = await Keycap.findById(product.specs);
            specs = specs.toObject();
            specs.manufacturer = await Manufacturer.findById(specs.manufacturer);
            product.specs = specs;
          }
          else if (product.category === "kit") {
            let specs = await Kit.findById(product.specs);
            specs = specs.toObject();
            specs.manufacturer = await Manufacturer.findById(specs.manufacturer);
            product.specs = specs;
          }
          newOrder.units.push(product);
        }
      }
      return res.status(201).json(newOrder);
    }
    else {
      return res.status(500).json({
        "message": "server's error",
      });
    }
  }
  
  async index(req, res) {
    const userId = res.locals.claims.userId;
    const user = await User.findById(userId);
    
    let orders = [];

    if (user.role) {
      //admin, query all order
      orders = await Order.find({});
    }
    else {
      orders = await Order.find({ user: userId });
    }
    
    let allOrders = [];
    
    for (let ord of orders) {
      let order = ord.toObject();
      let unitsList = order.units;
      order.units = [];
      for (let unit of unitsList) {
        let orderUnit = await OrderUnit.findById(unit);
        let product = await Product.findById(orderUnit.product);
        if (product) {
          product = product.toObject();
          if (product.category === "keyboard") {
            let specs = await Keyboard.findById(product.specs);
            specs = specs.toObject();
            specs.manufacturer = await Manufacturer.findById(specs.manufacturer);
            specs.switch_manufacturer = await Manufacturer.findById(specs.switch_manufacturer);
            product.specs = specs;
          }
          else if (product.category === "switch") {
            let specs = await Switch.findById(product.specs);
            specs = specs.toObject();
            specs.manufacturer = await Manufacturer.findById(specs.manufacturer);
            product.specs = specs;
          }
          else if (product.category === "keycap") {
            let specs = await Keycap.findById(product.specs);
            specs = specs.toObject();
            specs.manufacturer = await Manufacturer.findById(specs.manufacturer);
            product.specs = specs;
          }
          else if (product.category === "kit") {
            let specs = await Kit.findById(product.specs);
            specs = specs.toObject();
            specs.manufacturer = await Manufacturer.findById(specs.manufacturer);
            product.specs = specs;
          }
          order.units.push(product);
        }
      }
      allOrders.push(order);
    }
    return res.status(200).json(allOrders);
  }
  
  async update(req, res) {
    //chi cho phep admin update trang thai
    const { id, status } = req.body;

    let orderDoc = await Order.findById(id);
    orderDoc.status = status !== undefined ? status : orderDoc.status;
    orderDoc.save();
    return res.status(200).json({
      'message': "success",
    });
  }
  
  async delete(req, res) {
    const id = req.params.id;

    const userId = res.locals.claims.userId;
    const user = await User.findById(userId);
    if (!user.role) {
      const order = await Order.findById(id);
      if (order.user !== userId) {
        return res.status(403).json({
          "message": "unauthorized",
        })
      }
    }

    if (!id) {
      return res.status(400).json({
        "message": "invalid id"
      });
    }
    
    Order.findByIdAndDelete(id)
    .then(() => {
      return res.status(200).json({
        "message": "success",
      })
    })
    .catch((err) => {
      return res.stasus(500).json(err);
    })
  }
}

export {
  OrderController
}
import { Keyboard } from "../models/keyboard.js";
import { Manufacturer } from "../models/manufacturer.js";
import { Product } from "../models/product.js";
import mongoose from "mongoose";
import { Switch } from "../models/switch.js";
import { Keycap } from "../models/keycap.js";
import { Kit } from "../models/kit.js";

class ProductController {
  async add(req, res) {


    let { name, price, discounted, stock, images, description, category, specs } = req.body;

    let newProduct = {
      name: name,
      price: price,
      discounted: discounted,
      stock: stock,
      images: images,
      description: description,
      category: category,
    }


    let manufacturerName = specs.manufacturer;
    console.log(manufacturerName);
    if (category === "keyboard") {
      let switchManufacturerName = specs.switch_manufacturer;
      const manufacturer = await Manufacturer.findOne({ name: manufacturerName, category: "keyboard" });
      if (!manufacturer) {
        return res.status(400).json({
          "message": "manufacturer does not exist",
        });
      }

      const switchManufacturer = await Manufacturer.findOne({ name: switchManufacturerName, category: "switch" });

      if (!switchManufacturer) {
        return res.status(400).json({
          "message": "manufacturer does not exist",
        });
      }

      let newKeyboard = {
        manufacturer: manufacturer._id,
        switch_manufacturer: switchManufacturer._id,
        size: specs.size,
        case_color: specs.case_color,
        switch_type: specs.switch_type,
        actuation_force: specs.actuation_force,
      };

      Keyboard.create(newKeyboard)
        .then((newKeyboard) => {
          const entryId = newKeyboard._id;
          newProduct.specs = new mongoose.Types.ObjectId(entryId);
          Product.create(newProduct)
            .then((newProduct) => {
              newProduct = newProduct.toObject();
              newKeyboard = newKeyboard.toObject();
              newKeyboard.manufacturer = manufacturer;
              newKeyboard.switch_manufacturer = switchManufacturer;
              newProduct.specs = newKeyboard;
              return res.status(201).json(newProduct);
            })
            .catch((err) => {
              return res.status(500).json(err);
            })
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    }
    else if (category === "switch") {
      let manufacturer = await Manufacturer.findOne({ name: manufacturerName, category: "switch" });
      if (!manufacturer) {
        return res.status(400).json({
          "message": "manufacturer does not exist"
        });
      }
      const newSwitch = {
        manufacturer: manufacturer._id,
        switch_type: specs.switch_type,
        actuation_force: specs.actuation_force
      }

      Switch.create(newSwitch)
        .then((newSwitch) => {
          const entryId = newSwitch._id;
          newProduct.specs = new mongoose.Types.ObjectId(entryId);
          Product.create(newProduct)
            .then((newProduct) => {
              newSwitch = newSwitch.toObject();
              newProduct = newProduct.toObject();
              newSwitch.manufacturer = manufacturer;
              newProduct.specs = newSwitch;
              return res.status(201).json(newProduct);
            })
            .catch((err) => {
              return res.status(500).json(err);
            })
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    }
    else if (category === "keycap") {
      let manufacturer = await Manufacturer.findOne({ name: manufacturerName, category: "keycap" });
      if (!manufacturer) {
        return res.status(400).json({
          "message": "manufacturer does not exist",
        });
      }
      const newKeycap = {
        manufacturer: manufacturer._id,
        material: specs.material,
        profile: specs.profile,
      }

      Keycap.create(newKeycap)
        .then((newKeycap) => {
          const entryId = newKeycap._id;
          newProduct.specs = new mongoose.Types.ObjectId(entryId);

          Product.create(newProduct)
            .then((newProduct) => {
              newKeycap = newKeycap.toObject();
              newProduct = newProduct.toObject();
              newKeycap.manufacturer = manufacturer;
              newProduct.specs = newKeycap;
              return res.status(201).json(newProduct);
            })
            .catch((err) => {
              return res.status(500).json(err);
            });
        })
        .catch((err) => {
          return res.status(500).json(err);
        })
    }
    else if (category === "kit") {
      let manufacturer = await Manufacturer.findOne({ name: manufacturerName, category: "kit" });
      if (!manufacturer) {
        return res.status(400).json({
          "message": "manufacturer does not exist",
        });
      }

      const newKit = {
        manufacturer: manufacturer._id,
        case_color: specs.case_color,
        structure: specs.structure,
      }

      Kit.create(newKit)
        .then((newKit) => {
          const entryId = newKit._id;
          newProduct.specs = new mongoose.Types.ObjectId(entryId);

          Product.create(newProduct)
            .then((newProduct) => {
              newKit = newKit.toObject();
              newProduct = newProduct.toObject();
              newKit.manufacturer = manufacturer;
              newProduct.specs = newKit;
              return res.status(201).json(newProduct);
            })
            .catch((err) => {
              return res.status(500).json(err);
            })
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    }
    else {
      return res.status(400).json({
        "message": "invalid category",
      });
    }
  }
  async update(req, res) {
    //only price, discounted, images, name, stock and description are allowed
    let { _id, price, discounted, images, name, stock, description } = req.body;

    let productDoc = await Product.findById(_id);
    if (!productDoc) {
      return res.status(400).json({
        "message": "invalid id"
      })
    }
    productDoc.price = price !== undefined ? price : productDoc.price;
    productDoc.discounted = discounted !== undefined ? discounted : productDoc.discounted;
    productDoc.name = name !== undefined ? name : productDoc.name;
    productDoc.stock = stock !== undefined ? stock : productDoc.stock;
    productDoc.description = description !== undefined ? description : productDoc.description;
    if (images && images.length) {
      for (let image of images) {
        productDoc.images.push(image);
      }
    }
    productDoc.save()
      .then((productDoc) => {
        return res.status(200).json(productDoc);
      })
      .catch((err) => {
        return res.status(500).json(err);
      })
  }
  async delete(req, res) {
    let id = req.params.id;
    let productDoc = await Product.findById(id);
    if (!productDoc) {
      return res.status(400).json({
        "message": "invalid id",
      });
    }
    if (productDoc.category === "keyboard") {
      await Keyboard.findByIdAndDelete(productDoc.specs);
    }
    else if (productDoc.category === "switch") {
      await Switch.findByIdAndDelete(productDoc.specs);
    }
    else if (productDoc.category === "keycap") {
      await Keycap.findByIdAndDelete(productDoc.specs);
    }
    else if (productDoc.category === "kit") {
      await Kit.findByIdAndDelete(productDoc.specs);
    }
    Product.findByIdAndDelete(id)
      .then(() => {
        return res.status(200).json({
          "message": "success",
        });
      })
      .catch((err) => {
        return res.status(500).json(err);
      })
  }
  async detail(req, res) {
    const id = req.params.id;
    let product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({
        "message": "invalid id",
      });
    }
    product = product.toObject();
    if (product.category === "keyboard") {
      let specs = await Keyboard.findById(product.specs);
      specs = specs.toObject();
      specs.manufacturer = await Manufacturer.findById(specs.manufacturer);
      specs.switch_manufacturer = await Manufacturer.findById(specs.switch_manufacturer);
      product.specs = specs;
      return res.status(200).json(product);
    }
    else if (product.category === "switch") {
      let specs = await Switch.findById(product.specs);
      specs = specs.toObject();
      specs.manufacturer = await Manufacturer.findById(specs.manufacturer);
      product.specs = specs;
      return res.status(200).json(product);
    }
    else if (product.category === "keycap") {
      let specs = await Keycap.findById(product.specs);
      specs = specs.toObject();
      specs.manufacturer = await Manufacturer.findById(specs.manufacturer);
      product.specs = specs;
      return res.status(200).json(product);
    }
    else if (product.category === "kit") {
      let specs = await Kit.findById(product.specs);
      specs = specs.toObject();
      specs.manufacturer = await Manufacturer.findById(specs.manufacturer);
      product.specs = specs;
      return res.status(200).json(product);
    }
  }
  async index(req, res) {
    const category = req.params.category;

    let products = [];

    if (!category) {
      products = await Product.find({});
    }
    else {
      products = await Product.find({ category: category });
    }
    
    let allProducts = [];

    for (let product of products) {
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
      allProducts.push(product);
    }
    return res.status(200).json(allProducts);
  }
}

export {
  ProductController
}
import { Manufacturer } from "../models/manufacturer.js";

class ManufacturerController {
  async add(req, res) {
    let { name, category } = req.body;
    let newManufacturer = {
      name,
      category,
    }

    Manufacturer.create(newManufacturer)
    .then((newManufacturer) => {
      return res.status(201).json(newManufacturer);
    })
    .catch((err) => {
      return res.status(500).json({
        "err": err,
      });
    });
  }  
  
  async update(req, res) {
    let { id, name, category } = req.body;

    let manuDoc = await Manufacturer.findById(id);
    if (!manuDoc) {
      return res.status(400).json({
        "message": "invalid id",
      });
    }
    
    manuDoc.name = name !== undefined ? name : manuDoc.name;
    manuDoc.category = name !== undefined ? category : manuDoc.category;
    
    manuDoc.save()
    .then((manuDoc) => {
      return res.status(200).json(manuDoc);
    })
    .catch((err) => {
      return res.status(500).json(err);
    })
  }
  
  async delete(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        "message": "invalid id"
      });
    }
    Manufacturer.findByIdAndDelete(id)
    .then(() => {
      return res.status(200).json({
        "message": "success"
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
  }
  
  async index(req, res) {
    const category = req.params.category;
    Manufacturer.findAll({ category: category })
    .then((manufacturers) => {
      return res.status(200).json(manufacturers);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
  }
}

export {
  ManufacturerController,
}
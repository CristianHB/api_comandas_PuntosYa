const db = require("../models");
const Delivery = db.deliveries;
const Op = db.Sequelize.Op;

// Create and Save a new Delivery
exports.create = (req, res) => {
  // Validate request
  if (!req) {
    res.status(400).send({
      message: `Content  not be empty! ${req.body}`,
    });
    return;
  }

  // Create a Tutorial
  const delivery = {
    id: req.body.id,
    descripcion: req.body.descripcion,
    total: req.body.total,
  };

  // Save Tutorial in the database
  Delivery.create(delivery)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Delivery.",
      });
    });
};

// Retrieve all Couriers from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  console.log(name);
  var condition = name ? { nombre: { [Op.like]: `%${name}%` } } : null;

  Delivery.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Couriers.",
      });
    });
};

// Find a single Delivery with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Delivery.findOne({ where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Delivery with id=" + id,
      });
    });
};

// Update a Delivery by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Delivery.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Delivery was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Delivery with id=${id}. Maybe Delivery was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Delivery with id=" + id,
      });
    });
};

// Delete a Delivery with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  Delivery.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Delivery was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Delivery with id=${id}. Maybe Delivery was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Delivery with id=" + id,
      });
    });
};

// Delete all Couriers from the database.
exports.deleteAll = (req, res) => {
  Delivery.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Couriers were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Couriers.",
      });
    });
};

// Find all actived Couriers
exports.findAllActived = (req, res) => {
  Delivery.findAll({ where: { estado: "1" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Couriers.",
      });
    });
};

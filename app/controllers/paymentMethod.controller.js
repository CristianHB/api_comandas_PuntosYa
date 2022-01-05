const db = require("../models");
const PaymentMethod = db.paymentMethods;
const Op = db.Sequelize.Op;

// Create and Save a new PaymentMethod
exports.create = (req, res) => {
  // Validate request
  if (!req) {
    res.status(400).send({
      message: `Content  not be empty! ${req.body}`,
    });
    return;
  }

  const paymentMethod = {
    nombre: req.body.nombre,
    estado: req.body.estado,
    descripcion: req.body.descripcion,
    local: req.body.local,
  };

  PaymentMethod.create(paymentMethod)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the PaymentMethod.",
      });
    });
};

// Retrieve all PaymentMethods from the database.
exports.findAll = (req, res) => {
  const tienda = req.query.tienda;
  var condition = tienda ? { local: tienda } : null;

  PaymentMethod.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving PaymentMethods.",
      });
    });
};

// Find a single PaymentMethod with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PaymentMethod.findOne({ where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving PaymentMethod with id=" + id,
      });
    });
};

// Update a PaymentMethod by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  PaymentMethod.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PaymentMethod was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update PaymentMethod with id=${id}. Maybe PaymentMethod was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating PaymentMethod with id=" + id,
      });
    });
};

// Delete a PaymentMethod with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  PaymentMethod.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PaymentMethod was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete PaymentMethod with id=${id}. Maybe PaymentMethod was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete PaymentMethod with id=" + id,
      });
    });
};

// Delete all PaymentMethods from the database.
exports.deleteAll = (req, res) => {
  PaymentMethod.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} PaymentMethods were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all PaymentMethods.",
      });
    });
};

// Find all actived PaymentMethods
exports.findAllActived = (req, res) => {
  const tienda = req.body.tienda;
  PaymentMethod.findAll({ where: { estado: "1", local: tienda } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving PaymentMethods.",
      });
    });
};

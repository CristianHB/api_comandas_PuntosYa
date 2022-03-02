const db = require("../models");
const PaymentGateway = db.paymentGateways;
const Op = db.Sequelize.Op;

// Create and Save a new PaymentGateway
exports.create = (req, res) => {
  // Validate request
  if (!req) {
    res.status(400).send({
      message: `Content  not be empty! ${req.body}`,
    });
    return;
  }

  const paymentGateway = {
    nombre: req.body.nombre,
    id_cliente: req.body.id_cliente,
    p_key: req.body.p_key,
    public_key: req.body.public_key,
    local: req.body.local,
  };

  PaymentGateway.create(paymentGateway)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the PaymentGateway.",
      });
    });
};

// Retrieve all PaymentGateways from the database.
exports.findAll = (req, res) => {
  const tienda = req.body.tienda;
  var condition = tienda ? { local: tienda } : null;

  PaymentGateway.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving PaymentGateways.",
      });
    });
};

// Find a single PaymentGateway with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PaymentGateway.findOne({ where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving PaymentGateway with id=" + id,
      });
    });
};

// Update a PaymentGateway by the id in the request
exports.update = (req, res) => {
  const id = req.params.id_cliente;
  var condition = id ? { id_cliente: id } : null;

  const paymentGateway = {
    nombre: req.body.nombre ? req.body.nombre : "",
    id_cliente: req.body.id_cliente,
    p_key: req.body.p_key,
    public_key: req.body.public_key,
    local: req.body.local ? req.body.local : "",
  };

  PaymentGateway.findAll({ where: condition })
    .then((data) => {
      if (data.length > 0) {
        PaymentGateway.update(req.body, {
          where: { id_cliente: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "PaymentGateway was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update PaymentGateway with id=${id}. Maybe PaymentGateway was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating PaymentGateway with id=" + id,
            });
          });
      } else {
        PaymentGateway.create(paymentGateway)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the PaymentGateway.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving PaymentGateways.",
      });
    });
};

// Delete a PaymentGateway with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  PaymentGateway.destroy({
    where: { id_cliente: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PaymentGateway was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete PaymentGateway with id=${id}. Maybe PaymentGateway was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete PaymentGateway with id=" + id,
      });
    });
};

// Delete all PaymentGateways from the database.
exports.deleteAll = (req, res) => {
  PaymentGateway.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} PaymentGateways were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all PaymentGateways.",
      });
    });
};

// Find all actived PaymentGateways
exports.findAllActived = (req, res) => {
  PaymentGateway.findAll({ where: { estado: "1" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving PaymentGateways.",
      });
    });
};

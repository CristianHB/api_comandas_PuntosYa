const db = require("../models");
const Billing = db.billing;
const Op = db.Sequelize.Op;

// Create and Save a new Billing
exports.create = (req, res) => {
  // Validate request
  if (!req) {
    res.status(400).send({
      message: `Content  not be empty! ${req.body}`,
    });
    return;
  }

  let ultimo = 1;

  // Create a Billing
  const billing = {
    id_factura: req.body.id_factura,
    local: req.body.local,
  };

  new Promise((resolve, reject) => {
    lastInserted(req.body.local, resolve, reject);
  }).then((p) => {
    if (p[0].max) {
      ultimo += parseInt(p[0].max);
    }
    billing.consecutivo = ultimo;

    // Save Billing in the database
    Billing.create(billing)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Billing.",
        });
      });
  });
};

// Retrieve all Tips from the database.
exports.findAll = (req, res) => {
  const tienda = req.body.tienda;
  var condition = tienda ? { local: tienda } : null;

  Billing.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tips.",
      });
    });
};

// Find a single Billing with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Billing.findOne({ where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Billing with id=" + id,
      });
    });
};

// Update a Billing by the id in the request
exports.update = (req, res) => {
  const tienda = req.params.tienda;
  let ultimo = 1;

  Billing.findAll({ where: { local: tienda } })
    .then((data) => {
      if (data.length > 0) {
        if (req.body.consecutivo) {
          Billing.update(req.body, {
            where: { local: tienda },
          })
            .then((num) => {
              if (num == 1) {
                res.send({
                  message: "Billing was updated successfully.",
                });
              } else {
                res.send({
                  message: `Cannot update Billing with local=${tienda}. Maybe Billing was not found or req.body is empty!`,
                });
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: "Error updating Billing with local=" + tienda,
              });
            });
        } else {
          new Promise((resolve, reject) => {
            lastInserted(req.body.local, resolve, reject);
          }).then((p) => {
            if (p[0].max) {
              ultimo += parseInt(p[0].max);
            }
            req.body.consecutivo = ultimo;

            Billing.update(req.body, {
              where: { local: tienda },
            })
              .then((num) => {
                if (num == 1) {
                  res.send({
                    message: "Billing was updated successfully.",
                  });
                } else {
                  res.send({
                    message: `Cannot update Billing with local=${tienda}. Maybe Billing was not found or req.body is empty!`,
                  });
                }
              })
              .catch((err) => {
                res.status(500).send({
                  message: "Error updating Billing with local=" + tienda,
                });
              });
          });
        }
      } else {
        // Create a Billing
        const billing = {
          consecutivo: 1,
          id_factura: req.body.id_factura,
          local: req.body.local,
        };

        // Save Billing in the database
        Billing.create(billing)
          .then((data) => {
            res.send({
              message: "Billing was updated successfully.",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Billing.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tips.",
      });
    });
};

// Delete a Billing with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  Billing.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Billing was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Billing with id=${id}. Maybe Billing was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Billing with id=" + id,
      });
    });
};

// Delete all Tips from the database.
exports.deleteAll = (req, res) => {
  Billing.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Tips were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Tips.",
      });
    });
};

// Find all actived Tips
exports.findAllActived = (req, res) => {
  Billing.findAll({ where: { estado: "1" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tips.",
      });
    });
};

//Get last inserted
const lastInserted = (tienda, resolve, reject) => {
  Billing.findAll({
    where: { local: tienda },
    attributes: [[Sequelize.fn("max", Sequelize.col("consecutivo")), "max"]],
    raw: true,
  })
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
};

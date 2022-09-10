const db = require("../models");
const Gmt = db.gmt;
const Op = db.Sequelize.Op;

// Create and Save a new Gmt
exports.create = (req, res) => {
  // Validate request
  if (!req) {
    res.status(400).send({
      message: `Content  not be empty! ${req.body}`,
    });
    return;
  }

  // Create a Gmt
  const gmt = {
    valor_gmt: req.body.valor_gmt,
    local: req.body.local,
  };

  // Save Gmt in the database
  Gmt.create(gmt)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Gmt.",
      });
    });
};

// Retrieve all Gmts from the database.
exports.findAll = (req, res) => {
  const tienda = req.body.tienda;
  var condition = tienda ? { local: tienda } : null;

  Gmt.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Gmt.",
      });
    });
};

// Find a single Gmt with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Gmt.findOne({ where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Gmt with id=" + id,
      });
    });
};

// Update a Gmt by the id in the request
exports.update = (req, res) => {
  const tienda = req.params.tienda;

  Gmt.findAll({ where: { local: tienda } })
    .then((data) => {
      if (data.length > 0) {
        Gmt.update(req.body, {
          where: { local: tienda },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Gmt was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Gmt with local=${tienda}. Maybe Gmt was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Gmt with local=" + tienda,
            });
          });
      } else {
        // Create a Gmt
        const gmt = {
          valor_gmt: req.body.valor_gmt,
          local: tienda,
        };

        // Save Tip in the database
        Gmt.create(gmt)
          .then((data) => {
            res.send({
              message: "Gmt was updated successfully.",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Gmt.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Gmts.",
      });
    });
};

// Delete a Gmt with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  Gmt.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Gmt was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Gmt with id=${id}. Maybe Gmt was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Gmt with id=" + id,
      });
    });
};

// Delete all GmtS from the database.
exports.deleteAll = (req, res) => {
    Gmt.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Gmts were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all GmtS.",
      });
    });
};

// Find all actived Gmts
exports.findAllActived = (req, res) => {
    Gmt.findAll({ where: { estado: "1" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Gmts.",
      });
    });
};

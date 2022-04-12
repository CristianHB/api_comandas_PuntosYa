const db = require("../models");
const Color = db.color;
const Op = db.Sequelize.Op;

// Create and Save a new Color
exports.create = (req, res) => {
  // Validate request
  if (!req) {
    res.status(400).send({
      message: `Content  not be empty! ${req.body}`,
    });
    return;
  }

  // Create a Color
  const color = {
    valor: req.body.valor,
    local: req.body.local,
  };

  // Save Color in the database
  Color.create(color)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Color.",
      });
    });
};

// Retrieve all Colors from the database.
exports.findAll = (req, res) => {
  const tienda = req.body.tienda;
  var condition = tienda ? { local: tienda } : null;

  Color.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Colors.",
      });
    });
};

// Find a single Color with an id
exports.findOne = (req, res) => {
  const tienda = req.params.tienda;

  Color.findOne({ where: { local: tienda } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Color local =" + tienda,
      });
    });
};

// Update a Color by the id in the request
exports.update = (req, res) => {
  const tienda = req.params.tienda;

  Color.findOne({ where: { local: tienda } }).then((data) => {
    if (data) {
      Color.update(req.body, {
        where: { local: tienda },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Color was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update Color local = ${tienda}. Maybe Color was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Color local = " + tienda,
          });
        });
    } else {
      // Create a Color
      const color = {
        colorPrimario: req.body.colorPrimario,
        colorSecundario: req.body.colorSecundario,
        local: req.params.tienda,
      };

      // Save Color in the database
      Color.create(color)
        .then((data) => {
          res.send({
            message: "Color was updated successfully.",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while updating the Color.",
          });
        });
    }
  });
};

// Delete a Color with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  Color.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Color was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Color with id=${id}. Maybe Color was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Color with id=" + id,
      });
    });
};

// Delete all Colors from the database.
exports.deleteAll = (req, res) => {
  Color.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Colors were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Colors.",
      });
    });
};

// Find all actived Colors
exports.findAllActived = (req, res) => {
  Color.findAll({ where: { estado: "1" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Colors.",
      });
    });
};

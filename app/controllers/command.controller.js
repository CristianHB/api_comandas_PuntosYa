const db = require("../models");
const Command = db.commands;
const Op = db.Sequelize.Op;

// Create and Save a new Command
exports.create = (req, res) => {
  // Validate request
  if (!req) {
    res.status(400).send({
      message: `Content  not be empty! ${req.body}`,
    });
    return;
  }

  // Create a Tutorial
  const command = {
    id: req.body.id,
    id_puntos: req.body.id_puntos,
    cedula: req.body.cedula,
    mesa: req.body.mesa,
    observaciones: req.body.observaciones,
    estado: req.body.estado,
    cod_articulos: req.body.cod_articulos,
    monto: req.body.monto,
    fecha_creacion: req.body.fecha_creacion,
  };

  // Save Tutorial in the database
  Command.create(command)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Command.",
      });
    });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  const codigo = req.query.codigo;
  var condition = codigo ? { codigo: { [Op.like]: `%${codigo}%` } } : null;

  Command.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    });
};

//Retrieves all Orders with status x
exports.findByStatus = (req, res) => {
  const status = req.params.status;
  Command.findAll({ where: { estado: status } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Orders with status=" + status,
      });
    });
};
// Find a single Command with an id
exports.findOne = (req, res) => {
  const codigo = req.params.codigo;

  Command.findOne({ where: { codigo: codigo } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Command with codigo=" + codigo,
      });
    });
};

// Update a Command by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Command.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Command was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Command with id=${id}. Maybe Command was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Command with id=" + id,
      });
    });
};

// Delete a Command with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  Command.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Command was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Command with id=${id}. Maybe Command was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Command with id=" + id,
      });
    });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  Command.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Orders were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Orders.",
      });
    });
};

exports.group = (req, res) => {
  if (!req) {
    res.status(400).send({
      message: `Content  not be empty! ${req.body}`,
    });
    return;
  }
  const command = {
    id: req.body.id,
    codigo: req.body.codigo,
    id_puntos: req.body.id_puntos,
    cedula: req.body.cedula,
    mesa: req.body.mesa,
    observaciones: req.body.observaciones,
    estado: req.body.estado,
    cod_articulos: req.body.cod_articulos,
    monto: req.body.monto,
    fecha_creacion: req.body.fecha_creacion,
  };

  let group = req.body.group;

  Command.create(command)
    .then(async () => {
      let result = await Promise.all(
        group.map((item) => {
          Command.destroy({
            where: { id: item.id },
          });
        })
      );
      if (result) {
        await res.send({
          message: `commands grouped successfully res: ${command}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while grouping the Commands.",
      });
    });
};

// Find all actived Orders
exports.findAllActived = (req, res) => {
  Command.findAll({ where: { estado: "1" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    });
};

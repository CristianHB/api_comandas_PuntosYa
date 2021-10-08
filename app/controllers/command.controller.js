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
    codigo: req.body.codigo,
    id_puntos: req.body.id_puntos,
    local: req.body.local,
    cedula: req.body.cedula,
    tipo: req.body.tipo,
    mesa: req.body.mesa,
    forma_pago: req.body.forma_pago,
    estado_pago: req.body.estado_pago,
    observaciones: req.body.observaciones,
    imagen_recibo: req.body.imagen_recibo,
    cod_articulos: req.body.cod_articulos,
    monto: req.body.monto,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    ciudad: req.body.ciudad,
    estado: req.body.estado,
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

// Retrieve all Commands from the database.
exports.findAll = (req, res) => {
  const codigo = req.query.codigo;
  var condition = codigo ? { codigo: { [Op.like]: `%${codigo}%` } } : null;

  Command.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Commands.",
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

// Delete all Commands from the database.
exports.deleteAll = (req, res) => {
  Command.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Commands were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Commands.",
      });
    });
};

// Find all actived Commands
exports.findAllActived = (req, res) => {
  Command.findAll({ where: { estado: "1" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Commands.",
      });
    });
};

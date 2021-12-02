const db = require("../models");
const Courier = db.couriers;
const Op = db.Sequelize.Op;

// Create and Save a new Courier
exports.create = (req, res) => {
  // Validate request
  if (!req) {
    res.status(400).send({
      message: `Content  not be empty! ${req.body}`,
    });
    return;
  }
  let date = new Date(req.body.fecha_creacion);
  // date.setHours(date.getHours() - 5);

  const courier = {
    id: req.body.id,
    cedula: req.body.cedula,
    local: req.body.local,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    telefono: req.body.telefono,
    estado: req.body.estado,
    id_tienda: req.body.id_tienda,
    fecha_creacion: date,
  };

  Courier.create(courier)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Courier.",
      });
    });
};

// Retrieve all Couriers from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { nombre: { [Op.like]: `%${name}%` } } : null;

  Courier.findAll({ where: condition })
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

// Find a single Courier with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Courier.findOne({ where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Courier with id=" + id,
      });
    });
};

// Update a Courier by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Courier.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Courier was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Courier with id=${id}. Maybe Courier was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Courier with id=" + id,
      });
    });
};

// Delete a Courier with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  Courier.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Courier was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Courier with id=${id}. Maybe Courier was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Courier with id=" + id,
      });
    });
};

// Delete all Couriers from the database.
exports.deleteAll = (req, res) => {
  Courier.destroy({
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
  Courier.findAll({ where: { estado: "1" } })
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

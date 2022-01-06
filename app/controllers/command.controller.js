const db = require("../models");
const Sequelize = require("sequelize");
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

  let date = new Date(req.body.fecha_creacion);
  // date.setHours(date.getHours() - 5);
  let ultimo = 1;
  const command = {
    id: req.body.id,
    local: req.body.local,
    id_puntos: req.body.id_puntos,
    cedula: req.body.cedula,
    mesa: req.body.mesa,
    observaciones: req.body.observaciones,
    estado: req.body.estado,
    cod_articulos: req.body.cod_articulos,
    monto: req.body.monto,
    fecha_creacion: date,
    Id_Pedido_Enc: req.body.Id_Pedido_Enc,
  };

  new Promise((resolve, reject) => {
    lastInserted(req.body.local, resolve, reject);
  })
    .then((p) => {
      if (p[0].max) {
        ultimo += parseInt(p[0].max);
      }
      command.codigo = ultimo;
      // Save Command in the database
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
    })
    .catch((err) => {
      res.status(500).send({
        message: err || "Some error occurred while creating the Command.",
      });
      console.log("error", err);
    });
};

// Retrieve all Commands from the database.
exports.findAll = (req, res) => {
  const tienda = req.body.tienda;
  console.log(tienda);
  var condition = tienda ? { local: tienda } : null;

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

//Retrieves all Commands with status x
exports.findByStatus = (req, res) => {
  const status = req.params.status;
  const tienda = req.body.tienda;
  Command.findAll({ where: { estado: status, local: tienda } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Commands of the store ${tienda} with status = ${status}`,
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

exports.group = (req, res) => {
  if (!req) {
    res.status(400).send({
      message: `Content  not be empty! ${req.body}`,
    });
    return;
  }
  let date = new Date(req.body.fecha_creacion);
  let ultimo = 1;
  const command = {
    id: req.body.id,
    local: req.body.local,
    id_puntos: req.body.id_puntos,
    cedula: req.body.cedula,
    mesa: req.body.mesa,
    observaciones: req.body.observaciones,
    estado: req.body.estado,
    cod_articulos: req.body.cod_articulos,
    monto: req.body.monto,
    fecha_creacion: date,
    Id_Pedido_Enc: req.body.Id_Pedido_Enc,
  };
  let group = req.body.group;
  new Promise((resolve, reject) => {
    lastInserted(req.body.local, resolve, reject);
  })
    .then((p) => {
      if (p[0].max) {
        ultimo += parseInt(p[0].max);
      }
      command.codigo = ultimo;
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
    })
    .catch((err) => {
      res.status(500).send({
        message: err || "Some error occurred while creating the Command.",
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

//find Commands by time
exports.totalCommandsByTime = (req, res) => {
  const tienda = req.body.tienda;
  let date2 = new Date(req.body.date);
  let fromDate = date2.setMonth(date2.getMonth() - 12);
  let date = new Date(req.body.date);
  let firstDayMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDayMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  let firstDayToday = new Date(req.body.date).setHours(00, 00, 00);
  let lastDayToday = new Date(req.body.date).setHours(23, 59, 59);

  var conditionLastYear = date2
    ? { fecha_creacion: { [Op.gt]: fromDate }, local: tienda }
    : null;

  var conditionLastMonth = date
    ? {
        fecha_creacion: {
          [Op.between]: [firstDayMonth, lastDayMonth.setHours(23, 59, 59)],
        },
        local: tienda,
      }
    : null;

  var conditionToday = date
    ? {
        fecha_creacion: { [Op.between]: [firstDayToday, lastDayToday] },
        local: tienda,
      }
    : null;

  var promiseLastYear = Command.count({ where: conditionLastYear })
    .then((data1) => {
      return data1;
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Commands.",
      });
    });

  var promiseLastMonth = Command.count({ where: conditionLastMonth })
    .then((data2) => {
      return data2;
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Commands.",
      });
    });

  var promiseToday = Command.count({ where: conditionToday })
    .then((data3) => {
      return data3;
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Commands.",
      });
    });

  return Promise.all([promiseLastYear, promiseLastMonth, promiseToday])
    .then((values) => {
      res.status(200).send({
        totalLastyear: values[0],
        totalLastMonth: values[1],
        totalToDay: values[2],
      });
    })
    .catch((e) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    });
};

//Find payed Commands by time
exports.totalPayedCommandsByTime = (req, res) => {
  const tienda = req.body.tienda;
  let date2 = new Date(req.body.date);
  let fromDate = date2.setMonth(date2.getMonth() - 12);
  let date = new Date(req.body.date);
  let firstDayMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDayMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  let firstDayToday = new Date(req.body.date).setHours(00, 00, 00);
  let lastDayToday = new Date(req.body.date).setHours(23, 59, 59);

  var conditionLastYear = date2
    ? { fecha_creacion: { [Op.gt]: fromDate }, estado: "3", local: tienda }
    : null;

  var conditionLastMonth = date
    ? {
        fecha_creacion: {
          [Op.between]: [firstDayMonth, lastDayMonth.setHours(23, 59, 59)],
        },
        estado: "3",
        local: tienda,
      }
    : null;

  var conditionToday = date
    ? {
        fecha_creacion: { [Op.between]: [firstDayToday, lastDayToday] },
        estado: "3",
        local: tienda,
      }
    : null;

  var promiseLastYear = Command.count({ where: conditionLastYear })
    .then((data1) => {
      return data1;
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Commands.",
      });
    });

  var promiseLastMonth = Command.count({ where: conditionLastMonth })
    .then((data2) => {
      return data2;
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Commands.",
      });
    });

  var promiseToday = Command.count({ where: conditionToday })
    .then((data3) => {
      return data3;
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Commands.",
      });
    });

  return Promise.all([promiseLastYear, promiseLastMonth, promiseToday])
    .then((values) => {
      res.status(200).send({
        totalPayedLastyear: values[0],
        totalPayedLastMonth: values[1],
        totalPayedToDay: values[2],
      });
    })
    .catch((e) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    });
};

//find last inserted
const lastInserted = (tienda, resolve, reject) => {
  Command.findAll({
    where: { local: tienda },
    attributes: [[Sequelize.fn("max", Sequelize.col("codigo")), "max"]],
    raw: true,
  })
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
};

//agrupar y contar lo agrupado
// exports.totalCommandsMonth = (req, res) => {
//   let date = new Date(req.body.date);
//   let firstDayMonth = new Date(date.getFullYear(), date.getMonth(), 1);
//   let lastDayMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

//   var conditionLastMonth = date
//     ? {
//         fecha_creacion: {
//           [Op.between]: [firstDayMonth, lastDayMonth.setHours(23, 59, 59)],
//         },
//       }
//     : null;

//   Command.findAll({
//     where: conditionLastMonth,
//     attributes: [
//       "estado",
//       [Sequelize.fn("count", Sequelize.col("estado")), "total"],
//     ],
//     group: ["estado"],
//     raw: true,
//   })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//        res.status(500).send({
//          message:
//            err.message || "Some error occurred while retrieving Commands.",
//        });
//     });
// };

exports.totalCommandsMonth = (req, res) => {
  let date = new Date(req.body.date);
  let firstDayMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDayMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  var conditionLastMonth = date
    ? {
        fecha_creacion: {
          [Op.between]: [firstDayMonth, lastDayMonth.setHours(23, 59, 59)],
        },
      }
    : null;

  Command.findAll({
    where: conditionLastMonth,
  })
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

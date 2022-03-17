const db = require("../models");
const Sequelize = require("sequelize");
const Order = db.orders;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = async (req, res) => {
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
  // Create a Order
  const order = {
    id_puntos: req.body.id_puntos,
    local: req.body.local,
    mensajero: req.body.mensajero,
    cedula: req.body.cedula,
    forma_pago: req.body.forma_pago,
    estado_pago: req.body.estado_pago,
    observaciones: req.body.observaciones,
    imagen_recibo: req.body.imagen_recibo,
    Id_Pedido_Enc: req.body.Id_Pedido_Enc,
    cod_articulos: req.body.cod_articulos,
    monto: req.body.monto,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    ciudad: req.body.ciudad,
    estado: req.body.estado,
    fecha_creacion: date,
  };

  new Promise((resolve, reject) => {
    lastInserted(req.body.local, resolve, reject);
  })
    .then((p) => {
      if (p[0].max) {
        ultimo += parseInt(p[0].max);
      }
      order.codigo = ultimo;
      // Save Order in the database
      Order.create(order)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Order.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err || "Some error occurred while creating the Order.",
      });
      console.log("error", err);
    });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  const tienda = req.body.tienda;
  var condition = tienda ? { local: tienda } : null;

  Order.findAll({ where: condition })
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
  const tienda = req.body.tienda;
  const status = req.body.status;
  Order.findAll({ where: { estado_pago: status, local: tienda } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Orders with status=" + status,
      });
    });
};
// Find a single Order with an id
exports.findOne = (req, res) => {
  const codigo = req.params.codigo;

  Order.findOne({ where: { codigo: codigo } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Order with codigo=" + codigo,
      });
    });
};

// Update a Order by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Order with id=" + id,
      });
    });
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  Order.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id,
      });
    });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  Order.destroy({
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

// Find all actived Orders
exports.findAllActived = (req, res) => {
  Order.findAll({ where: { estado: "1" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    });
};

//find orders by time
exports.totalOrdersByTime = (req, res) => {
  const tienda = req.body.tienda;
  const startDateYear = req.body.startDateYear;
  const startDateMonth = req.body.startDateMonth;
  const endDateMonth = req.body.endDateMonth;
  const starDateToday = req.body.startDateToday;
  const endDateToday = req.body.endDateToday;
  let firstDayMonth = new Date(startDateMonth).toUTCString();
  let lastDayMonth = new Date(endDateMonth).toUTCString();
  let firstDateToday = new Date(starDateToday).toUTCString();
  let lastDateToday = new Date(endDateToday).toUTCString();
  let firstDateYear = new Date(startDateYear).toUTCString();

  var conditionLastYear = startDateYear
    ? { fecha_creacion: { [Op.gt]: firstDateYear }, local: tienda }
    : null;

  var conditionLastMonth =
    startDateMonth && endDateMonth
      ? {
          fecha_creacion: {
            [Op.between]: [firstDayMonth, lastDayMonth],
          },
          local: tienda,
        }
      : null;

  var conditionToday =
    starDateToday && endDateToday
      ? {
          fecha_creacion: {
            [Op.between]: [firstDateToday, lastDateToday],
          },
          local: tienda,
        }
      : null;

  var promiseLastYear = Order.count({ where: conditionLastYear })
    .then((data1) => {
      return data1;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    });

  var promiseLastMonth = Order.count({ where: conditionLastMonth })
    .then((data2) => {
      return data2;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    });

  var promiseToday = Order.count({ where: conditionToday })
    .then((data3) => {
      return data3;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    });

  return Promise.all([promiseLastYear, promiseLastMonth, promiseToday])
    .then((values) => {
      res.status(200).send({
        totalLastyear: values[0],
        totalLastMonth: values[1],
        totalLastDay: values[2],
      });
    })
    .catch((e) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    });
};

//find payed orders by time
exports.totalPayedOrdersByTime = (req, res) => {
  const tienda = req.body.tienda;
  const startDateYear = req.body.startDateYear;
  const startDateMonth = req.body.startDateMonth;
  const endDateMonth = req.body.endDateMonth;
  const starDateToday = req.body.startDateToday;
  const endDateToday = req.body.endDateToday;
  let firstDayMonth = new Date(startDateMonth).toUTCString();
  let lastDayMonth = new Date(endDateMonth).toUTCString();
  let firstDateToday = new Date(starDateToday).toUTCString();
  let lastDateToday = new Date(endDateToday).toUTCString();
  let firstDateYear = new Date(startDateYear).toUTCString();

  var conditionLastYear = startDateYear
    ? { fecha_creacion: { [Op.gt]: firstDateYear }, estado: "3", local: tienda }
    : null;

  var conditionLastMonth =
    startDateMonth && endDateMonth
      ? {
          fecha_creacion: {
            [Op.between]: [firstDayMonth, lastDayMonth],
          },
          estado: "3",
          local: tienda,
        }
      : null;

  var conditionToday =
    starDateToday && endDateToday
      ? {
          fecha_creacion: {
            [Op.between]: [firstDateToday, lastDateToday],
          },
          estado: "3",
          local: tienda,
        }
      : null;

  var promiseLastYear = Order.count({ where: conditionLastYear })
    .then((data1) => {
      return data1;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    });

  var promiseLastMonth = Order.count({ where: conditionLastMonth })
    .then((data2) => {
      return data2;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    });

  var promiseToday = Order.count({ where: conditionToday })
    .then((data3) => {
      return data3;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
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
  Order.findAll({
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

//   Order.findAll({
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
//       reject(err);
//     });
// };

exports.totalOrdersMonth = (req, res) => {
  const tienda = req.body.tienda;
  const startDate = req.body.startDateMonth;
  const endDate = req.body.endDateMonth;
  let firstDayMonth = new Date(startDate).toUTCString();
  let lastDayMonth = new Date(endDate).toUTCString();

  var conditionLastMonth =
    startDate && endDate
      ? {
          fecha_creacion: {
            [Op.between]: [firstDayMonth, lastDayMonth],
          },
          local: tienda,
        }
      : null;

  Order.findAll({
    where: conditionLastMonth,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    });
};

exports.totalOrdersByPaymentMethod = (req, res) => {
  const tienda = req.body.tienda;
  const startDate = req.body.startDateMonth;
  const endDate = req.body.endDateMonth;
  let firstDayMonth = new Date(startDate).toUTCString();
  let lastDayMonth = new Date(endDate).toUTCString();

  var conditionLastMonth =
    startDate && endDate
      ? {
          fecha_creacion: {
            [Op.between]: [firstDayMonth, lastDayMonth],
          },
          local: tienda,
        }
      : null;

  Order.findAll({
    where: conditionLastMonth,
    attributes: [
      "forma_pago",
      [Sequelize.fn("count", Sequelize.col("forma_pago")), "total"],
    ],
    group: ["forma_pago"],
    raw: true,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    });
};

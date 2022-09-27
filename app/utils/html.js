function getHtml(order, resolver, reject) {
  let plantilla = "";
  new Promise((resolve, reject) => {
    let x = JSON.parse(order.cod_articulos).reduce(
      (previousValue, currentValue) =>
        previousValue +
        `<tr>
      <td>
          <div>${currentValue.Nombre_del_Producto}</div>
          <div>${currentValue.quantity} Unidades X ${
          currentValue.Precio_d_venta
        }</div>
      </td>
      <td>$ ${currentValue.quantity * currentValue.Precio_d_venta}</td>
      </tr>`,
      ""
    );
    resolve(x);
  }).then((products) => {
    plantilla = `
      <!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Document</title>
              <style>
                  .title{
                      color: ${order.colorPrimario}
                  }
              </style>
          </head>
          <body>
              <div>
                  <h1 style="margin-bottom: 0;" class="title">Empresa</h1>
                  <div>${order.nombreEmpresa}</div>
                  <div>${order.direccionEmpresa}</div>
                  <div>${order.telefonoEmpresa}</div>
              
                  <h1 style="margin-bottom: 0;" class="title">Usuario</h1>
                  <div>${order.nombreUser}</div>
                  <div>${order.direccionUser ? order.direccionUser : ""}</div>
                  <div>${order.correoUser}</div>
                  <div>
                      <h1 style="margin-bottom: 0;" class="title">Datos del pedido</h1>
                      <div><b>Medio de pago:</b> ${order.observaciones}</div>
                      <div><b>Observaciones:</b> ${order.observaciones}</div>
                      <br />
                      <div><b>Dirección, Barrio:</b> ${order.direccion}</div>
                      <div><b>Ciudad:</b> ${order.ciudad}</div>
                      <div><b>Teléfono/Celular:</b> ${order.telefono}</div>
                      <div><b>Con cuanto pago (efectivo):</b> ${
                        order.devuelta_de
                      }</div>
                      <br />
                      <div>
                          <div>
                              <table style="width: 60%">
                              <tbody>
                                  ${products}
                                  <tr>
                                  <td><h2 class="title">total</h2></td>
                                  <td><b>$ ${order.monto}</b></td>
                                  </tr>
                              </tbody>
                              </table>
                          </div>
                      </div>
                  </div> 
              </div>
          </body>
      </html>
      `;
    resolver(plantilla);
  });
}

module.exports = { getHtml };

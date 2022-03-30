function getHtml(order, resolver, reject) {
  let y = "";
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
  }).then((p) => {
    y = `
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
                  <h1 class="title">Empresa</h1>
                  <div>${order.nombreEmpresa}</div>
                  <div>${order.direccionEmpresa}</div>
                  <div>${order.telefonoEmpresa}</div>
              
                  <h1 class="title">Usuario</h1>
                  <div>${order.nombreUsuario}</div>
                  <div>${order.direccionUsuario}</div>
                  <div>${order.correoUsuario}</div>
                  <div>
                      <h1 class="title">Datos del pedido</h1>
                      <div>Medio de pago:</div>
                      <div>Observaciones:</div>
                      <br />
                      <div>Dirección, Barrio: ${order.direccion}</div>
                      <div>Ciudad: ${order.ciudad}</div>
                      <div>Teléfono/Celular: ${order.telefono}</div>
                      <div>Con cuanto pago (efectivo): ${order.devuelta_de}</div>
                      <br />
                      <div>
                          <div>
                              <table style="width: 60%">
                              <tbody>
                                  ${p}
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
    resolver(y);
  });
}

module.exports = { getHtml };

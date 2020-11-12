// let maquina = {
//   cargarCafe: function (fn) {
//     this.datosCafe = fn
//   },
//   cargarAgua: function (fn) {
//     this.datosAgua=fn
//   },
// };

// let load = function () {
//   console.log(this);
//     while (datos.cantidad == null) {
//       let amount = Number(
//         prompt(
//           `Put the ${datos.name} in the machine ( ${datos.min} ${datos.unidad} min - ${datos.max} ${datos.unidad} max)`
//         )
//       );

//       if (amount >= datos.min && amount <= datos.max) {
//         datos.cantidad = amount;
//         this.parrafo.innerText = `${datos.name} loaded correctly!`;
//         return datos;
//       }
//     }
// };


// datosCafe.cargar(load(datosCafe));
// datosCafe.cargar(load(datosAgua));

// datosCafe.cargar(load)

// let cargar = () => {
//   while (this.cafe == null) {
//     let cantidad = Number(
//       prompt("Introduzca el cafe al molino ( 7 g min - 14 g max)")
//     );
//     if (cantidad >= 7 && cantidad <= 14) {
//       this.cafe = cantidad;
//       console.log("Cafe introducido correctamente" + this);
//     }
//   }
// };

// maquina.cargarCafe(cargar);
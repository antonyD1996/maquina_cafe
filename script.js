let parrafoCafe = document.querySelector("#parrafoCafe");
let parrafoAgua = document.querySelector("#parrafoAgua");
let parrafoTiempo = document.querySelector("#parrafoTiempo");

let datosCafe = {
  name: "Coffee",
  min: 7,
  max: 14,
  cantidad: null,
  unidad: "g",
  cargar: function () {
    if (this.cantidad == undefined) {
      while (this.cantidad == null) {
        let amount = Number(
          prompt(
            `Put the ${this.name} in the machine ( ${this.min} ${this.unidad} min - ${this.max} ${this.unidad} max)`
          )
        );

        if (amount >= this.min && amount <= this.max) {
          this.cantidad = amount;
          return `${this.name} loaded correctly!`;
        }
      }
    } else {
      return `${this.name} was already loaded!`;
    }
  },
};

let datosAgua = {
  name: "Water",
  min: 1,
  max: 2,
  cantidad: null,
  unidad: "cup",
};

let botonCargarCafe = document.querySelector("#btnCargarCafe");
let botonCargarAgua = document.querySelector("#btnCargarAgua");
let botonEncender = document.querySelector("#btnEncender");

botonCargarCafe.addEventListener("click", function () {
  parrafoCafe.innerText = datosCafe.cargar();
//   setTimeout(limpiarParrafo, 3000);
});

botonCargarAgua.addEventListener("click", function () {
  parrafoAgua.innerText = datosCafe.cargar.call(datosAgua);
//   setTimeout(limpiarParrafo, 3000);
});

function limpiarParrafo() {
  parrafoCafe.innerText = "";
  parrafoAgua.innerText = "";
}

function temporizador() {
  let t = 5;
  let idTemp = setInterval(aumentar, 1000);
  botonEncender.disabled = true;
  function aumentar() {
    if (t == 0) {
      clearInterval(idTemp);
      parrafoTiempo.innerText = "The Machine is ready to use ";
      botonEncender.disabled = false;
    } else {
      parrafoTiempo.innerText =
        "The Machine will be complety ready in " + t-- + " seconds";
    }
  }
}

let maquina = {
  estado: false,
  accion: function () {
    this.estado = this.estado ? false : true;
  },
  molino: {
    encendido: false,
    accion: function () {
      return this.encendido ? false : true;
    },
  },
};

init();

botonEncender.addEventListener("click", function () {
  maquina.accion();
  if (maquina.estado) {
    temporizador();
  } else {
    parrafoTiempo.innerText = "The Machine is turned off ";
  }
  botonEncender.innerText = cambiarTextoBoton();
});

function init() {
  if (!maquina.estado) {
    parrafoTiempo.innerText = "The Machine is turned off ";
  }
  botonEncender.innerText = cambiarTextoBoton();
}

function cambiarTextoBoton() {
  return maquina.estado ? "Apagar" : "Encender";
}

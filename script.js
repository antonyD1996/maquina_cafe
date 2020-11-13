
let parrafoCafe = document.querySelector("#parrafoCafe");
let parrafoAgua = document.querySelector("#parrafoAgua");
let parrafoTiempo = document.querySelector("#parrafoTiempo");
let parrafoEstadoAgua = document.querySelector("#parrafoEstadoAgua");

let botonCargarCafe = document.querySelector("#btnCargarCafe");
let botonCargarAgua = document.querySelector("#btnCargarAgua");
let botonEncender = document.querySelector("#btnEncender");
let botonMolerCafe = document.querySelector("#btnMolerCafe");
let botonPlaceFilter = document.querySelector("#btnPlaceFilter");
let botonFlattenCoffee = document.querySelector("#btnFlattenCoffee");
let botonInsertFilter = document.querySelector("#btnInsertFilter");
let botonPrepare = document.querySelector("#btnPrepare");
let botonAddWater = document.querySelector("#btnAddWater");
let botonDrink = document.querySelector("#btnDrink");

let radioGroup = document.getElementsByName("radioGroup");

let molino = {
  name: "Coffee",
  min: 14,
  max: 20,
  cantidad: null,
  unidad: "g",
  tipoMolida: 2,
  molido:false,
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
  moler: function () {
    if (this.tipoMolida == 1) {
      temporizador(1);
    } else if (this.tipoMolida == 2) {
      temporizador(2);
    } else if (this.tipoMolida == 3) {
      temporizador(3);
    }

    function temporizador(tiempo) {
      let idTemp = setInterval(aumentar, 1000);
      botonMolerCafe.disabled = true;

      function aumentar() {
        if (tiempo == 0) {
          clearInterval(idTemp);
          parrafoCafe.innerText = "Grinding process finished ";
          verificarEstados()
        } else {
          parrafoCafe.innerText =
            "Grinding (Finishing in " + tiempo-- + " seconds)";
        }
        
      }
    }
  },
};

let tanque = {
  name: "Water",
  min: 2,
  max: 4,
  cantidad: null,
  unidad: "cup",
};

let maquina = {
  estado: false,
  accion: function () {
    this.estado = this.estado ? false : true;
    if (!this.estado) {
      parrafoCafe.innerText = "";
    }
  },
  molino: molino,
  tanque: tanque,
  filterPlaced: false,
  coffeeFlatten: false,
  filterInserted: false,
  espressoPrepared: false,
  watterAdded: false,
  drunk: false,
  placeFilter:function(){
    this.filterPlaced =true
  },
  flattenCoffee:function(){
    this.coffeeFlatten =true
  },
  insertFilter:function(){
    this.filterInserted =true
  },
  prepareEspresso:function(){
    this.espressoPrepared =true
  },
  addWater:function(){
    this.watterAdded =true
  },
  drink:function(){
    this.drunk =true
  },
};

let tipoMolida = () => {
  radioGroup.forEach((item) => {
    if (item.checked) {
      maquina.molino.tipoMolida = item.value;
    }
  });
};

botonCargarCafe.addEventListener("click", function () {
  parrafoCafe.innerText = molino.cargar();
  verificarEstados()
  //   setTimeout(limpiarParrafo, 3000);
});

botonCargarAgua.addEventListener("click", function () {
  parrafoAgua.innerText = molino.cargar.call(tanque);
  //   setTimeout(limpiarParrafo, 3000);
});

botonEncender.addEventListener("click", function () {
  maquina.accion();
  if (maquina.estado) {
    temporizador();
  } else {
    parrafoTiempo.innerText = "The Machine is turned off ";
    parrafoAgua.innerText = "";
  }
  botonEncender.innerText = cambiarTextoBoton();
});


botonMolerCafe.addEventListener("click", function () {
  maquina.molino.molido = true
  tipoMolida();
  maquina.molino.moler();
});

botonPlaceFilter.addEventListener("click", function(){
  maquina.placeFilter()
  verificarEstados()
})

botonFlattenCoffee.addEventListener("click", function(){
  maquina.flattenCoffee()
  verificarEstados()
})
botonInsertFilter.addEventListener("click", function(){
  maquina.insertFilter()
  verificarEstados()
})

botonPrepare.addEventListener("click", function(){
  maquina.prepareEspresso()
  verificarEstados()
})

botonAddWater.addEventListener("click", function(){
  maquina.addWater()
  verificarEstados()
})

botonDrink.addEventListener("click", function(){
  maquina.drink()
  verificarEstados()
})

function limpiarParrafo() {
  parrafoCafe.innerText = "";
  parrafoAgua.innerText = "";
}

function temporizador() {
  let t = 2;
  let idTemp = setInterval(aumentar, 1000);
  botonEncender.disabled = true;
  function aumentar() {
    if (t == 0) {
      clearInterval(idTemp);
      parrafoTiempo.innerText = "The Machine is ready to use ";
      botonEncender.disabled = false;
      parrafoAgua.innerText = "Ready!";
      verificarEstados();
    } else {
      parrafoTiempo.innerText =
        "The Machine will be cmplety ready in " + t-- + " seconds";
      parrafoAgua.innerText = "Warming up...";
    }
  }
}

init();

function init() {
  if (!maquina.estado) {
    parrafoTiempo.innerText = "The Machine is turned off ";
  }
  botonEncender.innerText = cambiarTextoBoton();
  verificarEstados();
}

function cambiarTextoBoton() {
  return maquina.estado ? "Turn Off" : "Turn On";
}

function verificarEstados() {
  botonMolerCafe.disabled = true;
  botonPlaceFilter.disabled = true;
  botonFlattenCoffee.disabled = true;
  botonInsertFilter.disabled = true;
  botonPrepare.disabled = true;
  botonAddWater.disabled = true;
  botonDrink.disabled = true;

  if(maquina.molino.cantidad != null && maquina.estado){
    botonMolerCafe.disabled = false
  }

  if(maquina.molino.molido){
    botonPlaceFilter.disabled = false
    botonMolerCafe.disabled = true;
  }
  if(maquina.filterPlaced){
    botonFlattenCoffee.disabled = false
  }

  if(maquina.coffeeFlatten){
    botonInsertFilter.disabled = false
  }

  if(maquina.filterInserted){
    botonPrepare.disabled = false
  }

  if(maquina.espressoPrepared){
    botonAddWater.disabled = false
  }

  if(maquina.watterAdded){
    botonDrink.disabled = false
  }

  console.log(maquina)

}

//Inicialiar las variables de todos los parrafos donde se muestra el texto
let parrafoCafe = document.querySelector("#parrafoCafe");
let parrafoAgua = document.querySelector("#parrafoAgua");
let parrafoTiempo = document.querySelector("#parrafoTiempo");
let parrafoEstadoAgua = document.querySelector("#parrafoEstadoAgua");

//Inicializar las variables de todos lo botones
let botonCargarCafe = document.querySelector("#btnCargarCafe");
let botonCargarAgua = document.querySelector("#btnCargarAgua");
let botonEncender = document.querySelector("#btnEncender");
let botonMolerCafe = document.querySelector("#btnMolerCafe");
let botonPlaceFilter = document.querySelector("#btnPlaceFilter");
let botonFlattenCoffee = document.querySelector("#btnFlattenCoffee");
let botonInsertFilter = document.querySelector("#btnInsertFilter");
let botonBrew = document.querySelector("#btnBrew");
let botonAddWater = document.querySelector("#btnAddWater");
let botonDrink = document.querySelector("#btnDrink");
let botonManual = document.querySelector("#btnManual");

//Inicializar la variable que almacena los radio button con los tipos de molidas
let radioGroup = document.getElementsByName("radioGroup");

//Objeto molino que contiene los metodos cargar y moler, asi como propiedades que se utlizan para poder llevar a cabo esos metodos
let molino = {
  name: "Coffee",
  min: 14,
  max: 20,
  cantidad: null,
  unidad: "g",
  tipoMolida: 2,
  molido: false,
  cargar: function () {
    if (this.cantidad == undefined) {
      //verificar que la cantidad aun no haya sido ingresada y asi ejecutar el bucle while
      while (this.cantidad == null) {
        //ejecuta las intrucciones para ingresar el cafe hasta que el usuario ingrese una cantidad entre el minimo y el maxiimo
        let amount = Number(
          //muestra al usuario un prompt para que ingrese el valor
          prompt(
            //se parametrizo todo para utilizar el mismo metodo para cargar el agua
            `Put the ${this.name} in the machine ( ${this.min} ${this.unidad} min - ${this.max} ${this.unidad} max)`
          )
        );

        if (amount >= this.min && amount <= this.max) {
          //verifica que la cantidad ingresada sea valida, si es asi la condicion para ejecutar el bucle cambia
          this.cantidad = amount;
          return `${this.name} loaded correctly!`;
        }
      }
    } else {
      //se ejecuta cuando la cantidad ya fue ingresada y se quiere volver a cargar el cafe
      return `${this.name} was already loaded!`;
    }
  },
  moler: function () {
    //evalua los valores del tipo de molida que le usuario selecciono
    //los tiempos asiganado para cada molida se le pasan a la funcion temporizador (de este conexto) como parametro
    if (this.tipoMolida == 1) {
      //cuando el tipo de molida es "Coarse"(grueso en español) el tiempo de molida toma 1 segundo
      temporizador(1);
    } else if (this.tipoMolida == 2) {
      //cuando el tipo de molida es "Medium"(medio en español) el tiempo de molida toma 2 segundo
      temporizador(2);
    } else if (this.tipoMolida == 3) {
      //cuando el tipo de molida es "Fine"(fino en español) el tiempo de molida toma 3 segundo
      temporizador(3);
    }

    //NOTA: los tiempos asignado para las molidas ya estan predefinidos y solamente pueden ser cambiados desde el codigo

    function temporizador(tiempo) {
      //esta funcion muestra un contador en pantalla para que el ususario vea el tiempo que resta
      //para que el proceso de molida termine
      //el Intervalor ejecuta la funcion cada 1 segundos
      let idTemp = setInterval(disminuir, 1000); //guardo el objeto "SetInterval" para poder detenerlo usando su id cuando cumpla una condicion
      botonMolerCafe.disabled = true; //desactivo el boton cafe ya que la maquina se encuentra moliendo actualmente

      function disminuir() {
        //disminuye el valor del contador en 1 unidad cada vez que se ejecuta
        if (tiempo == 0) {
          //cuando el tiempo llego a 0 se termina el intervalo y se muestra el mensaje
          clearInterval(idTemp);
          parrafoCafe.innerText = "Grinding process finished ";
          verificarEstados(); //este metodo verifica los estados de la maquina cada vez que se llama
        } else {
          //si el tiempo todavia no ha llegado a cero, se va actualizando el texto del parrafo
          parrafoCafe.innerText =
            "Grinding (Finishing in " + tiempo-- + " seconds)";
        }
      }
    }
  },
};

let tanque = {
  //este objeto taque tiene propiedads similares a las del molino, se planteo asi para poder utilizar el metodo moler(del molino)
  //llamando la funcion "call" que nos permite enviar el contexto del objeto tanque
  name: "Water",
  min: 2,
  max: 4,
  cantidad: null,
  unidad: "cup",
};

let maquina = {
  //este objeto tiene propiedades que nos ayudan a comprobar estados de la maquina y evaluar ciertos evento para habilitar y deshabilidar funciones(o botones)
  estado: false,
  accion: function () {
    //compureba si la maquina esta encendida o apagada, dependiendo del estado, el operador ternadio asigna el valor
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
  brewed: false,
  watterAdded: false,
  drunk: false,
  placeFilter: function () {
    //se ubica el filtro para recibir el cafe molido
    this.filterPlaced = true;
  },
  flattenCoffee: function () {
    //se aplasta el cafe del filtro para luego colar
    this.coffeeFlatten = true;
  },
  insertFilter: function () {
    //se inserta el filtro donde se escurrira el agua
    this.filterInserted = true;
  },
  brewCoffe: function () {
    // se le agrega agua al filtro para escurrir el cafe
    this.brewed = true;
  },
  addWater: function () {
    //se le agrega el agua caliente al gusto a la taza
    this.watterAdded = true;
  },
  drink: function () {
    //se bebe el cafe xd
  },
};

let tipoMolida = () => {
  //se evalua el valor seleccionado de los radio button de typod de molida
  radioGroup.forEach((item) => {
    //se recorren todos los elementos del grupo para
    if (item.checked) {
      //si elemento tiene la propiedad "checked" se asigna el valor al tipo me molida del objeto molino que pertenece a la maquina
      maquina.molino.tipoMolida = item.value;
    }
  });
};

botonCargarCafe.addEventListener("click", function () {
  //cargar el cafe y se muestra el resultado en el parrado
  parrafoCafe.innerText = molino.cargar();
  verificarEstados(); //se verifican los estados
});

botonCargarAgua.addEventListener("click", function () {
  //cargar el agua y se muestra el resultado en el parrado
  parrafoAgua.innerText = molino.cargar.call(tanque);
  verificarEstados();
});

botonEncender.addEventListener("click", function () {
  maquina.accion(); //se ejecuta la accion de encender o apagar del objeto maquina
  if (maquina.estado) {
    temporizador(); //se invoca el temporizador que muestra el proceso de encendido
  } else {
    //se cambian los valores de los parrafos para mostrar el estado actual de la maquina
    parrafoTiempo.innerText = "The Machine is turned off ";
    parrafoAgua.innerText = "";
  }
  botonEncender.innerText = cambiarTextoBoton();
});

botonMolerCafe.addEventListener("click", function () {
  tipoMolida(); //se verifica el tipo de molida seleccionado
  maquina.molino.moler(); //se invoca el metodo moler del molino
  maquina.molino.molido = true; //se cambia la propiedad del molino a molido
});

botonPlaceFilter.addEventListener("click", function () {
  maquina.placeFilter(); //se ubica el filtro para recibir el cafe
  verificarEstados();
});

botonFlattenCoffee.addEventListener("click", function () {
  maquina.flattenCoffee(); //se aplasta el cafe
  verificarEstados();
});
botonInsertFilter.addEventListener("click", function () {
  maquina.insertFilter(); //se inserta el filtro para escurrir
  verificarEstados();
});

botonBrew.addEventListener("click", function () {
  maquina.brewCoffe(); //se agregar el agua al filtro para escurrir
  verificarEstados();
});

botonAddWater.addEventListener("click", function () {
  maquina.addWater(); //se le agrega agua al gusto al cafe
  verificarEstados();
});

botonDrink.addEventListener("click", function () {
  maquina.drink(); //se bebe el cafe
  verificarEstados();
});

botonManual.addEventListener("click", function () {
  window.open(
    "https://drive.google.com/file/d/151Zdp2Nu4HUumrfL5x0TEszBdCrVNnaR/view?usp=sharing",
    "_blank"
  );
});

function temporizador() {
  //este proceso se utiliza para encender la maquina
  let t = 5; //el tiempo de encendido es de 5 segundos
  let idTemp = setInterval(disminuir, 1000); //se ejecuta esta funcion cada 1 seungos
  botonEncender.disabled = true; //se desabilita el boton de encender temporalmente
  function disminuir() {
    if (t == 0) {
      //cuando el tiempo es 0, se mata el intervalo y se cambian algunos estados de los parrafos
      clearInterval(idTemp);
      parrafoTiempo.innerText = "The Machine is ready to use ";
      botonEncender.disabled = false;
      if (maquina.tanque.cantidad == null) {
        parrafoAgua.innerText = "Empty!";
      } else {
        parrafoAgua.innerText = "Ready!";
      }

      verificarEstados();
    } else {
      //si el timpo no es 0, se disminuye un 1 unidad al contador
      parrafoTiempo.innerText =
        "The Machine will be cmplety ready in " + t-- + " seconds";
      parrafoAgua.innerText = "Warming up...";
    }
  }
}

init(); //iniciarlizar todos los componentes

function init() {
  if (!maquina.estado) {
    //verifica si la maquina esta encendida para cambiar el valor del parrafo
    parrafoTiempo.innerText = "The Machine is turned off ";
  }
  botonEncender.innerText = cambiarTextoBoton(); //se utiliza el metodo para signar el texto en el boton de encendido o apagado
  verificarEstados();
}

function cambiarTextoBoton() {
  return maquina.estado ? "Turn Off" : "Turn On"; //sevuelve un valor de acuerdo al estado de la maquina
}

function verificarEstados() {
  //para comenzar se desabilitan todos los botones para luego evaluar los estados de la maquina y asi ir activando o desactivando los mismos
  botonMolerCafe.disabled = true;
  botonPlaceFilter.disabled = true;
  botonFlattenCoffee.disabled = true;
  botonInsertFilter.disabled = true;
  botonBrew.disabled = true;
  botonAddWater.disabled = true;
  botonDrink.disabled = true;

  if (
    maquina.molino.cantidad != null &&
    maquina.estado &&
    maquina.filterPlaced
  ) {
    //solo se puede moler si hay granos en el molino, la maquina esta encendida y si ya fue insertado el filtro
    botonMolerCafe.disabled = false;
  }

  if (maquina.molino.molido) {
    //si molino ya molio el boton de moler se desactiva
    botonMolerCafe.disabled = true;
  }

  if (maquina.molino.cantidad != null) {
    //si la cantidad de cafe no es nula, se puede ubicar el filtro que reciba el cafe
    botonPlaceFilter.disabled = false;
  }
  if (maquina.filterPlaced && maquina.molino.molido) {
    //si el filtro ya fue ubicado y la maquina ya molio, se puede aplanar el cafe
    botonFlattenCoffee.disabled = false;
  }

  if (maquina.coffeeFlatten) {
    //si el cafe ya se aplano se puede insertar el filtro para preparar
    botonInsertFilter.disabled = false;
  }

  if (maquina.filterInserted && maquina.tanque.cantidad != null) {
    //si el filtro ya se inserto y hay agua en el tanque se puede preparar el cafe
    botonBrew.disabled = false;
  }

  if (maquina.brewed) {
    //si el cafe ya esta preparado se puede tomar
    botonAddWater.disabled = false;
  }

  if (maquina.watterAdded) {
    //aca simula el proceso de tomar el cafe
    botonDrink.disabled = false;
  }
}

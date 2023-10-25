
/* --------------------------------------------------------------------------------------------------------------------------------------- */

const formCotizador = document.querySelector("#cotizador-form");
const infoActual = document.querySelector("#details-info");

const marca = document.querySelector("#idMarca");
const modelo = document.querySelector("#idModelo");
const anio = document.querySelector("#idAnio");

const provincia = document.querySelector("#idProvincia");
const localidad = document.querySelector("#idLocalidad");
const nombre = document.querySelector("#idNombre");
const apellido = document.querySelector("#idApellido");

const email = document.querySelector("#idEmail");
const telefono = document.querySelector("#idTelefono");
const edad = document.querySelector("#idEdad");
const genero = document.querySelector("#idGenero");

const seguro = document.querySelector("#idSeguro");
const precio = document.querySelector("#idPrecio");
const descuento = 0.25;

/* --------------------------------------------------------------------------------------------------------------------------------------- */

const Marcas = [

    {
        nombre: "Fiat",
        modelos: ["147", "500", "500L", "500X", "ARGO", "BARCHETTA", "BRAVA", "BRAVO", "CUOPE", "CRONOS", "DOBLO"
            , "DUCATO", "DUNA", "FIORINO", "IDEA", "MOBI", "PALIO", "PULSE", "QUBO", "REGATTA", "SIENA"]
    }, {
        nombre: "Peugeot",
        modelos: ["106", "2008", "205", "206", "207", "208", "3008", "301", "306", "307", "308", "4008", "405", "406"]
    }, {
        nombre: "VolksWagen",
        modelos: ["AMAROK", "BORA", "CADDY", "ESCARABAJO", "FOX", "GOL", "GOLF", "PARATI", "POLO", "SCIROCCO", "SENDA"
            , "T-CROSS", "THE BEETLE", "TIGUAN", "UP!", "VENTO", "VOYAGE"]
    }, {
        nombre: "Audi",
        modelos: ["100", "80", "A1", "A3", "A4", "A5", "A6", "A7", "A8", "ALLROAD", "E-TRON", "Q2", "Q3", "Q5", "Q7", "R8", "RS",
            "TT"]
    }, {
        nombre: "Kia",
        modelos: ["AVELLA", "BESTA", "CAPITAL", "CERES", "OPIRUS", "PICARO", "PRIDE", "RIO", "SELTOS", "SEPHIA", "SHUMA", "SORENTO", "SOUL", "SPORTAGE"]
    }, {
        nombre: "Chevrolet",
        modelos: ["AGILE", "ASTRA", "AVALANCHE", "BERETTA", "BLAZER", "CAMARO", "CAPTIVA", "CELTA", "CHEVETTE", "CLASSIC", "COBALT", "CORSA", "CORVETTE", "CRUZE", "ONIX"]
    }

]

/* --------------------------------------------------------------------------------------------------------------------------------------- */

let clientes = [];

/* --------------------------------------------------------------------------------------------------------------------------------------- */

function getModelos() {

    const valor = marca.selectedIndex;

    if (modelo.length > 1) {

        for (let i = 0; i < modelo.length; i++) {

            $(modelo).empty();
        }

        $(modelo).append('<option value="" disabled selected hidden>Selecciona el Modelo</option>');
    }

    for (let i = 0; i < Marcas.length; i++) {

        if (marca[valor].value == Marcas[i].nombre) {

            for (let j = 0; j < Marcas[i].modelos.length; j++) {

                let opcionesModelos = document.createElement('option');

                opcionesModelos.innerText = Marcas[i].modelos[j];

                modelo.appendChild(opcionesModelos);

            }
        }

    }

}
getModelos();

/* --------------------------------------------------------------------------------------------------------------------------------------- */

const agregarProvincias = () => {

    fetch('https://apis.datos.gob.ar/georef/api/provincias')
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < data.provincias.length; i++) {

                let opcionesProvincias = document.createElement('option');

                opcionesProvincias.innerText = data.provincias[i].nombre;

                provincia.appendChild(opcionesProvincias);
            }
        })
}

agregarProvincias();

/* --------------------------------------------------------------------------------------------------------------------------------------- */

const dataBank = document.querySelector("#idDolarBlue")

const infoDolar = () => {

    fetch('https://dolarapi.com/v1/dolares/blue')
        .then((response) => response.json())
        .then((data) => {

            const content = document.createElement("div");
            content.innerHTML = `
            <h2><b>💸¡Recorda que los precios cotizan en base al Dolar Blue!💸</b></h2>
            <h4> Compra: $${data.compra} Venta: $${data.venta}</h4>
            `

            dataBank.append(content);

        })

}
infoDolar();

/* --------------------------------------------------------------------------------------------------------------------------------------- */

const validarInfoActual = () => {

    if (infoActual.childElementCount < 1) {

        infoActual.innerHTML = `<h4>Sin Informacion</h4>`
    }
}
validarInfoActual();

/* --------------------------------------------------------------------------------------------------------------------------------------- */

formCotizador.addEventListener("change", function (e) {

    infoActual.innerHTML = `

        <h7>🡺Marca del Vehiculo: <p><b>${marca.value}</b></p></h7>

        <h7>🡺Modelo del Vehiculo: <p><b>${modelo.value}</b></p></h7>

        <h7>🡺Año del Vehiculo: <p><b>${anio.value}</b></p></h7>

        <h7>🡺Provincia: <p><b>${provincia.value}</b></p></h7>

        <h7>🡺Localidad: <p><b>${localidad.value}</b></p></h7>
        
        <h7>🡺Nombre: <p><b>${nombre.value}</b></p></h7>

        <h7>🡺Apellido: <p><b>${apellido.value}</b></p></h7>
    
        <h7>🡺Email: <p><b>${email.value}</b></p></h7>

        <h7>🡺Telefono Celular: <p><b>${telefono.value}</b></p></h7>
        
        <h7>🡺Edad: <p><b>${edad.value}</b></p></h7>

        <h7>🡺Genero: <p><b>${genero.value}</b></p></h7>

        <h7>🡺Cuando aseguras: <p><b>${seguro.value}</b></p></h7>

        `

})

/* --------------------------------------------------------------------------------------------------------------------------------------- */

document.getElementById("cotizador-form").addEventListener("submit", function (e) {

    e.preventDefault();

    if (isNaN(precio)) {
        showModal("Por favor, introduce un precio valido!!");
    }
    if (marca.value == "Fiat" || marca.value == "Peugeot" || marca.value == "VolskWagen") {

        precioFinalBronce = 36000 - (36000 * descuento);
        precioFinalPlata = 59999 - (59999 * descuento);
        precioFinalOro = 72500 - (72500 * descuento);

    } else if (marca.value == "Audi" || marca.value == "Kia" || marca.value == "Chevrolet") {

        precioFinalBronce = 80000 - (80000 * descuento);
        precioFinalPlata = 99000 - (99000 * descuento);
        precioFinalOro = 110000 - (110000 * descuento);
    }

    setTimeout(() => {
        const cotizacionInfo = document.getElementById("cotizacionInfo");

        cotizacionInfo.innerHTML = `
                <p>Cotizando...</p>
                <div class="spinner-border text-dark" role="status">
                     <span class="visually-hidden">Loading...</span>
                </div>
            `;

        showModal();

    }, 500);

    //Simular una espera asincronica de 2 segundos

    setTimeout(() => {
        const cotizacionInfo = document.getElementById("cotizacionInfo");

        cotizacionInfo.innerHTML = `
            <h1>🔥 ¡Descuento especial online!</h1>
            <p>⏱ ¡Apurate! Descuentos válidos por las próximas 4 horas.</p>
            <p>💳 Exclusivo con tarjeta de crédito (no prepaga).</p>
            <p>👇 Haciendo click en el boton podrás ver detalles de la cobertura y avanzar en el proceso para obtener tu póliza.</p>

            <p> <b>-- DATOS DEL VEHICULO --</b></p>
            <p> <b>Marca:</b> ${marca.value}      <b>Modelo:</b> ${modelo.value}        <b>Anio:</b> ${anio.value}</p>

            <p> <b>-- TUS DATOS --</b></p>
            <p> <b>Provincia:</b> ${provincia.value}      <b>Localidad:</b> ${localidad.value}      <b>Nombre Cliente:</b> ${nombre.value}        <b>Apellido Cliente:</b> ${apellido.value}</p>

            <p> <b>Email:</b> ${email.value}      <b>Telefono:</b> ${telefono.value}        <b>Edad:</b> ${edad.value}        <b>Genero:</b> ${genero.value}</p>

            <p> <b>Cuando aseguro:</b> ${seguro.value}        <b>Descuento:</b> ${descuento}%  </p>

            <h1> ¡Elegi tu Plan! </h1>
        <section class="planes">
            <div class="card" style="width: 18rem;">
                <img src="../image/bronce.jpg" class="card-img-top" alt="foto-medalla">
                <div class="card-body">
                  <h5 class="card-title">Responsabilidad Civil</h5>
                  <p class="card-text">Cubre los gastos médicos y daños materiales que puedas causar a otras personas o propiedades en un accidente en el que seas el culpable. Tener un seguro de responsabilidad civil te protege de enfrentar gastos por accidentes imprevistos.</p>
                  <b>Precio Final:</b> $${precioFinalBronce}</p>
                  <button class="closeAlert1" onclick="mostrarAlerta()">Contratar</button>
                </div>
              </div>
              <div class="card" style="width: 18rem;">
                <img src="../image/plata.jpg" class="card-img-top" alt="foto-medalla">
                <div class="card-body">
                  <h5 class="card-title">Terceros Completos</h5>
                  <p class="card-text">Además de estar protegido contra los costos que puedas causar a otros conductores o propiedades, también cuentas con la tranquilidad de que tu vehículo estará cubierto en caso de daños por accidentes o incluso robo.</p>
                  <b>Precio Final:</b> $${precioFinalPlata}</p>
                    <button class="closeAlert2" onclick="mostrarAlerta()">Contratar</button>
                  </div>
              </div>
              <div class="card" style="width: 18rem;">
                <img src="../image/oro.jpg" class="card-img-top" alt="foto-medalla">
                <div class="card-body">
                  <h5 class="card-title">Todo Riesgo</h5>
                  <p class="card-text">Puedes estar seguro y tranquilo de que tu vehículo estará protegido sin importar las circunstancias. Ya sea por daños causados por un accidente, un robo, actos de vandalismo o incluso eventos naturales como granizo, tu inversión está segura.</p>
                  <b>Precio Final:</b> $${precioFinalOro}</p>
                  <button class="closeAlert3" onclick="mostrarAlerta()">Contratar</button>
                </div>
              </div>
        </section>
        `

        showModal();

    }, 3000);


})
//Mostrar el modal

/* --------------------------------------------------------------------------------------------------------------------------------------- */

const showModal = () => {

    const modal = document.getElementById("myModal");
    modal.style.display = "block";

    //Cerrar el modal cuando hacemos click en la X o en cualquier lado

    const closeBtn = document.querySelector(".close");

    closeBtn.addEventListener("click", function () {

        modal.style.display = "none";
        formCotizador.reset();
        infoActual.innerHTML = `<h4>Sin Informacion</h4>`
    });

    const closeAlert1 = document.querySelector(".closeAlert1");

    closeAlert1.addEventListener("click", function () {

        modal.style.display = "none";
        formCotizador.reset();
        infoActual.innerHTML = `<h4>Sin Informacion</h4>`
    });

    const closeAlert2 = document.querySelector(".closeAlert2");

    closeAlert2.addEventListener("click", function () {

        modal.style.display = "none";
        formCotizador.reset();
        infoActual.innerHTML = `<h4>Sin Informacion</h4>`
    });

    const closeAlert3 = document.querySelector(".closeAlert3");

    closeAlert3.addEventListener("click", function () {

        modal.style.display = "none";
        formCotizador.reset();
        infoActual.innerHTML = `<h4>Sin Informacion</h4>`
    });

    window.addEventListener("click", (e) => {

        if (e.target === modal) {
            modal.style.display = "none";
            formCotizador.reset();
            infoActual.innerHTML = `<h4>Sin Informacion</h4>`
        }

    })


}

/* --------------------------------------------------------------------------------------------------------------------------------------- */

function mostrarAlerta() {


    Swal.fire({
        title: 'Felicidades!',
        text: 'Ya forma parte de nuestro seguro',
        icon: 'success',
        confirmButtonText: 'Cerrar'
    })

}

/* --------------------------------------------------------------------------------------------------------------------------------------- */

// document.getElementById("cotizador-form").addEventListener("submit", function (e) {


//     var persona = {

//         nombre: nombre,
//         apellido: apellido

//     };

//     clientes.push(persona);

//     alert(nombre, apellido);

// clientes.forEach(function(cliente) {
//     console.log("Nombre: " + cliente.nombre.value + ", Apellido: " + cliente.apellido.value);
// });

// })





/* --------------------------------------------------------------------------------------------------------------------------------------- */



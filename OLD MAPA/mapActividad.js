var map = L.map('map').setView([-35.659388, -63.759155], 14);
document.getElementById("mySelect").addEventListener("change", onSelectChange);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var shows = false;
var keyactual = "";
let grupos = [];
var indexActual = 2;
fetch('./Locales.json')
    .then(response => response.json())
    .then(datos => {
        console.log(Object.values(datos));
        var datosenArray = Object.values(datos);
        var keys = Object.keys(datos);
        datosGlob = datos;
        for (let locales = 0; locales < datosenArray.length; locales++) {
            let currentGroupIndex = locales;
            let currentGroup = L.layerGroup().addTo(map);
            grupos[keys[locales]] = currentGroup;
            var indexActual = 2;
            for (let index = 0; index < datosenArray[locales].length; index++) {

                if (datosenArray[locales][index].Coord != "") {
                    let marker = L.marker(datosenArray[locales][index].Coord, { id: datosenArray[locales][index].Indice }).on('click', onSelectChange);


                    // Añadir el marcador al grupo correspondiente
                    currentGroup.addLayer(marker);

                    // Añadir el marcador a la vista del mapa
                    map.addLayer(marker);

                    // Puedes almacenar el marcador en un array si lo necesitas
                    grupoMarcadores[keys[locales]][datosenArray[locales][index].Indice] = marker;
                    indexActual = index + 1;
                    // textareaElement.value = indexActual;

                }
            }
            map.removeLayer(grupos[keys[locales]]);
        }


        console.log(grupoMarcadores);

    })


var grupoMarcadores = { 'Despensa': {}, 'Kiosco': {}, 'Mercado': {} };

var datosGlob;
function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
    /*  if (shows) {
          map.addLayer(marker);
          shows = false;
      } else {
          map.removeLayer(marker);
          shows = true;
      }*/
    fetch('./mercado.json')
        .then(response => response.json())
        .then(datos => {

            // Ahora puedes acceder a los datos del archivo JSON usando la variable `datos`.
            console.log(datosGlob[indexActual]); // Imprime el valor de la propiedad "nombre" del archivo JSON
            datosGlob[indexActual - 1]["Coord"] = e.latlng;
            console.log(marcadores[datosGlob[indexActual - 1]["Indice"]]);




            marker = L.marker(datosGlob[indexActual - 1].Coord, { id: datosGlob[indexActual - 1]["Indice"] + 1 }).addTo(map).on('click', function () {
                alert("a");
            });

            marcadores[datosGlob[indexActual - 1].Indice] = marker;
            map.addLayer(marker);
            console.log(marcadores);
            indexActual++;

        });




}

var edicion = false;

const selectElement = document.querySelector('select');
const selectedIndex = selectElement.selectedIndex;
const selectedOption = selectElement.options[selectedIndex];

function onSelectChange(event) {

    console.log();
    // Registrar el valor de la opción seleccionada
    const foundMarkerAntiguo = grupoMarcadores[keyactual][datosGlob[keyactual][indexActual - 1]["Indice"]] != null ? grupoMarcadores[keyactual][datosGlob[keyactual][indexActual - 1]["Indice"]] : null;
    if (foundMarkerAntiguo) {

        // Cambiar el ícono del marcador a rojo
        foundMarkerAntiguo.setIcon(L.icon({

            iconUrl: L.Icon.Default.imagePath + '/marker-icon.png',
            shadowUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        }));
        // Puedes agregar código adicional aquí para realizar acciones
        // en función del valor seleccionado.
    }
    indexActual = event.target.value == null ? event.target.options.id : event.target.value;
    if (event.target.value == null) {
        var selectElement = document.getElementById("mySelect");

        // Seleccionar la opción con el valor "opcion2"
        selectElement.selectedIndex = event.target.options.id - 1;
    }
    var partes = datosGlob[keyactual][indexActual - 1]["Renta"].split(' ');
    console.log(partes);
    console.log(event.target.options.id);
    document.getElementById("Persona").setAttribute("value", datosGlob[keyactual][indexActual - 1]["Persona"]);
    document.getElementById("Direccion").setAttribute("value", datosGlob[keyactual][indexActual - 1]["Direccion"]);
    document.getElementById("Numero").setAttribute("value", datosGlob[keyactual][indexActual - 1]["Numero"]);
    document.getElementById("Indice").setAttribute("value", datosGlob[keyactual][indexActual - 1]["Indice"]);
    document.getElementById("Local").setAttribute("value", datosGlob[keyactual][indexActual - 1]["Local"]);
    document.getElementById("Renta1").href = partes[0];
    document.getElementById("Renta2").href = partes[1];
    document.getElementById("Coordenadas").setAttribute("value", datosGlob[keyactual][indexActual - 1]["Coord"].lat + "," + datosGlob[keyactual][indexActual - 1]["Coord"].lng);
    const foundMarker = grupoMarcadores[keyactual][datosGlob[keyactual][indexActual - 1]["Indice"]];
    console.log(datosGlob[keyactual][indexActual - 1]);
    console.log(grupoMarcadores[keyactual][datosGlob[keyactual][indexActual - 1]["Indice"]]);
    // Verificar si se encontró el marcador
    if (foundMarker) {
        map.setView(foundMarker._latlng, 33);
        // Cambiar el ícono del marcador a rojo
        foundMarker.setIcon(L.icon({

            iconUrl:
                "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
            shadowUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        }));
        // Puedes agregar código adicional aquí para realizar acciones
        // en función del valor seleccionado.
    }
}
/*textareaElement.addEventListener('change', (event) => {
    indexActual = event.target.value;
    console.log(datosGlob[indexActual]["Coord"]);
 
    // Imprime el nuevo valor del área de texto
});*/

//map.addLayer(marker);
if (edicion) {
    map.on('click', onMapClick);
}



const miBoton = document.getElementById('miBoton');

// Agrega un "event listener" para el evento 'click'
miBoton.addEventListener('click', function () {
    // Código a ejecutar cuando se hace clic en el botón
    console.log("Guardar");
    const blob = new Blob([JSON.stringify(datosGlob)], { type: 'application/json' });

    // Crea un enlace de descarga y simula un clic para descargar el archivo
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'mercado.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
document.getElementById("Mapa").addEventListener('change', function (e) {
    const valorSeleccionado = this.value;
    let selectElement = document.getElementById("mySelect");

    // Remover todos los elementos hijos del select
    while (selectElement.firstChild) {
        selectElement.removeChild(selectElement.firstChild);
    }
    keyactual = valorSeleccionado;
    // Mostrar el valor en la consola
    console.log('Seleccionaste: ' + this);
    datosGlob[valorSeleccionado].forEach((item) => {

        // Crear un elemento `<option>`
        const option = document.createElement("option");

        // Agregar el valor al elemento `<option>`
        option.value = item["Indice"];

        // Agregar el texto al elemento `<option>`
        option.textContent = item["Persona"];

        // Agregar el elemento `<option>` al elemento `<select>`
        document.getElementById("mySelect").appendChild(option);


    });
    var keys = Object.keys(datosGlob);
    for (let index = 0; index < 3; index++) {
        if (keys[index] == valorSeleccionado) {
            map.addLayer(grupos[keys[index]]);
        } else {
            map.removeLayer(grupos[keys[index]]);
        }
    }

})

/*
PasarDatos();
async function cargarJSON(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
async function PasarDatos() {
    const kioscos = await cargarJSON('kiosco.json');
    const despensas = await cargarJSON('despensa.json');


    // Transferir coordenadas
    for (let i = 0; i < kioscos.length; i++) {
        for (let j = 0; j < despensas.length; j++) {

            const kiosco = kioscos[i];
            const despensa = despensas[j];

            if (despensa && despensa.Numero === kiosco.Numero) {

                kiosco.Coord = despensa.Coord;

            }
        }

    }

    const datosGlob = kioscos;

    // Crear un blob y un enlace de descarga
    const blob = new Blob([JSON.stringify(datosGlob)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'kiosco.json';

    // Simular un clic para descargar el archivo
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Mostrar el resultado

}*/
//defino las variables desde los datos del formulario
let nombres = document.getElementById("nombres");
let apellidos = document.getElementById("apellidos");
let edad = document.getElementById("edad");
let correo = document.getElementById("correo");
let telefono = document.getElementById("telefono");
//funcion para chequear que para cambiar los datos de usuario este logueado
function validarUser(){
    let userName = localStorage.getItem("usuario");
    if (userName == null || userName == undefined) {
        window.alert ("Para ingresar o editar tus datos de usuario debes estar logueado");
    }
  
    else {
        nombres.disabled = false;
        apellidos.disabled = false;
        edad.disabled = false;
        correo.disabled = false;
        telefono.disabled = false;
        
    }
}
//funcion que guarda los objetos en un JSON y luego la llamo desde el onclick del boton submit

function guardarDatos(){

let objetos = {};
    objetos.name = nombres.value;
    objetos.lastname = apellidos.value;
    objetos.age = edad.value;
    objetos.mail = correo.value;
    objetos.tel = telefono.value;

let objString = JSON.stringify(objetos);

localStorage.setItem("userObj", objString);

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

//traigo el nombre de usuario en el caso que esté logueado
    let userName = localStorage.getItem("usuario");
    if (userName != null || userName != undefined) {
        document.getElementById("userDatos").innerHTML=userName;
          }
          else {
            document.getElementById("userDatos").innerHTML="Debes ingresar para ver esto";
          }

//muestro los datos que guardé en el JSON
    var datos = JSON.parse(localStorage.getItem("userObj")); 

    document.getElementById("nombreReg").innerHTML = datos.name;
    document.getElementById("apellidoReg").innerHTML = datos.lastname;
    document.getElementById("edadReg").innerHTML = datos.age;
    document.getElementById("correoReg").innerHTML = datos.mail;
    document.getElementById("telefonoReg").innerHTML = datos.tel;

});
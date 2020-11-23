//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function guardar(usuario){
    localStorage.setItem('usuario',usuario);

}

function salir(){
    localStorage.clear();
}


function guardarUsuario(){
    let nombre = document.getElementById("usuario");
    let contra = document.getElementById("password");

    if ((nombre.value == "") || (contra.value == "")) {
        window.alert ("Ingrese usuario y/o contraseña válidos");
    }

    else {
        guardar(nombre.value);
        document.form.submit();
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    
});




// variable que guarda los articulos del carrito
let arrayArticles= [];

// funcion que calcula el subtotal por producto, incluye el cambio de dolares a pesos
function pSubtotalPesos(count,index){
  let pSubtotal=0;
  if(arrayArticles[index].currency ==="USD"){
      pSubtotal = arrayArticles[index].unitCost*count*40;

  }else{
      pSubtotal = arrayArticles[index].unitCost*count;
  }
  return pSubtotal;
}


// a partir del subtotal por producto actualiza el subtotal general
function cambioAllSubTotal(){
  let subtotalArray = document.getElementsByClassName("countArticle");
  let subtotal =0;
  for(let i=0;i<subtotalArray.length;i++){
      subtotal += pSubtotalPesos(subtotalArray[i].value,i);
  }
  document.getElementById("subtotalgeneral").innerHTML = "UYU " + subtotal;
  subtotalgeneral=subtotal; 

}

// a partir del subtotal general le agrega el costo del envío según el método elegido y muestra el total en html
function totalEnvio(){
  let metodo = document.getElementById("metodo");
  
  if(metodo.value === "1"){
    document.getElementById("envio").innerHTML = `UYU` +" " + ((subtotalgeneral*15)/100);
    document.getElementById("total").innerHTML = `UYU` +" " + (subtotalgeneral*1.15);
  }
  if(metodo.value === "2") {
      document.getElementById("envio").innerHTML = `UYU` +" " +((subtotalgeneral*7)/100);
      document.getElementById("total").innerHTML = `UYU` +" " + (subtotalgeneral*1.07);
      }
  if(metodo.value === "3") {
      document.getElementById("envio").innerHTML = `UYU` +" " + ((subtotalgeneral*5)/100);
      document.getElementById("total").innerHTML = `UYU` +" " + (subtotalgeneral*1.05);
        }
  if(metodo.value === "none") {
    document.getElementById("envio").innerHTML = `-` ;
    document.getElementById("total").innerHTML = `-` ;
  }    
}

// recorre a los elementos por su clase 
//por cada elemento lanza un evento "change" que actualiza el sutotal y lo muestra en html
function addEventCount(){
  let subtotalArray = document.getElementsByClassName("countArticle");
  for(let i=0;i<subtotalArray.length;i++){
      subtotalArray[i].addEventListener("change",function(){
      document.getElementById("productSubtotal-"+i).innerHTML= arrayArticles[i].currency + " " +subtotalArray[i].value* arrayArticles[i].unitCost;
      cambioAllSubTotal();
      totalEnvio();
  });
  }
}

//función que muestra los productos que se encuentren en el JSON y los agrega al html
function showCarrito(articles){

let htmlContentToAppend = "";
for(let i = 0; i < articles.length; i++){

        htmlContentToAppend += `
        <tr id= "${i}">
          <td>
            <figure class="itemside">
              <div class="aside">
                <img src="`+articles[i].src+`" width="100">
              </div>
              </td>
              <td>
              <figcaption class="info">
                <a href="product-info.html" class="title text-dark">`+articles[i].name+`</a>
              </figcaption>
            </figure>
          </td>
          <td><input class="form-control countArticle" style="width:60px;" type="number" id="productCount-${i}" value=`+articles[i].count+` min="1"></td>
          <td>
            <div class="price-wrap">
              <var class="price">`+articles[i].currency+`</var>
              <var class="price">`+articles[i].unitCost+`</var>
              <br>
              <small class="text-muted"> c/u </small>
            </div>
          </td>
          <td class="text-right">
            <a class="btn btn-light"> <i class="fa fa-heart mr-1"></i>
            </a>
            <button class="btn btn-light" onclick=borrarProducto(${i})>Borrar</button>
          </td>
          <td>
          <div class="price-wrap">
              <var class="price"><span id="productSubtotal-${i}">${articles[i].currency} ${articles[i].unitCost * articles[i].count}</span></var>
            </div>
            </td>          
        </tr>
        `
      }
   //agrego los datos en el tbody de la tabla html
    document.getElementById("container").innerHTML = htmlContentToAppend;
    addEventCount();
    cambioAllSubTotal();
    totalEnvio();
    
 }

//desactivo los campos de transferencia bancaria si elijo tarjeta

 document.getElementById("tarjeta").addEventListener("change", function(){
  document.getElementById ("tarjetaName").disabled = false;
  document.getElementById ("tarjetaNum").disabled = false;
  document.getElementById ("tarjetaCode").disabled = false;
  document.getElementById ("tarjetaVen").disabled = false;

   document.getElementById ("transName").disabled = true;
   document.getElementById ("transBanc").disabled = true;

 //hago que al seleccionar el medio de pago en la ventana modal se refleje en el HTML
   function cambiarValueTarjeta(){
   document.getElementById ("medioPago").value = "Tarjeta de crédito"
  };
  cambiarValueTarjeta();
  document.getElementById ("medioPago").innerHTML = "Tarjeta de crédito"
 });

 //desactivo los campos de tarjeta si elijo transferencia bancaria 
 document.getElementById("transferencia").addEventListener("change", function(){
  document.getElementById ("tarjetaName").disabled = true;
  document.getElementById ("tarjetaNum").disabled = true;
  document.getElementById ("tarjetaCode").disabled = true;
  document.getElementById ("tarjetaVen").disabled = true;

   document.getElementById ("transName").disabled = false;
   document.getElementById ("transBanc").disabled = false;

   //hago que al seleccionar el medio de pago en la ventana modal se refleje en el HTML
   function cambiarValueTrans(){
    document.getElementById ("medioPago").value = "Transferencia bancaria"
   };
   cambiarValueTrans();
   document.getElementById ("medioPago").innerHTML = "Transferencia bancaria"

 });

//declaro variables globales para las próximas dos funciones

let envio = document.getElementById("metodo");
let pago = document.getElementById("medioPago");
let nombreEnvio = document.getElementById("nombreEnvio");
let dirEnvio = document.getElementById("dirEnvio");
let ciudadEnvio = document.getElementById("ciudadEnvio");
let telEnvio = document.getElementById("telEnvio");
let horarioEnvio = document.getElementById("horarioEnvio");

 //valido los campos del envio y los dejo disabled para simular un guardado
 function validarDatosEnvio(){
  if ((nombreEnvio.value == "none") || (dirEnvio.value == "none") || (ciudadEnvio.value == "none")|| (telEnvio.value == "none")|| (horarioEnvio.value == "none")) {
      window.alert ("Para continuar complete los campos obligatorios");
  }

  else {
      window.alert ("Sus datos de envío han sido guardados");
      nombreEnvio.disabled = true;
      dirEnvio.disabled = true;
      ciudadEnvio.disabled = true;
      telEnvio.disabled = true;
      horarioEnvio.disabled = true;
      
  }
}

//valido que estén los datos de envio para poder seleccionar el envio
function validarEnvio(){
  if ((nombreEnvio.disabled == false) || (dirEnvio.disabled == false) || (ciudadEnvio.disabled == false) || (telEnvio.disabled == false) || (horarioEnvio.disabled == false) ){
    window.alert ("Primero debe guardar los datos de envío");
  }
}


 //valido los campos de datos de envio a través del disabled y los demás a través del value del input y le pongo dos alerts si no están completos y otro si está todo OK
 function validarCampos(){
  if (envio.value == "none" || pago.value == "Elegí forma de pago" ) {
      window.alert ("Para continuar seleccioná método de envío y forma de pago");
  }

  else {
      window.alert ("Tu pago será procesado");
      document.form.submit();
  }
}

//función que borra los productos del carrito
function borrarProducto(id){
  let productoBorrar = document.getElementById(id);
  productoBorrar.style.display = "none";
  arrayArticles[id].unitCost = 0;

  cambioAllSubTotal();
  totalEnvio();

}

document.addEventListener("DOMContentLoaded", function(){
  getJSONData(CART_INFO_URL).then(function(resultObj){
    if (resultObj.status === 'ok')
    {
        arrayArticles=resultObj.data.articles;
        showCarrito(arrayArticles);
    }
});
})

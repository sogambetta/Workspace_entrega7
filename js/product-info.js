var product = {};
var productList = [];

function showImages(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("images").innerHTML = htmlContentToAppend;
    }
}


function showRelatedProducts(relatedProductsArray){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productList = resultObj.data;
         
            let htmlRelatedProducts ="";

            for(let i = 0; i < relatedProductsArray.length; i++){
                let relatedProductPosition = relatedProductsArray[i];
                let relatedProduct = productList[relatedProductPosition];

                htmlRelatedProducts+=`
                <div class="col-lg-3 col-md-4 col-6 border mr-2 p-4">
                    <div class="row" id="relatedImg">
                        <img class="img-fluid p-2" src="`+relatedProduct.imgSrc+`">
                    </div>
                    <div class= "row p-2">
                    <p>`+relatedProduct.name+`</p>
                    </div>
                    <div class= "row">
                    </div>
                    <a type="button" href="product-info.html" class="btn btn-light btn-lg btn-block">Ver más</a>
                </div>`

            }
                document.getElementById("relatedProducts").innerHTML = htmlRelatedProducts;
        }
})
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let soldCountHTML = document.getElementById("soldCount");
            let productCategoryHTML = document.getElementById("productCategory");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.currency + product.cost;
            soldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            showImages(product.images);
            showRelatedProducts(product.relatedProducts);
            
        }
    })
});
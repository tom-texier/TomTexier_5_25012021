/*
*   Récupérer toutes les caméras
*/
getAllCameras = () => {
    fetch('http://localhost:3000/api/cameras')
        .then(response => response.json())
        .then(response => setLayoutCameras(response))
        .catch(error => alert("Erreur : " + error));
};

/*
*   Mise en page de la liste des caméras
*/
setLayoutCameras = async (cameras) => {
    const productList = document.getElementById("product-list");
    cameras.forEach(camera => {
        let article = document.createElement("article");
        let action = document.createElement("a");
        let image = document.createElement("div");

        let content = document.createElement("section");
        let title = document.createElement("h3");
        let description = document.createElement("p");

        article.classList.add("product");

        action.setAttribute("href", "./product.html?id=" + camera._id);

        image.classList.add("image");

        image.style.background = "url(" + camera.imageUrl + ") no-repeat center/cover";

        content.classList.add("content");
        title.innerText = camera.name;
        description.innerText = cutString(camera.description, 80);

        productList.append(article);
        article.append(action);
        action.append(image);
        image.append(content)
        content.append(title, description);
    });
}

/*
*   Découper d'une chaîne de caractère
*/
cutString = (str, max_length) => {
    let new_str = str.substring(0, max_length);
    if(str.length > max_length) {
        new_str += "...";
    }
     return new_str;
}

/*
*   Récupérer les détails d'une caméra
*/
getDetailsOfCamera = async () => {
    await fetch('http://localhost:3000/api/cameras/' + location.search.substring(4))
        .then(response => response.json())
        .then(response => setLayoutDetails(response))
        .catch(error => alert("Erreur : " + error));
};

/*
*   Mise en page de la vue d'une caméra
*/
setLayoutDetails = async (camera) => {

    // Vérification de l'existence d'un produit
    if(Object.keys(camera).length == 0) {
        let pageError = document.createElement("h1");
        pageError.innerText = "Oups ! Ce produit n'existe pas."
        document.querySelector(".container").append(pageError);
        document.querySelector(".container").classList.add("error-page");
    }
    else {

        const detailsProduct = document.getElementById("details-product");

        // Création des éléments
        let detailsLeft = document.createElement("div");
        let image = document.createElement("img");

        let detailsRight = document.createElement("section");
        let title = document.createElement("h1");
        let price = document.createElement("p");
        let description = document.createElement("p");
        let labelproductPersonalized = document.createElement("label");
        let productPersonalized = document.createElement("select");

        let btnAdd = document.createElement("a");

        // Configuration des éléments
        detailsLeft.classList.add("details", "details--left");
        image.src = camera.imageUrl;

        detailsRight.classList.add("details", "details--right");
        title.innerText = camera.name;
        price.classList.add("price");
        price.innerText = priceFormate(camera.price);
        description.classList.add("description");
        description.innerText = camera.description;
        labelproductPersonalized.setAttribute("for", "productPersonalized");
        labelproductPersonalized.innerText = "Choix de la lentille : ";
        productPersonalized.id = "productPersonalized";
        camera.lenses.forEach(lense => {
            let option = document.createElement("option");
            option.innerText = lense;
            productPersonalized.append(option);
        });
        btnAdd.classList.add("btn-shopping-cart");
        btnAdd.setAttribute("aria-role", "button");
        btnAdd.innerHTML = '<i class="fas fa-cart-plus"></i> Ajouter au panier';

        // Ajout des éléments dans la vue
        detailsLeft.append(image);
        detailsRight.append(title, price, description, labelproductPersonalized, productPersonalized, btnAdd);
        detailsProduct.append(detailsLeft, detailsRight);

        btnAdd.addEventListener("click", addItemToCart);

    }
}

/*
*   Formater le prix
*/
priceFormate = (price) => {
    return new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(price/100);
}

/*
*   Ajouter un produit au panier
*/
addItemToCart = () => {
    let idProduct = location.search.substring(4);
    shoppingCart.push(idProduct);
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));

    setNumberProductInCart();
}

/*
*   Récupérer le nombre de produit du panier
*/
getNumberProductInCart = () => {
    return shoppingCart.length;
}

/*
*   Mettre à jour le nombre de produit du panier
*/
setNumberProductInCart = () => {
    let numberProduct = getNumberProductInCart();
    
    const itemShow = document.getElementById("number-items");
    itemShow.innerText = numberProduct;
}

/*
*   Initialisater le panier
*/
let shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));

if(localStorage.getItem("shopping-cart")) {
    console.log(shoppingCart);
}
else {
    console.log("Initialisation du panier");
    shoppingCart = [];
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
}

setNumberProductInCart();
/*
*   Initialiser le panier
*/
let shoppingCart = JSON.parse(localStorage.getItem("basket"));

if(localStorage.getItem("basket")) {
    console.log(shoppingCart);
}
else {
    console.log("Initialisation du panier");
    shoppingCart = [];
    localStorage.setItem("basket", JSON.stringify(shoppingCart));
}

/*
*   Ajouter un produit au panier
*/
addItemToCart = () => {
    let idProduct = location.search.substring(4);
    shoppingCart.push(idProduct);
    localStorage.setItem("basket", JSON.stringify(shoppingCart));

    setNumberProductInCart();

    let successModal = document.getElementById("success-modal");
    successModal.classList.add("open");

    setTimeout(
        () => {
            successModal.classList.remove("open");
        },
        2000
    );
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
*   Initialiser l'affichage du panier
*/
setNumberProductInCart();

/*
*   Récupérer les produits du panier
*/
getProductInCart = (product, index) => {
    fetch('http://localhost:3000/api/cameras/' + product)
        .then(response => response.json())
        .then(response => setListOfProducts(response, index))
        .catch(error => alert("Erreur : " + error));
}

/*
*   Appeler la fonction qui récupère les produits ou afficher une page d'erreur
*/
setLayoutBasket = () => {
    if(shoppingCart.length == 0) {
        let pageError = document.createElement("h1");
        document.querySelector(".basket").style.display = "none";
        document.getElementById("order").style.display = "none";
        pageError.innerText = "Vous n'avez aucun produit dans votre panier."
        document.querySelector(".container").append(pageError);
        document.querySelector(".container").classList.add("error-page");
    }
    else {
        shoppingCart.forEach((product, index) => {
            getProductInCart(product, index);
        });
    }
}

/*
*   Initialiser le montant total de la commande
*/
let totalOrder = 0;

/*
*   Afficher la liste des produits du panier
*/
setListOfProducts = (camera, index) => {
    const summary = document.getElementById("summary");

    let article = document.createElement('article');
    let action = document.createElement("a");
    let containerImage = document.createElement("div");
    let image = document.createElement("img");
    let trashBtn = document.createElement("a");
    let rightDetails = document.createElement("div");
    let title = document.createElement("h2");
    let price = document.createElement("p");
    let description = document.createElement("p");

    containerImage.classList.add("containerImage");
    trashBtn.classList.add("trashBtn");
    trashBtn.setAttribute('data-index', index);
    trashBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    description.classList.add("description");
    image.src = camera.imageUrl;
    title.innerText = camera.name;
    price.innerText = priceFormate(camera.price);
    price.classList.add("price");
    description.innerText = cutString(camera.description, 50);
    action.setAttribute("href", "./product.html?id=" + camera._id);

    containerImage.append(image, trashBtn);
    action.append(title);
    rightDetails.append(containerImage, action, description, price);
    article.append(rightDetails);

    summary.append(article);

    totalOrder += camera.price;

    document.getElementById("total").getElementsByTagName("span")[0].innerText = priceFormate(totalOrder);

    trashBtn.addEventListener("click", removeItemToCart);
}

/*
*   Supprimer un produit du panier
*/
removeItemToCart = (e) => {
    if(e.target.hasAttribute('data-index')) {
        index = e.target.getAttribute('data-index');
    }
    else {
        index = e.target.parentElement.getAttribute('data-index');
    }


    shoppingCart.splice(index, 1);
    localStorage.setItem("basket", JSON.stringify(shoppingCart));

    window.location.reload();
}

/*
*   Vider le panier
*/
cleanBasket = () => {
    localStorage.removeItem('basket');
    window.location.href = "./";
}

document.getElementById("cleanBasketBtn").addEventListener('click', cleanBasket);
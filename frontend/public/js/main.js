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
setLayoutCameras = (cameras) => {
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
getDetailsOfCamera = () => {
    fetch('http://localhost:3000/api/cameras/' + location.search.substring(4))
        .then(response => response.json())
        .then(response => setLayoutDetails(response))
        .catch(error => alert("Erreur : " + error));
};

/*
*   Mise en page de la vue d'une caméra
*/
setLayoutDetails = (camera) => {

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
        btnAdd.classList.add("btn-basket");
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
*   Validation des champs du formulaire de commande
*/
validForm = (e) => {
    e.preventDefault();

    let checkNumber = /[0-9]/;
    let checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;

    if(
        checkNumber.test(firstName) == true ||
        checkSpecialCharacter.test(firstName) == true ||
        firstName == ""
    ) {
        document.getElementById("error-message").innerText = "Veuillez entrer un prénom valide.";
        document.getElementById("error-message").style.display = "block";
    }
    else if(
        checkNumber.test(lastName) == true ||
        checkSpecialCharacter.test(lastName) == true ||
        lastName == ""
    ) {
        document.getElementById("error-message").innerText = "Veuillez entrer un nom valide.";
        document.getElementById("error-message").style.display = "block";
    }
    else if( address == "" ) {
        document.getElementById("error-message").innerText = "Veuillez entrer une adresse valide.";
        document.getElementById("error-message").style.display = "block";
    }
    else if(
        checkSpecialCharacter.test(city) == true ||
        checkNumber.test(city) == true ||
        city == ""
    ) {
        document.getElementById("error-message").innerText = "Veuillez entrer une ville valide.";
        document.getElementById("error-message").style.display = "block";
    }
    else if( email == "" ) {
        document.getElementById("error-message").innerText = "Veuillez entrer une adresse mail valide.";
        document.getElementById("error-message").style.display = "block";
    }
    else {
        document.getElementById("error-message").style.display = "none";
        let contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        };
        
        sendForm(contact);

    }
    
}

/*
*   Envoyer le formulaire de commande
*/
sendForm = (contact) => {
    let products = shoppingCart;
    fetch("http://localhost:3000/api/cameras/order",
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body: JSON.stringify({contact, products})
    })
    .then(response => response.json())
    .then(response => {
        localStorage.setItem('contact', JSON.stringify(response.contact));
        localStorage.setItem('orderId', JSON.stringify(response.orderId));
        localStorage.removeItem('basket');
        window.location.replace("./confirmation.html");
    })
    .catch(error => alert("Erreur : " + error));
}

/*
*   Initialisation du formulaire de commande
*/
if(document.getElementById('order-form') != null) {
    document.getElementById('order-form').addEventListener('submit', validForm);
}

/*
*   Mettre en page la page confirmation
*/
setLayoutConfirmation = () => {

    if(localStorage.getItem('contact') == null || localStorage.getItem('orderId') == null) {
        window.location.replace("./index.html");
    }

    let contact = JSON.parse(localStorage.getItem('contact'));
    let orderId = JSON.parse(localStorage.getItem('orderId'));

    let icone = document.createElement('div');
    let title = document.createElement('h1');
    let subtitle = document.createElement('h2');
    let texte = document.createElement('p');

    icone.classList.add('icone');
    icone.innerHTML = '<i class="fas fa-check"></i>';

    title.innerText = contact.firstName + " " + contact.lastName;
    subtitle.innerText = "L'équipe d'Orinoco vous remercie pour votre commande !";

    texte.innerText = "Votre commande n°" + orderId + " vous sera bientôt expédiée. Vous recevrez un e-mail récapitulatif de votre commande dans un délai maximum de 24H."

    document.getElementById("confirmation").append(icone, title, subtitle, texte);

    // localStorage.clear();
}
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

    localStorage.clear();
}

/*
*   Styliser les champs du formulaire
*/
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', function (e) {
        if(this.value != "") {
            this.classList.add('active');
        }
        else {
            this.classList.remove('active');
        }
    });
})
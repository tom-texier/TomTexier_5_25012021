/*
*   Découper une chaîne de caractère
*/
cutString = (str, max_length) => {
    let new_str = str.substring(0, max_length);
    if(str.length > max_length) {
        new_str += "...";
    }
    return new_str;
}

/*
*   Formater le prix
*/
priceFormate = (price) => {
    return new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(price/100);
}
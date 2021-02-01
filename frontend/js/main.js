getAllCameras = async () => {
    await fetch('http://localhost:3000/api/cameras')
        .then(response => response.json())
        .then(response => setLayoutCameras(response))
        .catch(error => alert("Erreur : " + error));
};

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

cutString = (str, max_length) => {
    let new_str = str.substring(0, max_length);
    if(str.length > max_length) {
        new_str += "...";
    }
     return new_str;
}
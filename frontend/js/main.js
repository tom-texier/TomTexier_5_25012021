getAllCameras = async () => {
    let data = await fetch('http://localhost:3000/api/cameras')
        .then(response => response.json())
        .catch(error => alert("Erreur : " + error));

    return data;
};

const cameras = getAllCameras();
console.log(cameras);

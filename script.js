// La función se ejecuta cuando el contenido del documento ha sido completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // Aquí se declara y asigna la clave de API para acceder a la API de TheCatAPI. 
    // Es importante reemplazarla con tu propia clave.
    const apiKey = 'gVmJCLmTs7kyDGXaatFWRg==osBRrXo7Ro12a7i2';

    // Función para obtener las razas de gatos desde la API
    function obtenerRazasDeGatos(parametros, offset = 0) {
        return new Promise((resolve, reject) => {
            // URL de la API para obtener las razas de gatos, con parámetros de límite y desplazamiento
            let url = `https://api.thecatapi.com/v1/breeds?limit=20&offset=${offset}`;

            // Objeto XMLHttpRequest para hacer la solicitud HTTP
            const xhr = new XMLHttpRequest();

            // Abrir una solicitud GET a la URL especificada
            xhr.open('GET', url);

            // Establecer la API key en la cabecera de la solicitud
            xhr.setRequestHeader('x-api-key', apiKey);

            // Evento onload para la respuesta exitosa de la solicitud
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // Parsear la respuesta JSON a un objeto JavaScript
                    const razas = JSON.parse(xhr.responseText);
                    // Resolver la promesa con las razas de gatos obtenidas
                    resolve(razas);
                } else {
                    // Rechazar la promesa con un error si la solicitud no fue exitosa
                    reject(new Error('Error al obtener las razas de gatos'));
                }
            };


            // Evento onerror para errores de conexión
            xhr.onerror = function () {
                // Rechazar la promesa con un error de conexión
                reject(new Error('Error de conexión'));
            };

            // Enviar la solicitud HTTP
            xhr.send();
        });
    }

    // Llamar a la función obtenerRazasDeGatos y trabajar con las razas obtenidas
    obtenerRazasDeGatos().then((razas) => {

        // Iterar sobre las razas obtenidas
        for (let i = 0; i < razas.length; i++) {

            // Elimina la raza con ID "beng" del array razas
            if (razas[i].id === "beng") {
                razas.splice(i, 1);
                // Decrementa el índice para evitar saltar la siguiente raza después de eliminar una
                i--;
            }
        }

        // Iterar sobre las razas restantes
        for (let i = 0; i < razas.length; i++) {

            let imagenId = 'imagen-michi-' + (i + 1);
    

            let imagen = document.getElementById(imagenId);


            // Si hay una imagen de referencia, establece la URL de la imagen en el elemento de imagen correspondiente
            if (razas[i].reference_image_id) {
                let referenceImageId = razas[i].reference_image_id;
                let imageUrl = `https://cdn2.thecatapi.com/images/${referenceImageId}.jpg`;
                imagen.src = imageUrl;
            }


            // Muestra la información de la raza en la consola
            // console.log(razas[i]);
        }
    }).catch((error) => {
        // Captura cualquier error ocurrido durante el proceso
        // console.error(error);
        // Muestra el error en la consola
    });


});
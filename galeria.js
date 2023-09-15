const galleryContainer = document.getElementById("gallery-container");
const filterForm = document.getElementById("filter-form");
const filterRaza = document.getElementById("filter-raza");
const filterColor = document.getElementById("filter-color");
const filterEdad = document.getElementById("filter-edad");
const filterCondicion = document.getElementById("filter-condicion");

// Realiza una solicitud para cargar el archivo JSON
fetch("gatos.json")
  .then(response => response.json())
  .then(jsonData => {
    let filteredData = jsonData; // Inicialmente, mostrar todos los datos

    filterForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const selectedRaza = filterRaza.value;
      const selectedColor = filterColor.value;
      const selectedEdad = filterEdad.value;
      const selectedCondicion = filterCondicion.value;

      filteredData = jsonData.filter(data => {
        return (
          (selectedRaza === "todos" || data.raza === selectedRaza) &&
          (selectedColor === "todos" || data.color === selectedColor) &&
          (selectedCondicion === "todos" || data.condicionMedica === selectedCondicion) &&
          ((selectedEdad === "todos") ||
            /* (selectedEdad === "joven" && data.edad >= 0 && data.edad <= 5) ||
            (selectedEdad === "adulto" && data.edad >= 6)) */
            (selectedEdad === "0 - 3" && data.edad >= 0 && data.edad <= 3) ||
            (selectedEdad === "4 - 7" && data.edad >= 4 && data.edad <= 7) ||
            (selectedEdad === "8 - mas" && data.edad >= 8))
        );
      });

      displayGallery(filteredData);
    });

    // Función para mostrar las tarjetas filtradas
    function displayGallery(data) {
      galleryContainer.innerHTML = ""; // Limpiar el contenedor

      data.forEach(data => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = data.imagen;
        img.alt = "Imagen de gato";
        img.style.width = "250px"; // Establece el ancho
        img.style.height = "250px"; // Establece la altura
        card.appendChild(img);

        // Agregar un salto de línea
        const lineBreak = document.createElement("br");
        card.appendChild(lineBreak);

        const razaPara = document.createElement("p");
        razaPara.textContent = `Raza: ${data.raza}`;
        card.appendChild(razaPara);

        const edadPara = document.createElement("p");
        edadPara.textContent = `Edad: ${data.edad}`;
        card.appendChild(edadPara);

        const colorPara = document.createElement("p");
        colorPara.textContent = `Color: ${data.color}`;
        card.appendChild(colorPara);

        const condicionPara = document.createElement("p");
        condicionPara.textContent = `Condición Médica: ${data.condicionMedica}`;
        card.appendChild(condicionPara);

        const adoptButton = document.createElement("button");
        adoptButton.textContent = "Adóptame";
        adoptButton.addEventListener("click", () => {
          // Codifica los datos de la tarjeta como parámetros de URL
          const queryParams = new URLSearchParams({
            raza: data.raza,
            edad: data.edad,
            color: data.color,
            condicion: data.condicionMedica,
            imagen: data.imagen
          });

          // Redirige a la página de registro con los datos en la URL
          window.location.href = `registro.html?${queryParams}`;
        });
        card.appendChild(adoptButton);

        galleryContainer.appendChild(card);
      });
    }

    // Mostrar todas las tarjetas al cargar inicialmente
    displayGallery(jsonData);
  })
  .catch(error => {
    console.error("Error al cargar el archivo JSON:", error);
  });
